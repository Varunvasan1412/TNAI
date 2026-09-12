import React, { useCallback, useMemo, useState } from 'react';
import type { contextType } from './contextType';
import RsistoreContext from './RsistoreContext';

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMobileManu, setIsMobileManu] = useState<boolean>(false);
    const [isSidebar, setIsSidebar] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
    const [activeSection, setActiveSection] = useState<string>("home");
    
    const handleVideoClick = useCallback((
        e: React.MouseEvent<HTMLAnchorElement>, videoUrl: string = "https://www.youtube.com/watch?v=Get7rqXYrbQ"
    ): void => {
        e.preventDefault();
        setCurrentVideoUrl(videoUrl);
        setShowVideoPopup(true);
    }, [setCurrentVideoUrl, setShowVideoPopup])

    const info: contextType = useMemo(() => ({
        isMobileManu, setIsMobileManu,
        isSidebar, setIsSidebar,
        isSearch, setIsSearch,
        searchQuery, setSearchQuery,
        showVideoPopup, setShowVideoPopup,
        currentVideoUrl, setCurrentVideoUrl,
        handleVideoClick,
        activeSection, setActiveSection
    }), [
        isMobileManu, setIsMobileManu,
        isSidebar, setIsSidebar,
        isSearch, setIsSearch,
        searchQuery, setSearchQuery,
        showVideoPopup, setShowVideoPopup,
        currentVideoUrl, setCurrentVideoUrl,
        handleVideoClick,
        activeSection, setActiveSection,
    ])

    return (
        <RsistoreContext.Provider value={info}>
            {children}
        </RsistoreContext.Provider>
    );
};

export default ContextProvider;