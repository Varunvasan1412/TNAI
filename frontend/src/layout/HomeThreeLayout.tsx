import React from 'react';
import { Outlet } from 'react-router';
import HeaderThree from '../components/headers/HeaderThree';

const HomeThreeLayout: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <HeaderThree />
            <Outlet />
        </div>
    );
};

export default HomeThreeLayout;