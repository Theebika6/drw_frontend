import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import image1 from '../Images/AboutUs/montreal-1.jpeg';
import image2 from '../Images/AboutUs/montreal-2.jpeg';
import image3 from '../Images/AboutUs/montreal-3.jpeg';
import image4 from '../Images/AboutUs/montreal-4.jpeg';
import image5 from '../Images/AboutUs/montreal-5.jpeg';
import image6 from '../Images/AboutUs/montreal-6.jpeg';

const AboutUs = () => {
    const images = [image1, image2, image3, image4, image5, image6];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 5000); // Change image every 10 seconds
        return () => clearInterval(interval);
    }, [currentImage, images.length]);

    return (
        <div className="about-us">
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
            </div>
        </div>
    );
};

export default AboutUs;
