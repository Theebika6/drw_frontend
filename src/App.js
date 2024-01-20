import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import AboutUs from './Components/About-Us/AboutUs';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Header />
                <Routes>
                    <Route path="/" element={<AboutUs />} />
                    {/* Add more routes here as needed */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
