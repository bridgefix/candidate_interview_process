import React, { useState } from 'react'
import './Dashboard.css'
import { Grid } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
function Dashboard() {
    const series = [
        {
            name: 'Desktops',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
    ]

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left',
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
    }

    const seriesPie = [44, 55, 13, 43, 22];
    const optionsPie = {
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };


    return (
        <>
            <div className='container dashboardStyle'>
                <Grid container>
                    <Grid item xs={6} >
                        <div style={{ width: '90%', margin: "50px" }}>
                            <ReactApexChart options={options} series={series} type='line' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '90%', margin: "50px" }}>
                            <ReactApexChart options={optionsPie} series={seriesPie} type='donut' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '90%', margin: "50px" }}>
                            <ReactApexChart options={options} series={series} type='bar' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '90%', margin: "50px" }}>
                            <ReactApexChart options={options} series={series} type='area' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '90%', margin: "50px" }}>
                            <ReactApexChart options={optionsPie} series={seriesPie} type='pie' height={350} />
                        </div>
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default Dashboard
