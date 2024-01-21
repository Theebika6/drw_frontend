import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Analytics.css';

const Analytics = ({ isCollapsed }) => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Parse the CSV file
        Papa.parse("/Data/average_price.csv", {
            download: true,
            header: true,
            complete: (results) => {
                const data = results.data;
                console.log("Parsed CSV Data:", data); // Log the parsed data
                const regions = data.map(item => item.Region);
                const prices = data.map(item => item['Av.Price']);

                // Set the data for the bar chart
                setChartData({
                    labels: regions,
                    datasets: [
                        {
                            label: 'Average Price',
                            data: prices,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                // Set the options for the bar chart
                setChartOptions({
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
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
