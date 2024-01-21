import React from 'react';
import './map.css';
const Map = ({ isCollapsed }) => {

    return (
        <div className={`analytics ${isCollapsed ? 'collapsed' : ''}`} style={{ height: '400px', width: '100%' }}>

        </div>
    );
};

export default Map;
