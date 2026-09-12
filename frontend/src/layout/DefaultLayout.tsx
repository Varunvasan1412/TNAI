import React from 'react';
import HeaderOne from '../components/headers/HeaderOne';
import { Outlet } from 'react-router';

const DefaultLayout: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <HeaderOne />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;