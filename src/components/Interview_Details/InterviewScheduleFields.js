import React, { useEffect } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { candidateListApi, technologiesList } from '../../Redux/action/RegistrationAction';
import dayjs from 'dayjs';
import swal from 'sweetalert';


function InterviewScheduleFields(props) {
    const dispatch = useDispatch()
    const [candidateID, setCandidateID] = React.useState('');
    const [perticualrCandidate, setPerticualrCandidate] = React.useState(null)
    const [interviewRound, setInterviewRound] = React.useState('');
    const [candidateName, setCandidateName] = React.useState('');
    const [technology, setTechnology] = React.useState('');
    const [branch, setBranch] = React.useState('');
    const [time, setTime] = React.useState(30);
    const [date, setDate] = React.useState(dayjs(new Date().toLocaleDateString()));

    const technologyList = useSelector((state) => state.RegistrationReducer.technologyList)
    const candidateList = useSelector((state) => state.RegistrationReducer.candidates_list)
    let interviewRoundArr = [{ value: "first_round", label: "First Round" }, { value: "second_round", label: "Second Round" }, { value: "third_round", label: "Third Round" }]
    let timeArr = [{ lable: "20 min", value: 20 }, { lable: "30 min", value: 30 }, { lable: "40 min", value: 40 }, { lable: "1 hour", value: 60 }]

    const candidateSelect = (event) => {
        setCandidateID(event.target.value)
        setPerticualrCandidate(candidateList.filter((elem) => { return elem.id == event.target.value })[0])
    }

    useEffect(() => {
        if (perticualrCandidate !== null) {
            setTechnology(perticualrCandidate.technology.name)
            setInterviewRound(perticualrCandidate.interview_round)
            setBranch(perticualrCandidate.branch.name)
            setCandidateName(perticualrCandidate.full_name)
        }
    }, [perticualrCandidate])
    useEffect(() => {
        dispatch(candidateListApi(props.config))
        dispatch(technologiesList(props.config))
    }, [])
    const startBTN = () => {
        if (!candidateName || !interviewRound || !technology || !time) {
            swal({
                title: "Error",
                text: "Please fill all fields",
                icon: "error",
                dangerMode: true,
                timer: "3000",
                buttons: false
            });
        }
        else {
            const payload = {
                "candidateID": candidateID,
                "interviewRound": interviewRound,
                "candidateName": candidateName,
                "technology": technology,
                "branch": branch,
                "time": time,
                "date": date
            }
            props.startInterview(payload)
            setCandidateID("")
            setTime(30)
            setDate("")
            setInterviewRound("")
            setTechnology("")
        }
    }
    return (
        <Grid container style={{textAlign:"left"}}>
            <Grid item xs={4} justifyContent='start'>
                <FormControl sx={{ m: 1, width: 350 }} size="small">
                    <InputLabel id="demo-select-small-label">Candidate Name</InputLabel>
                    <Select value={candidateID} label="Candidate Name" onChange={candidateSelect}>
                        {
                            candidateList.length !== 0 && candidateList.map((candidate, i) => {
                                return (
                                    <MenuItem key={i} value={candidate.id}>{candidate.full_name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} justifyContent="start">
                <FormControl sx={{ m: 1, width: 350 }} size="small">
                    <InputLabel id="demo-select-small-label">Interview Round</InputLabel>
                    <Select value={interviewRound} label="Interview Round" onChange={(event) => setInterviewRound(event.target.value)}>
                        {
                            interviewRoundArr.map((round, i) => {
                                return (
                                    <MenuItem key={i} value={round.value}>{round.label}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} justifyContent="start">
                <FormControl sx={{ m: 1, width: 350 }} size="small">
                    <InputLabel id="demo-select-small-label">Technology</InputLabel>
                    <Select value={technology} label="Technology" onChange={(event) => setTechnology(event.target.value)} >
                        {
                            technologyList.map((tech, i) => {
                                return (
                                    <MenuItem key={i} value={tech}>{tech}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} justifyContent="start">
                <FormControl sx={{ m: 1, width: 350 }} size="small">
                    <InputLabel id="demo-select-small-label">Time</InputLabel>
                    <Select value={time} label="Time" onChange={(event) => setTime(parseInt(event.target.value))}>
                        {
                            timeArr.map((time, i) => {
                                return (
                                    <MenuItem key={i} value={time.value}>{time.lable}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} justifyContent="start">
                <LocalizationProvider dateAdapter={AdapterDayjs} variant="standard">
                    <DatePicker
                        value={date}
                        onChange={(newValue) => { setDate(newValue) }}
                        sx={{ '& > :not(style)': { m: 1, width: '42ch', height: "5ch", fontSize: "15px" }, }}
                        renderInput={(params) => (
                            <TextField {...params} variant="standard" sx={{ width: '100%' }} />
                        )}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} justifyContent='center' sx={{ marginTop: "20px" }}>
                <Button variant="contained" color="success" onClick={startBTN}>Start</Button>
            </Grid>
        </Grid>
    )
}

export default InterviewScheduleFields
