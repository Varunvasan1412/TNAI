import React from 'react';
import { Outlet } from 'react-router';
import HeaderTwo from '../components/headers/HeaderTwo'; 

const HomeTwoLayout: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <HeaderTwo />
            <Outlet /> 
        </div>
    );
};

export default HomeTwoLayout;