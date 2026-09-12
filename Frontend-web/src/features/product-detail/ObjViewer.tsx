import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, Grid, Line } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import { MTLLoader } from 'three-stdlib';

interface ObjViewerProps {
    url: string;
    mtlUrl?: string;
}

// ── Smart text fetcher ────────────────────────────────────────────────────────
// Autodesk ATF exports OBJ/MTL as UTF-16 LE (with or without BOM).
// fetch() + TextDecoder handles both UTF-16 and plain UTF-8/ASCII,
// then we call .parse() instead of .load() so the encoding is under our control.
async function fetchText(url: string): Promise<string> {
    const res  = await fetch(url);
    const buf  = await res.arrayBuffer();
    const u8   = new Uint8Array(buf);

    // Explicit BOM: FF FE = UTF-16 LE,  FE FF = UTF-16 BE
    if (u8[0] === 0xFF && u8[1] === 0xFE)
        return new TextDecoder('utf-16le').decode(buf);
    if (u8[0] === 0xFE && u8[1] === 0xFF)
        return new TextDecoder('utf-16be').decode(buf);

    // Heuristic: if every second byte starting at offset 1 is 0x00 the file is
    // UTF-16 LE without a BOM (common from Autodesk on Windows)
    const sample = Math.min(u8.length, 64);
    let nullEveryOther = true;
    for (let i = 1; i < sample; i += 2) {
        if (u8[i] !== 0) { nullEveryOther = false; break; }
    }
    if (nullEveryOther && sample > 4)
        return new TextDecoder('utf-16le').decode(buf);

    // Default: UTF-8 / ASCII
    return new TextDecoder('utf-8').decode(buf);
}

// ── Apply DoubleSide to every mesh ────────────────────────────────────────────
function applyDoubleSide(group: THREE.Group) {
    group.traverse((node: any) => {
        if (!node.isMesh) return;
        const mats: THREE.Material[] = Array.isArray(node.material)
            ? node.material : [node.material];
        mats.forEach((m: any) => { m.side = THREE.DoubleSide; m.needsUpdate = true; });
    });
}

// ── Tone down near-white materials ────────────────────────────────────────────
// Under the viewer's lighting, Kd values close to pure white (e.g. 0.93) blow
// out to a flat, glary highlight with no shading detail. Nudging just the
// near-white materials down slightly keeps them reading as white while
// restoring visible shading — other colours (yellow, black oxide, etc.) are untouched.
function dimNearWhiteMaterials(group: THREE.Group, factor = 0.88) {
    group.traverse((node: any) => {
        if (!node.isMesh) return;
        const mats: THREE.Material[] = Array.isArray(node.material)
            ? node.material : [node.material];
        mats.forEach((m: any) => {
            if (m.color && m.color.r > 0.85 && m.color.g > 0.85 && m.color.b > 0.85) {
                m.color.multiplyScalar(factor);
                m.needsUpdate = true;
            }
        });
    });
}

// ── Load helpers ──────────────────────────────────────────────────────────────

async function loadWithMtl(objUrl: string, mtlUrl: string): Promise<THREE.Group> {
    const resourcePath = mtlUrl.substring(0, mtlUrl.lastIndexOf('/') + 1);

    // 1. Fetch MTL text (handles UTF-16 from Autodesk)
    const mtlText = await fetchText(mtlUrl);

    // 2. Parse MTL → MaterialCreator
    const ml = new MTLLoader();
    ml.setResourcePath(resourcePath);
    const creator = ml.parse(mtlText, resourcePath);
    creator.preload();

    // 3. Fetch OBJ text (handles UTF-16 from Autodesk)
    const objText = await fetchText(objUrl);

    // 4. Parse OBJ with materials already set — colors applied during parse
    const ol = new OBJLoader();
    ol.setMaterials(creator);
    const group = ol.parse(objText);

    applyDoubleSide(group);
    dimNearWhiteMaterials(group);
    return group;
}

async function loadOnly(objUrl: string): Promise<THREE.Group> {
    const objText = await fetchText(objUrl);
    const group = new OBJLoader().parse(objText);
    applyDoubleSide(group);
    dimNearWhiteMaterials(group);
    return group;
}

// ── Suspense resource (module-level cache, keyed by "objUrl|mtlUrl") ──────────

