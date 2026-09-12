import React, { useState, useEffect, useRef } from 'react';  
import { useNavigate } from 'react-router';
import useRsistoreContext from '../context/useRsistoreContext';
import { GALLERY_ITEMS } from '../../pages/gallery/Gallery';

const SearchProp: React.FC = () => { 
    const { setIsSearch, setSearchQuery } = useRsistoreContext();
    const navigate = useNavigate();
    const [localQuery, setLocalQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const { isSearch } = useRsistoreContext(); // Assuming isSearch is available

    useEffect(() => {
        if (isSearch && inputRef.current) {
            // Slight delay to allow CSS transitions if any
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isSearch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchQuery(localQuery);
        setIsSearch(pre => !pre)
        navigate("/gallery")
    }

    const filteredSuggestions = localQuery 
        ? GALLERY_ITEMS.filter(item => 
            item.title.toLowerCase().includes(localQuery.toLowerCase()) || 
            item.category.toLowerCase().includes(localQuery.toLowerCase())
          ).slice(0, 5)
        : [];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
                e.preventDefault();
                setSearchQuery(filteredSuggestions[selectedIndex].title);
                setIsSearch(false);
                navigate("/gallery");
            }
        }
    };
    return (
        <div className="search-popup">
            <div className="color-layer"></div>
            <button className="close-search" onClick={() => setIsSearch(pre => !pre)}><span className="far fa-times fa-fw"></span></button>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ position: 'relative', zIndex: 99999, overflow: 'visible' }}>
                    <input 
                        ref={inputRef}
                        type="search" 
                        name="search-field" 
                        placeholder="Search Here" 
                        required 
                        value={localQuery} 
                        onChange={e => {
                            setLocalQuery(e.target.value);
                            setSelectedIndex(-1);
                        }} 
                        onKeyDown={handleKeyDown}
                        autoComplete="off" 
                        autoFocus
                    />
                    <button type="submit"><i className="fas fa-search"></i></button>

                    {filteredSuggestions.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 5px)',
                            left: 0,
                            width: '100%',
                            background: '#fff',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            zIndex: 999999,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                            textAlign: 'left',
                            maxHeight: '300px',
                            overflowY: 'auto'
                        }}>
                            {filteredSuggestions.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => {
                                        setSearchQuery(item.title);
                                        setIsSearch(false);
                                        navigate("/gallery");
                                    }}
                                    style={{
                                        padding: '12px 20px',
                                        borderBottom: '1px solid #eee',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        color: '#333',
                                        background: index === selectedIndex ? '#f9f9f9' : '#fff'
                                    }}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    onMouseLeave={() => setSelectedIndex(-1)}
                                >
                                    <span style={{ fontWeight: 600, fontSize: '16px' }}>{item.title}</span>
                                    <span style={{ fontSize: '13px', color: '#777' }}>{item.category}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </form>
        </div> 
    );
};

export default SearchProp;