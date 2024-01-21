import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import Chart, { registerables } from 'chart.js/auto';
import './Analytics.css';

import averagePriceData from '../Data/average_price.csv';
import averageCrimeData from '../Data/NumOfCrime.csv';

// Register the required components
Chart.register(...registerables);

const Analytics = ({ isCollapsed }) => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    const [crimeChartData, setCrimeChartData] = useState({ datasets: [] });
    const [crimeChartOptions, setCrimeChartOptions] = useState({});

    useEffect(() => {
        // Parse and process the average price data
        Papa.parse(averagePriceData, {
            download: true,
            header: true,
            complete: (results) => {
                const parsedData = results.data;
                console.log("Parsed CSV Data:", parsedData);

                const filteredData = parsedData.filter(item => item.Region && item['Av.Price']);
                const sortedData = filteredData.sort((a, b) => parseFloat(a['Av.Price']) - parseFloat(b['Av.Price']));

                const regions = sortedData.map(item => item.Region);
                const prices = sortedData.map(item => parseFloat(item['Av.Price']));

                setChartData({
                    labels: regions,
                    datasets: [
                        {
                            label: 'Average Price',
                            data: prices,
                            backgroundColor: '#09D4D7',
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

        // Parse and process the crime data
        Papa.parse(averageCrimeData, {
            download: true,
            header: true,
            complete: (results) => {
                const crimeData = results.data;
                console.log("Parsed Crime Data:", crimeData);

                const areas = crimeData.map(item => item.Area);
                const numOfCrimes = crimeData.map(item => parseInt(item.NumOfCrime));

                setCrimeChartData({
                    labels: areas,
                    datasets: [
                        {
                            label: 'Number of Crimes',
                            data: numOfCrimes,
                            backgroundColor:  '#09D4D7',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                setCrimeChartOptions({
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
        <div className={`analytics ${isCollapsed ? 'collapsed' : ''}`} style={{ height: '500px', width: '80%' }}>
            <div className={'chartData'}>
                <Bar data={chartData} options={chartOptions}/>
            </div>
            <div className={'crimeChart'}>
                <Bar data={crimeChartData} options={crimeChartOptions} />
            </div>
        </div>
    );
};

export default Analytics;
