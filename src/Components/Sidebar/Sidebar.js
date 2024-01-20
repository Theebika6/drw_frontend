import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import drwLogo from '../Images/Logos/drw_logo_white.png';
import aboutUsIcon from '../Images/Sidebar/about-us.png';
import mapIcon from '../Images/Sidebar/map.png';
import analyticsIcon from '../Images/Sidebar/analytics.png'

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
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
        <div className="sidebar">
            <img src={drwLogo} alt="DRW Logo" className="sidebar-logo"/>
            <ul>
                {sidebarItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            className={`sidebar-link ${activeLink === item.name ? "active" : ""}`}
                            onClick={() => handleLinkClick(item.name)}
                        >
                            <img src={item.icon} alt={`${item.name} Icon`} className="sidebar-icon"/>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;