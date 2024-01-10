import React, { useEffect, useState } from 'react'
import './interview.css'
import { Grid, InputLabel, MenuItem, FormControl, Select, Button, TextField, Checkbox, Box, OutlinedInput, Chip, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import dayjs from 'dayjs';
import { candidateListApi, technologiesList } from '../../Redux/action/RegistrationAction';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { employee_List, question_List } from '../../Redux/action/interviewAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Interview() {
  const dispatch = useDispatch()
  const [time, setTime] = React.useState(30);
  const [timer, setTimer] = React.useState('');
  const [date, setDate] = React.useState('');
  const [candidateID, setCandidateID] = React.useState('');
  const [candidateName, setCandidateName] = React.useState('');
  const [interviewRound, setInterviewRound] = React.useState('');
  const [technology, setTechnology] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [interviewState, setInterviewState] = React.useState(false)
  const [perticualrCandidate, setPerticualrCandidate] = React.useState(null)
  const [intewViewerName, setintewViewerName] = React.useState([]);
  const [rating, setRating] = useState('')
  const [feedback, setFeedback] = useState('')
  const candidateList = useSelector((state) => state.RegistrationReducer.candidates_list)
  const technologyList = useSelector((state) => state.RegistrationReducer.technologyList)
  const employeeList = useSelector((state) => state.InterviewReducer.employeeList)
  const QuestionsList = useSelector((state) => state.InterviewReducer.quetionsList)

  const candidateSelect = (event) => {
    setCandidateID(event.target.value)
    setPerticualrCandidate(candidateList.filter((elem) => { return elem.id == event.target.value })[0])
  }

  useEffect(() => {
    let loginEmployeeProfile = JSON.parse(localStorage.getItem("employee_profile"))
    if (loginEmployeeProfile) {
      setintewViewerName(typeof loginEmployeeProfile.name === 'string' ? loginEmployeeProfile.name.split(',') : loginEmployeeProfile.name);
    }
    if (perticualrCandidate !== null) {
      setTechnology(perticualrCandidate.technology.name)
      setInterviewRound(perticualrCandidate.interview_round)
      setBranch(perticualrCandidate.branch.name)
      setCandidateName(perticualrCandidate.full_name)
    }
  }, [perticualrCandidate])

  let timeArr = [{ lable: "20 min", value: 20 }, { lable: "30 min", value: 30 }, { lable: "40 min", value: 40 }, { lable: "1 hour", value: 60 }]
  let interviewRoundArr = [{ value: "first_round", label: "First Round" }, { value: "second_round", label: "Second Round" }, { value: "third_round", label: "Third Round" }]

  const startInterview = () => {
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
      dispatch(employee_List(config))
      dispatch(question_List(technology, config))
      setInterviewState(true)
    }
  }
  const cancleInterview = () => {
    setInterviewState(false)
    setCandidateID("")
    setTime(30)
    setTimer("")
    setDate("")
    setInterviewRound("")
    setTechnology("")
  }
  useEffect(() => {
    let countdownInterval;
    if (typeof time === 'number' && time > 0 && interviewState) {
      let totalSeconds = time * 60;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

      countdownInterval = setInterval(() => {
        totalSeconds -= 1;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

        if (totalSeconds <= 0) {
          clearInterval(countdownInterval);
          setTimer('Time up!');
        }
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [interviewState, time]);

  let todayDate = dayjs(new Date().toLocaleDateString());
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

  useEffect(() => {
    dispatch(candidateListApi(config))
    dispatch(technologiesList(config))
  }, [])

  const handleChange = (event) => {
    setintewViewerName(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  };
  return (
    <div className='container mainDivStyle'>
      <h2>Interview Schedule</h2>
      <hr></hr>
      {
        interviewState
          ? <>
            <h6> Remaining Time : {timer} </h6>
            <Grid container justifyContent='space-evenly'>
              <Item><span style={{ fontWeight: "600" }}>Date : </span>{date ? date.format('DD/MM/YYYY') : new Date().toLocaleDateString()}</Item>
              <Item><span style={{ fontWeight: "600" }}>Time : </span>{time} min</Item>
              <Item><span style={{ fontWeight: "600" }}>Candidate Name : </span>{candidateName}</Item>
              <Item><span style={{ fontWeight: "600" }}>Branch : </span>{branch}</Item>
              <Item><span style={{ fontWeight: "600" }}>Technology : </span>{technology}</Item>
            </Grid>
            <hr></hr>
            <div justifyContent="center" className='qustionsStyle' style={QuestionsList.length >= 5 ? { maxHeight: '350px', overflowY: 'scroll' } : { minHeight: '200px' }}>
              {
                QuestionsList.length > 0
                  ? QuestionsList.map((question, i) => {
                    return (
                      <Grid container key={i}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}><p> {i + 1}) &nbsp; {question.question_text}</p></Grid>
                      </Grid>
                    )
                  })
                  : <Typography sx={{ textAlign: "center !important" }}>No Question</Typography>
              }
            </div>
            <hr></hr>
            <Grid container sx={{ marginTop: "30px" }}>
              <Grid item xs={8} justifyContent="start">
                <Box className='feedbackStyle' component="form" sx={{ '& > :not(style)': { m: 1, width: '70ch' } }} noValidate autoComplete="off">
                  <TextField id="outlined-basic" label="Feedback" variant="outlined" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </Box>
              </Grid>

              <Grid item xs={4} justifyContent="center" alignItems='center'>
                <Rating name="size-large" defaultValue={0} size="large" value={rating} onChange={(e) => setRating(e.target.value)} />
              </Grid>

              <Grid item xs={8} justifyContent="start">
                <FormControl sx={{ m: 1, width: '70ch' }}>
                  <InputLabel id="demo-multiple-chip-label">Interviewer Name</InputLabel>
                  <Select
                    multiple
                    value={intewViewerName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Interviewer Name" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (<Chip key={value} label={value} />))}
                      </Box>
                    )}
                  >
                    {employeeList.length > 0 && employeeList.map((emp, i) => {
                      return (
                        <MenuItem key={i} value={emp.name} > {emp.name} </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} justifyContent="end" alignItems='center'>
                <Button variant="contained" color="error" sx={{ marginRight: "40px" }} onClick={cancleInterview}>Cancel</Button>
                <Button variant="contained" color="success" sx={{ marginRight: "40px" }} >Pass</Button>
                <Button variant="contained" color="warning" sx={{ marginRight: "40px" }} >Fail</Button>
              </Grid>
            </Grid>
          </>
          : <Grid container>
            <Grid item xs={4} justifyContent='start'>
              <FormControl sx={{ m: 1, width: 350 }} size="small">
                <InputLabel id="demo-select-small-label">Candidate Name</InputLabel>
                <Select
                  value={candidateID}
                  label="Candidate Name"
                  onChange={candidateSelect}
                >
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
                <Select
                  value={interviewRound}
                  label="Interview Round"
                  onChange={(event) => setInterviewRound(event.target.value)}
                >
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
                <Select
                  value={technology}
                  label="Technology"
                  onChange={(event) => setTechnology(event.target.value)}
                >
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
                <Select
                  value={time}
                  label="Time"
                  onChange={(event) => setTime(parseInt(event.target.value))}
                >
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
                  value={date ? date.format('DD/MM/YYYY') : todayDate}
                  defaultValue={new Date().toLocaleDateString()}
                  onChange={(newValue) => { setDate(newValue) }}
                  sx={{ '& > :not(style)': { m: 1, width: '42ch', height: "5ch", fontSize: "15px" }, }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" sx={{ width: '100%' }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} justifyContent='center' sx={{ marginTop: "20px" }}>
              <Button variant="contained" color="success" onClick={startInterview}>Start</Button>
            </Grid>
          </Grid>
      }
    </div>
  )
}
