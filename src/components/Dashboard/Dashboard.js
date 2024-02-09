import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Grid } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardApi } from '../../Redux/action/interviewAction'
function Dashboard() {
    const dispatch = useDispatch()
    const [monthdata, setMonthData] = useState([])
    const [monthCategories, setMonthCategories] = useState([])
    const [candidateTechCount, setCandidateTechCount] = useState([])
    const [candidateTechCountCategories, setcandidateTechCountCategories] = useState([])
    const [Yeardata, setYearData] = useState([])
    const [YearCategories, setYearCategories] = useState([])
    const [empTakeInterview, seTempTakeInterview] = useState([])
    const [empTakeInterviewCategories, seTempTakeInterviewCategories] = useState([])
    const dashboardData = useSelector((state) => state.InterviewReducer.dashboardData)
    useEffect(() => {
        if (dashboardData !== null) {
            if (dashboardData.candidate_count_by_month !== null) {
                const newData = [1, 3, 5, 9];
                const newCategories = ['Jan', 'Apr', 'Aug', 'Sep', 'Jun', 'Nov', 'Dec'];
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                dashboardData.candidate_count_by_month.map((value, index) => {
                    const date = new Date(value.month);
                    const month = (date.getMonth()).toString().padStart(2, '0');
                    const monthName = monthNames[parseInt(month)];
                    newData.push(value.c);
                    newCategories.push(monthName);
                });
                setMonthData(newData);
                setMonthCategories(newCategories);
            }
            if (dashboardData.candidate_count_by_year !== null) {
                const newData = [3, 6, 9, 5, 4];
                const newCategories = [2019, 2020, 2021, 2022, 2023];
                dashboardData.candidate_count_by_year.map((value, index) => {
                    const date = new Date(value.years);
                    const year = (date.getFullYear());
                    newData.push(value.c);
                    newCategories.push(year);
                });
                setYearData(newData);
                setYearCategories(newCategories);
            }
            if (dashboardData.cadidate_technology_count !== null) {
                const newData = [];
                const newCategories = [];
                dashboardData.cadidate_technology_count.map((value, index) => {
                    newData.push(value.candidate_technology_count)
                    newCategories.push(value.technology__name)
                });
                setCandidateTechCount(newData)
                setcandidateTechCountCategories(newCategories)
            }
            if (dashboardData.employee_take_interview !== null) {
                const newData = [];
                const newCategories = [];
                dashboardData.employee_take_interview.map((value, index) => {
                    newData.push(value.interview_count_by_emp)
                    newCategories.push(value.employee_user__name)
                });
                seTempTakeInterview(newData)
                seTempTakeInterviewCategories(newCategories)
            }
        }
    }, [dashboardData]);

    useEffect(() => {
        dispatch(DashboardApi())
    }, [])

    // Candidate interview by Month
    const Monthseries = [
        {
            name: 'Candidate',
            data: monthdata,
        },

    ]
    const Monthoptions = {
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
            text: 'Candidate interview by Month',
            align: 'left',
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: monthCategories,
        },
    }

    // Candidate Technology Count
    const seriesDonut = candidateTechCount;
    const optionsDonut = {
        chart: {
            width: 380,
            type: 'pie',
        },
        title: {
            text: 'Candidate Technology Count',
            align: 'left',
        },
        labels: candidateTechCountCategories,
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

    // Candidate interview by year

    const yearSeries = [
        {
            name: 'Candidate',
            data: Yeardata,
        },
    ]
    const yearOptions = {
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
            text: 'Candidate interview by Year',
            align: 'left',
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: YearCategories,
            labels: {
                position: 'bottom'
            }
        },
    }

    // donut chart data

    const seriesPie = empTakeInterview;
    const optionsPie = {
        chart: {
            width: 380,
            type: 'pie',
        },
        title: {
            text: 'Employee Take Interview',
            align: 'left',
        },
        labels: empTakeInterviewCategories,
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
                        <div style={{ width: '100%', margin: "50px" }}>
                            <ReactApexChart options={Monthoptions} series={Monthseries} type='line' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '100%', margin: "50px" }}>
                            <ReactApexChart options={optionsDonut} series={seriesDonut} type='donut' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '90%', margin: "50px" }}>
                            <ReactApexChart options={optionsPie} series={seriesPie} type='pie' height={350} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '100%', margin: "50px" }}>
                            <ReactApexChart options={yearOptions} series={yearSeries} type='bar' height={350} />
                        </div>
                    </Grid>


                </Grid>
            </div>
        </>
    )
}

export default Dashboard
