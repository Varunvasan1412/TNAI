import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";
import { jarallax } from "jarallax";

// If you want to use video backgrounds
// import { jarallaxVideo } from "jarallax/dist/jarallax-video.esm.js";

interface JarallaxSectionProps {
    children: ReactNode;
    className?: string;

    // HTML tag to use
    as?: ElementType; // e.g., "section", "div", "article", "header", etc.

    // Image/Video settings
    imgSrc?: string;
    videoSrc?: string; // YouTube or Vimeo URL

    // Parallax settings
    speed?: number; // -1.0 to 2.0 (0.5 is default)
    type?: "scroll" | "scale" | "opacity" | "scroll-opacity" | "scale-opacity";

    // Position settings
    imgPosition?: string; // e.g., "50% 50%", "center center", "top left"
    imgRepeat?: "no-repeat" | "repeat";
    imgSize?: "cover" | "contain" | "auto" | string;

    // Advanced settings
    zIndex?: number;
    disableParallax?: boolean | RegExp | (() => boolean);
    disableVideo?: boolean | RegExp | (() => boolean);

    // Custom overlay
    overlayColor?: string;
    overlayOpacity?: number;
}

export default function JarallaxSection({
    children,
    className = "",
    as,
    imgSrc,
    videoSrc,
    speed = 0.5,
    type = "scroll",
    imgPosition = "50% 50%",
    imgRepeat = "no-repeat",
    imgSize = "cover",
    zIndex = -100,
    disableParallax,
    disableVideo,
    overlayColor = "rgba(0, 0, 0, 1)",
    overlayOpacity = 0.9,
}: JarallaxSectionProps) {
    const jarallaxRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Store ref value in a variable to avoid stale closure in cleanup
        const element = jarallaxRef.current;

        // Uncomment if using video
        // jarallaxVideo();

        if (element) {
            jarallax(element, {
                speed,
                type,
                imgSrc,
                videoSrc,
                imgPosition,
                imgRepeat,
                imgSize,
                zIndex,
                disableParallax,
                disableVideo,
            });
        }

        // Cleanup
        return () => {
            if (element) {
                jarallax(element, "destroy");
            }
        };
    }, [
        speed,
        type,
        imgSrc,
        videoSrc,
        imgPosition,
        imgRepeat,
        imgSize,
        zIndex,
        disableParallax,
        disableVideo,
    ]);

    const Component: any = as || "section";

    return (
        <Component ref={jarallaxRef} className={`jarallax ${className}`}>
            {overlayColor && (
                <div
                    className="jarallax-overlay"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: overlayColor,
                        opacity: overlayOpacity,
                        zIndex: 0,
                    }}
                />
            )}
            <div className="jarallax-content" style={{ position: "relative", zIndex: 1 }}>
                {children}
            </div>
        </Component>
    );
}