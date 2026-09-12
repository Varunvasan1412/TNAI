import React from 'react';
import { Outlet } from 'react-router';
import HeaderOne from '../components/headers/HeaderOne'; 

const HomeOneLayout: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <HeaderOne />
            <Outlet /> 
        </div>
    );
};

export default HomeOneLayout;