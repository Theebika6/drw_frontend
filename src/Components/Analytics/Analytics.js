import React from 'react';
import './Analytics.css';



const Analytics = ({ isCollapsed }) => {

    return (
        <div className={`analytics ${isCollapsed ? 'collapsed' : ''}`}>

        </div>
    );
};

export default Analytics;