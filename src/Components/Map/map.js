import React from 'react';
import './map.css';



const Map = ({ isCollapsed }) => {

    return (
        <div className={`map ${isCollapsed ? 'collapsed' : ''}`}>

        </div>
    );
};

export default Map;