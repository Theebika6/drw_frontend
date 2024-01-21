import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import drwLogo from '../Images/Logos/drw_logo_white.png';
import collapsedLogo from '../Images/Logos/DRW_logo.png';
import aboutUsIcon from '../Images/Sidebar/about-us.png';
import mapIcon from '../Images/Sidebar/map.png';
import analyticsIcon from '../Images/Sidebar/analytics.png';
import leftArrow from '../Images/Sidebar/left-arrow.png';
import rightArrow from '../Images/Sidebar/right-arrow.png';


const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sidebarItems = [
        {
            name: 'About Us',
            path: '/about-us',
            icon: aboutUsIcon
        },
        {
            name: 'Map',
            path: '/map',
            icon: mapIcon
        },
        {
            name: 'Analytics',
            path: '/analytics',
            icon: analyticsIcon
        },
    ];

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <img src={isCollapsed ? collapsedLogo : drwLogo} alt="Logo" className="sidebar-logo"/>
            <ul>
                {sidebarItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            className={`sidebar-link ${activeLink === item.name ? "active" : ""}`}
                            onClick={() => handleLinkClick(item.name)}
                        >
                            <img src={item.icon} alt={`${item.name} Icon`} className="sidebar-icon"/>
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="sidebar-toggle" onClick={toggleSidebar}>
                <img src={isCollapsed ? rightArrow : leftArrow} alt="Toggle Sidebar" className="toggle-icon"/>
            </div>
        </div>
    );
};

export default Sidebar;