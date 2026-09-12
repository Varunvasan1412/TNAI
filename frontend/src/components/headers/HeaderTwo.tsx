import React  from 'react';
import MenuTwo from '../menu/MenuTwo';
import StrickyHeader from './StrickyHeader';

const HeaderTwo: React.FC = () => { 
    return (
        <>
            <header className="main-header-two">
                <nav className="main-menu main-menu-two">
                    <MenuTwo />
                </nav>
            </header>

            <StrickyHeader
                className='main-menu-two'
                menu={<MenuTwo />}
            />  
        </>
    );
};

export default HeaderTwo;