
import React, { useEffect, useRef } from "react";

type Props = {
    enabled?: boolean;
    ignoreReducedMotion?: boolean;
};

const CustomCursor: React.FC<Props> = ({
    enabled = true,
    ignoreReducedMotion = false,
}) => {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!enabled) return;

        const isTouch =
            typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);

        // Reduced motion respect
        const prefersReduced =
            !ignoreReducedMotion &&
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const cursor = cursorRef.current;
        const inner = innerRef.current;
        if (!cursor || !inner || isTouch || prefersReduced) {
            if (cursor) cursor.style.display = "none";
            if (inner) inner.style.display = "none";
            return;
        }

        let down = false;

        const onMove = (e: MouseEvent) => {
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;
            inner.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;
            // outer cursor animate via rAF for smoothness
            if (rafRef.current == null) tick();
        };

        const tick = () => {
            const { x, y } = pos.current;
            cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
            rafRef.current = requestAnimationFrame(tick);
        };

        const onDown = () => {
            down = true;
            cursor.classList.add("cc-click");
            inner.classList.add("cc-inner-hover");
        };
        const onUp = () => {
            if (!down) return;
            down = false;
            cursor.classList.remove("cc-click");
            inner.classList.remove("cc-inner-hover");
        };

        document.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mousedown", onDown);
        document.addEventListener("mouseup", onUp);

        cursor.style.opacity = "0.7";
        inner.style.opacity = "0.6";

        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("mouseup", onUp);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [enabled, ignoreReducedMotion]);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor__cursor"></div>
            <div ref={innerRef} className="custom-cursor__cursor-two"></div>
        </>
    );
};

export default React.memo(CustomCursor);
