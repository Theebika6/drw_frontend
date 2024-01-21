import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import Papa from 'papaparse';
import { format, startOfDay } from 'date-fns';

import csvData from '../Data/Cleaned_House_Data.csv';

const Map = ({ isCollapsed }) => {
    const [houseData, setHouseData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateRange, setDateRange] = useState({ min: null, max: null });
    const [showAllData, setShowAllData] = useState(false);

    useEffect(() => {
        // Parse the CSV data
        Papa.parse(csvData, {
            download: true,
            header: true,
            complete: (results) => {
                setHouseData(results.data);
                // Set the date range for the slider
                const dates = results.data.map(item => new Date(item.DATE).getTime());
                setDateRange({ min: Math.min(...dates), max: Math.max(...dates) });
                setSelectedDate(new Date(Math.min(...dates)));
            }
        });
    }, []);

    const handleSliderChange = (event) => {
        setSelectedDate(new Date(parseInt(event.target.value)));
    };

    const handleCheckboxChange = (event) => {
        setShowAllData(event.target.checked);
    };

    const filteredData = showAllData ? houseData : houseData.filter(house => {
        const houseDate = startOfDay(new Date(house.DATE));
        return houseDate.getTime() === startOfDay(selectedDate).getTime();
    });

    const getColorAndSize = (price) => {
        const avgPrice = parseFloat(price);
        if (avgPrice > 750000) return { color: 'red', radius: 10 };
        if (avgPrice > 600000) return { color: 'orange', radius: 8 };
        if (avgPrice > 450000) return { color: 'yellow', radius: 6 };
        if (avgPrice > 300000) return { color: 'blue', radius: 5 };
        return { color: 'green', radius: 4 }; // Default
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const position = [45.5017, -73.5673]; // Coordinates for Montreal
    const zoom = 13;

    // Define bounds for Montreal
    const corner1 = L.latLng(45.70, -73.9);
    const corner2 = L.latLng(45.4, -73.4);
    const bounds = L.latLngBounds(corner1, corner2);

    return (
        <div className={`map ${isCollapsed ? 'collapsed' : ''}`}>
            <input
                type="checkbox"
                checked={showAllData}
                onChange={handleCheckboxChange}
                className="show-all-data-checkbox"
            />
            <label htmlFor="show-all-data-checkbox" className={'showAllData'}>Show All Data</label>
            <input
                type="range"
                min={dateRange.min}
                max={dateRange.max}
                value={selectedDate ? selectedDate.getTime() : ''}
                onChange={handleSliderChange}
                className="date-slider"
                disabled={showAllData}
            />
            <div className={"date-axis"}>Date: {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}</div>
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
                {filteredData.map((house, index) => {
                    const { color, radius } = getColorAndSize(house['avg price in area']);
                    return (
                        <CircleMarker
                            key={index}
                            center={[parseFloat(house.latitude), parseFloat(house.longitude)]}
                            color={color}
                            radius={radius}
                            fillOpacity={0.5}
                        >
                            <Popup>
                                Area: {house.Area}<br />
                                Category: {house.CATEGORIE}<br />
                                Average Price: {formatPrice(house['avg price in area'])} $CAD
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Map;
