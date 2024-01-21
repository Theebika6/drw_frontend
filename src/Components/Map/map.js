import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import L from 'leaflet'

const Map = ({ isCollapsed }) => {
    const position = [45.5017, -73.5673]; // Coordinates for Montreal
    const zoom = 13;

    // Define bounds for Montreal
    const corner1 = L.latLng(45.70, -73.9);
    const corner2 = L.latLng(45.4, -73.4);
    const bounds = L.latLngBounds(corner1, corner2);

    return (
        <div className={`map ${isCollapsed ? 'collapsed' : ''}`}>
            <MapContainer
                center={position}
                zoom={zoom}
                style={{ height: '100%', width: '60%' }}
                maxBounds={bounds}
                minZoom={11}
                maxZoom={17}
                dragging={true}
                touchZoom={true}
                scrollWheelZoom={true}
                className={"mapContainer"}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
};

export default Map;
