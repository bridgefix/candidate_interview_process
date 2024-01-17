import React, { useEffect, useState } from 'react'
import './interview.css'
import { Grid, InputLabel, MenuItem, FormControl, Select, Button, TextField, Box, OutlinedInput, Chip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { employee_List, interViewResultApi, question_List } from '../../Redux/action/interviewAction';
import InterviewScheduleFields from './InterviewScheduleFields';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Interview() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [timer, setTimer] = React.useState('');
  const [interviewState, setInterviewState] = React.useState(false)
  const [perticualrCandidate, setPerticualrCandidate] = React.useState(null)
  const [interViewer, setinterViewer] = React.useState([]);
  const [rating, setRating] = useState('')
  const [feedback, setFeedback] = useState('')
  const employeeList = useSelector((state) => state.InterviewReducer.employeeList)
  const QuestionsList = useSelector((state) => state.InterviewReducer.quetionsList)
  const interviewPostResponse = useSelector((state) => state.InterviewReducer.interviewPostResponse)
  let loginEmployeeProfile = JSON.parse(localStorage.getItem("employee_profile"))
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

  const startInterview = (value) => {
    if (loginEmployeeProfile) {
      setinterViewer([loginEmployeeProfile.id]);
    }
    setPerticualrCandidate(value)
    dispatch(employee_List(config))
    dispatch(question_List(value.technology, config))
    setInterviewState(true)
  }

  useEffect(() => {
    if (interviewPostResponse) {
      setInterviewState(false)
      setFeedback("")
      setRating("")
    }
  }, [interviewPostResponse])
  useEffect(() => {
    let countdownInterval;
    if (!interviewState) {
      setFeedback("")
      setRating("")
    }
    if (perticualrCandidate && typeof perticualrCandidate.time === 'number' && perticualrCandidate.time > 0 && interviewState) {
      let totalSeconds = perticualrCandidate.time * 60;
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


  }, [interviewState, perticualrCandidate]);


  const handleChange = (event) => {
    setinterViewer(typeof event.target.value === 'number' ? event.target.value.split(',') : event.target.value);
  };

  const getEmployeeNameById = (id) => {
    const employee = employeeList.find((emp) => emp.id === id);
    return employee ? employee.name : '';
  };

  const resultSubmit = (result) => {
    const payload = {
      "candidate_interview_id": perticualrCandidate.candidateID,
      "feedback": feedback,
      "interview_rating": parseInt(rating),
      "employee_user": interViewer,
      "interview_round": perticualrCandidate.interviewRound
    }
    dispatch(interViewResultApi(result, payload, config))
  }

  return (
    <div className='container mainDivStyle'>
      <h2>Interview Schedule</h2>
      <hr></hr>
      {
        interviewState
          ? <>
            <h6> Remaining Time : {timer} </h6>
            <Grid container sx={{ justifyContent: 'space-evenly' }} >
              <Item><span style={{ fontWeight: "600" }}>Date : </span>{perticualrCandidate.date ? perticualrCandidate.date.format('DD/MM/YYYY') : new Date().toLocaleDateString()}</Item>
              <Item><span style={{ fontWeight: "600" }}>Time : </span>{perticualrCandidate.time} min</Item>
              <Item><span style={{ fontWeight: "600" }}>Candidate Name : </span>{perticualrCandidate.candidateName}</Item>
              <Item><span style={{ fontWeight: "600" }}>Branch : </span>{perticualrCandidate.branch}</Item>
              <Item><span style={{ fontWeight: "600" }}>Technology : </span>{perticualrCandidate.technology}</Item>
            </Grid>
            <hr></hr>
            <div sx={{ justifyContent: 'center' }} className='qustionsStyle' style={QuestionsList.length >= 5 ? { maxHeight: '350px', overflowY: 'scroll' } : { minHeight: '200px' }}>
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
              <Grid item xs={8} sx={{ justifyContent: 'start' }}>
                <Box className='feedbackStyle' component="form" sx={{ '& > :not(style)': { m: 1, width: '70ch' } }} noValidate autoComplete="off">
                  <TextField id="outlined-basic" label="Feedback" variant="outlined" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </Box>
              </Grid>

              <Grid item xs={4} sx={{ justifyContent: 'center', alignItems: "center" }} >
                <Rating name="size-large" defaultValue={0} size="large" value={Number(rating)} onChange={(e) => setRating(e.target.value)} />
              </Grid>

              <Grid item xs={8} sx={{ justifyContent: 'start' }} >
                <FormControl sx={{ m: 1, width: '70ch' }}>
                  <InputLabel id="demo-multiple-chip-label">Interviewer Name</InputLabel>
                  <Select
                    multiple
                    value={interViewer}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Interviewer Name" />}
                    renderValue={(selected) =>
                    (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (<Chip key={value} label={getEmployeeNameById(value)} />))}
                      </Box>
                    )
                    }
                  >
                    {employeeList.length > 0 && employeeList.map((emp, i) => {
                      return (
                        <MenuItem key={i} value={emp.id}>{emp.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sx={{ justifyContent: 'end', alignItems: 'center' }} >
                <Button variant="contained" color="error" sx={{ marginRight: "40px" }} onClick={() => setInterviewState(false)}>Cancel</Button>
                <Button variant="contained" color="success" sx={{ marginRight: "40px" }} onClick={() => resultSubmit("pass")}>Pass</Button>
                <Button variant="contained" color="warning" sx={{ marginRight: "40px" }} onClick={() => resultSubmit("fail")}>Fail</Button>
              </Grid>
            </Grid>
          </>
          :
          <InterviewScheduleFields config={config} startInterview={startInterview} />
      }
    </div>
  )
}
