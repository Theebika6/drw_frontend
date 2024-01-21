import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import image1 from '../Images/AboutUs/montreal-1.jpeg';
import image2 from '../Images/AboutUs/montreal-2.jpeg';
import image3 from '../Images/AboutUs/montreal-3.jpeg';
import image4 from '../Images/AboutUs/montreal-4.jpeg';
import image5 from '../Images/AboutUs/montreal-5.jpeg';
import image6 from '../Images/AboutUs/montreal-6.jpeg';

const AboutUs = ({ isSidebarCollapsed }) => {
    const images = [image1, image2, image3, image4, image5, image6];
    const [currentImage, setCurrentImage] = useState(0);
    const [price, setPrice] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 5000); // Change image every 10 seconds
        return () => clearInterval(interval);
    }, [currentImage, images.length]);

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        setPrice(value);
    };

    const formatPrice = (value) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(value).slice(1); // Remove the '$' from the formatter
    };

    return (
        <div className={`about-us ${isSidebarCollapsed ? 'expanded' : ''}`}>
            <div className="background-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Background ${index + 1}`}
                        style={{ opacity: index === currentImage ? 1 : 0 }}
                    />
                ))}
            </div>
            <div className='Welcome-header'>
                <h1>Choose your next location...</h1>
            </div>
            <div className="search-bar-container">
                <input type="text" className="search-bar" placeholder="Search For Location..." />
                <input
                    type="text"
                    className="price-tag"
                    value={formatPrice(price)}
                    placeholder="Price Estimation..."
                    onChange={handlePriceChange}
                    step="1000"
                />
                <span className="dollar-sign">CAD$</span>
                <button type="submit" className="submit-button">Submit</button>
                <div className="about-section">
                    <h2>About Us</h2>
                    <p>In response to DRW's challenge, our team has crafted a tool that bridges the gap between Montreal's Open Data and the community. It's a straightforward platform designed to reveal insights into real estate values and safety, helping newcomers and residents alike understand the dynamics of their city. Join us in exploring the landscape of Montreal through the clear lens of data.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
