import React, { useState } from 'react';
import {
    FaBars,
    FaTimes,
    FaHome,
    FaUsers,
    FaUserShield,
    FaTags,
    FaBox,
    FaShoppingCart,
    FaChartLine,
    FaCog
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('Dashboard');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        { name: 'Dashboard', icon: FaChartLine, path: '/dashboard' },
        { name: 'Users', icon: FaUsers, path: '/users' },
        { name: 'Admins', icon: FaUserShield, path: '/admins' },
        { name: 'Categories', icon: FaTags, path: '/categories' },
        { name: 'Products', icon: FaBox, path: '/products' },
        { name: 'Orders', icon: FaShoppingCart, path: '/orders' },
        { name: 'Settings', icon: FaCog, path: '/settings' },
    ];

    return (
        <>
            {
                isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )
            }

            <div
                className={`fixed lg:relative z-30 h-full transition-all duration-300 ease-in-out bg-white border-r-2 border-gray-300 ${isSidebarOpen ? 'w-64' : 'w-16 overflow-hidden'
                    }`}
            >
                <div className="">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className={`h-14 w-full border-b-2 border-gray-300 mx-auto flex items-center ${isSidebarOpen ? "justify-end p-3" : "justify-center"}`}
                    >
                        {isSidebarOpen ? <FaTimes size={24} className='text-right' /> : <FaBars size={24} />}
                    </button>

                    {/* Sidebar Links */}
                    <div className={isSidebarOpen ? 'm-5' : 'flex justify-center'}>
                        <ul className="mt-5 space-y-2">
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <li key={index}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-green-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-700 ${activeMenu === item.name ? 'bg-green-100 text-green-900' : 'text-gray-800'}`}
                                            onClick={() => setActiveMenu(item.name)}
                                        >
                                            <IconComponent size={20} />
                                            {isSidebarOpen && item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;