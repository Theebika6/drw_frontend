import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import AboutUs from './Components/About-Us/AboutUs';
import Map from './Components/Map/map';
import Analytics from './Components/Analytics/Analytics'

const App = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <Router>
            <div className="App">
                <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
                <Routes>
                    <Route path="/" element={<Navigate to="/about-us" />} />
                    <Route path="/about-us" element={<AboutUs isSidebarCollapsed={isSidebarCollapsed} />} />
                    <Route path="/map" element={<Map isSidebarCollapsed={isSidebarCollapsed} />} />
                    <Route path="/analytics" element={<Analytics isSidebarCollapsed={isSidebarCollapsed} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