type Res<T> = { read: () => T };

function wrap<T>(p: Promise<T>): Res<T> {
    let status: 'pending' | 'ok' | 'err' = 'pending';
    let val: T, err: unknown;
    const wait = p.then(
        (v) => { status = 'ok';  val = v; },
        (e) => { status = 'err'; err = e; }
    );
    return {
        read() {
            if (status === 'pending') throw wait;
            if (status === 'err')     throw err;
            return val!;
        }
    };
}

const _cache = new Map<string, Res<THREE.Group>>();

function getModel(objUrl: string, mtlUrl?: string): Res<THREE.Group> {
    const key = mtlUrl ? `${objUrl}|${mtlUrl}` : objUrl;
    if (_cache.has(key)) return _cache.get(key)!;
    const promise = mtlUrl
        ? loadWithMtl(objUrl, mtlUrl).catch(() => loadOnly(objUrl))
        : loadOnly(objUrl);
    const res = wrap(promise);
    _cache.set(key, res);
    return res;
}

// ── React components ──────────────────────────────────────────────────────────

const Model: React.FC<{ url: string; mtlUrl?: string }> = ({ url, mtlUrl }) => {
    const obj = getModel(url, mtlUrl).read();
    return <primitive object={obj} />;
};

const Loader: React.FC = () => (
    <Html center>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '4px solid rgba(0,0,0,0.08)',
                borderLeftColor: '#2E8B74',
                animation: 'spin3d 0.9s linear infinite',
            }} />
            <style>{`@keyframes spin3d { to { transform: rotate(360deg); } }`}</style>
            <span style={{ color: '#2E8B74', fontWeight: 700, fontSize: 13 }}>Loading 3D…</span>
        </div>
    </Html>
);

// ── Main viewer ───────────────────────────────────────────────────────────────
// Lighting strategy: manual lights inside Canvas, NO Stage/HDR environment.
//   ambientLight 0.55  → base fill so dark materials (0.173) are still visible
//   directionalLight 1.2 (key, top-front)   → primary shading + colour pop
//   directionalLight 0.4 (fill, bottom-back) → prevents pure-black shadows
//   pointLight 0.6 (right side)             → edge highlight on steel/yellow
// Result: Black Oxide stays clearly dark, Steel reads as grey, Yellow pops gold.
const ObjViewer: React.FC<ObjViewerProps> = ({ url, mtlUrl }) => (
    <div style={{
        width: '100%', height: '100%', flex: 1,
        minWidth: 0, minHeight: 0,
        overflow: 'hidden',
        cursor: 'grab',
        borderRadius: '8px',
    }}>
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafbfc']} />

            {/* Manual lights — full control, no HDR washout */}
            <ambientLight intensity={0.55} />
            <directionalLight position={[5, 8, 5]}  intensity={1.2} />
            <directionalLight position={[-4, -3, -4]} intensity={0.4} />
            <pointLight       position={[6, 2, 0]}   intensity={0.6} />

            {/* In-scene CAD-style grid — lives in world space, so it pans/zooms/rotates
                together with the model instead of sitting behind it as a flat image. */}
            <Grid
                position={[0, 0, 0]}
                args={[10, 10]}
                cellSize={0.5}
                cellThickness={0.6}
                cellColor="#c7cfd9"
                sectionSize={2.5}
                sectionThickness={1.2}
                sectionColor="#a7b1bf"
                fadeDistance={28}
                fadeStrength={1.5}
                infiniteGrid
                followCamera={false}
                side={THREE.DoubleSide}
            />

            {/* Axis reference lines on the grid plane — X (red) / Y (blue) */}
            <Line points={[[-14, 0, 0], [14, 0, 0]]} color="#e5484d" lineWidth={1.5} />
            <Line points={[[0, 0, -14], [0, 0, 14]]} color="#2e73f0" lineWidth={1.5} />

            <React.Suspense fallback={<Loader />}>
                <Stage intensity={0} adjustCamera={0.7} shadows={false} environment={null}>
                    <Model url={url} mtlUrl={mtlUrl} />
                </Stage>
            </React.Suspense>
            <OrbitControls makeDefault autoRotate autoRotateSpeed={1.2} enablePan={false} minDistance={1.5} maxDistance={20} />
        </Canvas>
    </div>
);

export default ObjViewer;
