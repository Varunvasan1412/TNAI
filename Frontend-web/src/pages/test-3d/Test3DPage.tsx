import React from 'react';
import ObjViewer from '../../features/product-detail/ObjViewer';

const SWATCH: React.CSSProperties = {
    display: 'inline-block', width: 18, height: 18,
    borderRadius: 4, verticalAlign: 'middle', marginRight: 8,
    border: '1px solid rgba(0,0,0,0.15)',
};

const materials = [
    { name: 'Steel_-_Satin',              hex: '#A0A0A0', label: 'Vertical shaft',   note: 'Kd 0.627 0.627 0.627' },
    { name: 'Coating_-_Black_Oxide',       hex: '#2C2C2C', label: 'Horizontal arm',   note: 'Kd 0.173 0.173 0.173' },
    { name: 'Paint_-_Metallic_(Yellow)',   hex: '#E8AD23', label: 'Handle band',      note: 'Kd 0.910 0.678 0.137' },
    { name: 'LED_-_SMD_3528_-_8lm_(White)', hex: '#EDEDED', label: 'Electrode tip',  note: 'Kd 0.929 0.929 0.929' },
];

const Test3DPage: React.FC = () => {
    const objUrl = '/test-model/electrode_ascii.obj';
    const mtlUrl = '/test-model/test_electrode.mtl';

    return (
        <section style={{ padding: '60px 20px', minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>

                <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                    3D Viewer — Real Material Color Test
                </h1>
                <p style={{ color: '#64748b', marginBottom: 8, fontSize: 14 }}>
                    Using the <strong>exact same MTL material names and Kd values</strong> as your uploaded electrode file.
                    If colors appear correctly here, the viewer is working and the issue with your real file is the OBJ format (see below).
                </p>

                {/* Warning banner */}
                <div style={{
                    background: '#fff7ed', border: '1px solid #f59e0b', borderRadius: 10,
                    padding: '14px 18px', marginBottom: 24, fontSize: 13.5, color: '#92400e',
                    lineHeight: 1.6,
                }}>
                    <strong>⚠ Why your uploaded OBJ doesn't load:</strong> The file{' '}
                    <code>glassy carbon electrode (L shape) (1).obj</code> is in <strong>binary format</strong>.
                    Three.js <code>OBJLoader</code> only reads <strong>ASCII OBJ</strong>.
                    To fix it, re-export from your CAD app as ASCII OBJ (see instructions below).
                </div>

                {/* Color key */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 12, marginBottom: 24,
                }}>
                    {materials.map(m => (
                        <div key={m.name} style={{
                            background: '#fff', border: '1px solid #e2e8f0',
                            borderRadius: 10, padding: '12px 14px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ ...SWATCH, background: m.hex }} />
                                <strong style={{ fontSize: 13 }}>{m.label}</strong>
                            </div>
                            <code style={{ fontSize: 11, color: '#64748b' }}>{m.name}</code>
                            <br />
                            <span style={{ fontSize: 11, color: '#94a3b8' }}>{m.note}</span>
                        </div>
                    ))}
                </div>

                {/* 3D viewer */}
                <div style={{
                    width: '100%', height: 520,
                    border: '1px solid #e2e8f0', borderRadius: 16,
                    overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    marginBottom: 28,
                }}>
                    <ObjViewer url={objUrl} mtlUrl={mtlUrl} />
                </div>

                {/* Fix instructions */}
                <div style={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: 12, padding: '20px 24px',
                }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                        How to fix your OBJ file (convert binary → ASCII)
                    </h2>
                    <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 10 }}><strong>Option A — Blender (free):</strong></p>
                        <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
                            <li>Open Blender → File → Import → Wavefront (.obj)</li>
                            <li>Select your file and import it</li>
                            <li>File → Export → Wavefront (.obj)</li>
                            <li>Make sure <em>"Write Materials"</em> is checked</li>
                            <li>Export → this produces a proper ASCII .obj + .mtl pair</li>
                        </ol>
                        <p style={{ marginBottom: 10 }}><strong>Option B — Autodesk Fusion 360:</strong></p>
                        <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
                            <li>Open the model in Fusion 360</li>
                            <li>File → Export → select OBJ format</li>
                            <li>Under options, ensure "ASCII" encoding (not binary)</li>
                        </ol>
                        <p style={{ marginBottom: 10 }}><strong>Option C — Online converter:</strong></p>
                        <p style={{ paddingLeft: 20, color: '#64748b' }}>
                            Upload your file at <strong>https://www.meshconvert.com</strong> or <strong>https://products.aspose.app/3d/conversion/obj</strong>, convert to OBJ, re-download.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Test3DPage;
