import React from 'react';
import MenuOne from '../menu/MenuOne';
import StrickyHeader from './StrickyHeader';

const HeaderOne: React.FC = () => {

    return (
        <>
            <header className="main-header" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 999, backgroundColor: 'transparent' }}>
                <nav className="main-menu" style={{ backgroundColor: 'transparent', padding: '10px 0' }}>
                    <MenuOne />
                </nav>
            </header>

            <StrickyHeader
                menu={<MenuOne />}
            />
        </>
    );
};

export default HeaderOne;