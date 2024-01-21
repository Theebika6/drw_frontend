import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import './Analytics.css';

import averagePriceData from '../Data/average_price.csv';

const Analytics = ({ isCollapsed }) => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        Papa.parse(averagePriceData, {
            download: true,
            header: true,
            complete: (results) => {
                const parsedData = results.data;
                console.log("Parsed CSV Data:", parsedData);

                // Ensure data is properly formatted and filter out any empty rows
                const filteredData = parsedData.filter(item => item.Region && item['Av.Price'])
                const sortedData = filteredData.sort((a, b) => parseFloat(a['Av.Price']) - parseFloat(b['Av.Price']));

                const regions = sortedData.map(item => item.Region);
                const prices = sortedData.map(item => parseFloat(item['Av.Price']));

                const backgroundColors = prices.map((price, index, arr) => {
                    const minPrice = arr[0];
                    const maxPrice = arr[arr.length - 1];
                    const ratio = (price - minPrice) / (maxPrice - minPrice);
                    return `rgba(${255 * ratio}, ${255 * (1 - ratio)}, 0, 0.6)`;
                });

                setChartData({
                    labels: regions,
                    datasets: [
                        {
                            label: 'Average Price',
                            data: prices,
                            backgroundColor: backgroundColors,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                setChartOptions({
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                        x: {
                            maxBarThickness: 50,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                });
            }
        });
    }, []);

    return (
        <div className={`analytics ${isCollapsed ? 'collapsed' : ''}`} style={{ height: '400px', width: '100%' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default Analytics;
