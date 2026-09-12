
export interface contextType {
    isMobileManu: boolean;
    setIsMobileManu: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebar: boolean;
    setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    isSearch: boolean;
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showVideoPopup: boolean;
    setShowVideoPopup: React.Dispatch<React.SetStateAction<boolean>>;
    currentVideoUrl: string;
    setCurrentVideoUrl: React.Dispatch<React.SetStateAction<string>>;
    handleVideoClick: (e: React.MouseEvent<HTMLAnchorElement>, videoUrl?: string) => void;
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

