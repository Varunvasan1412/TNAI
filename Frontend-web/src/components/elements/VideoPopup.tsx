import React, { useEffect, useCallback } from "react"; 
import useRsistoreContext from "../context/useRsistoreContext";

const VideoPopup: React.FC = () => {
    const {
        setShowVideoPopup,
        setCurrentVideoUrl,
        showVideoPopup,
        currentVideoUrl,
    } = useRsistoreContext();

    // Close popup function (memoized)
    const onClose = useCallback((): void => {
        setShowVideoPopup(false);
        setCurrentVideoUrl("");
    }, [setShowVideoPopup, setCurrentVideoUrl]);

    // Extract YouTube Video ID
    const extractYouTubeVideoId = (inputUrl: string): string | null => {
        if (!inputUrl) return null;

        const patterns: RegExp[] = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
            /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = inputUrl.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    // Build final embed URL
    const getEmbedUrl = (inputUrl: string): string => {
        if (!inputUrl) {
            return "https://www.youtube-nocookie.com/embed/MLpWrANjFbI?autoplay=1&rel=0&modestbranding=1&showinfo=0";
        }

        const videoId = extractYouTubeVideoId(inputUrl);
        if (videoId) {
            return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
        }

        return inputUrl;
    };

    // Handle ESC key + body scroll lock
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent): void => {
            if (e.key === "Escape") onClose();
        };

        if (showVideoPopup) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "unset";
        };
    }, [showVideoPopup, onClose]);

    // Close popup on background click
    const handleOverlayClick = (): void => onClose();

    // Prevent closing when clicking on iframe container
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
    };

    if (!showVideoPopup) return null;

    const embedUrl = getEmbedUrl(currentVideoUrl);

    return (
        <div className="video-popup-overlay active" onClick={handleOverlayClick}>
            <div className="video-popup-content" onClick={handleContentClick}>
                <button className="video-popup-close" onClick={onClose}>
                    ×
                </button>

                <iframe
                    className="video-iframe"
                    width="800"
                    height="450"
                    src={embedUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        aspectRatio: "16 / 9",
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(VideoPopup);
