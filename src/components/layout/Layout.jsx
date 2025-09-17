import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {


    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto ml-14 lg:ml-0">
                    <div className="bg-slate-100 h-full w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;