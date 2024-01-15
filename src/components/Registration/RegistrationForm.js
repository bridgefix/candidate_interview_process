import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Registration.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Radio, RadioGroup, FormControlLabel, Button, InputLabel, MenuItem, Select, FormControl, InputBase, InputAdornment, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { branchesList, candidateRegister, technologiesList, universitiesList, workExperienceList } from '../../Redux/action/RegistrationAction';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function RegistrationForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [technology, setTechnology] = useState("")
    const [branch, setBranch] = useState("")
    const [experience, setExperience] = useState("")
    const [university, setUniversity] = React.useState(null);
    const [universityInput, setUniversityInput] = React.useState("")
    const [year, setYear] = React.useState(null);
    const [DOB, setDOB] = React.useState(null);
    const universityList = useSelector((state) => state.RegistrationReducer.universityList)
    const branchList = useSelector((state) => state.RegistrationReducer.branchList)
    const experienceList = useSelector((state) => state.RegistrationReducer.experienceList)
    const technologyList = useSelector((state) => state.RegistrationReducer.technologyList)



    const handleSubmit = () => {
        let finalUniversity = ""
        if (university !== null) {
            finalUniversity = university
        }
        else if (universityInput !== "") {
            finalUniversity = universityInput
        }
        else {
            finalUniversity = ""
        }
        if (!fname || !lname || !phone || !email || !gender || !technology || !branch || !finalUniversity || !year || !DOB || !experience) {
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
            let payload = {
                "full_name": `${fname} ${lname}`,
                "gender": gender,
                "technology": { "name": technology },
                "branch": { "name": branch },
                "date_of_birth": DOB ? DOB.format('YYYY-MM-DD') : null,
                "pass_out_year": year ? year.format('YYYY') : null,
                "university": { "name": finalUniversity },
                "phone_number": phone,
                "email": email,
                "work_experience": { "name": experience }

            }
            dispatch(candidateRegister(payload, config, navigate))

        }
    }
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

    useEffect(() => {
        dispatch(universitiesList(config))
        dispatch(branchesList(config))
        dispatch(technologiesList(config))
        dispatch(workExperienceList(config))
    }, [])

    return (
        <div className='container registrationStyle'>
            <h2>Cadidate Registration From</h2>
            <hr></hr>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2}>
                    <h6>Full Name :</h6>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        component="form" sx={{ '& > :not(style)': { m: 1, width: 350 }, }} noValidate autoComplete="off" >
                        <TextField id="outlined-basic" value={fname} label="First Name" variant="outlined" onChange={(e) => setFname(e.target.value)} />
                    </Box>
                    <Box
                        component="form" sx={{ '& > :not(style)': { m: 1, width: 350 }, }} noValidate autoComplete="off" >
                        <TextField id="outlined-basic" value={lname} label="last Name" variant="outlined" onChange={(e) => setLname(e.target.value)} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2}>
                    <h6>Contact :</h6>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        component="form" sx={{ '& > :not(style)': { m: 1, width: 350 }, }} noValidate autoComplete="off" >
                        <TextField type="number" id="outlined-basic" value={phone} label="Number" variant="outlined" onChange={(e) => setPhone(e.target.value)} />
                    </Box>
                    <Box
                        component="form" sx={{ '& > :not(style)': { m: 1, width: 350 }, }} noValidate autoComplete="off" >
                        <TextField id="outlined-basic" value={email} label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                </Grid>

            </Grid>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2}>
                    <h6>College : </h6>
                </Grid>
                <Grid item xs={10}>
                    <Autocomplete
                        sx={{ m: 1, width: 350,}}
                        disablePortal
                        id="combo-box-demo"
                        value={(university == null && universityInput == "") ? null : (university !== null ? university : universityInput)}
                        onChange={(event, value) => setUniversity(value)}
                        options={universityList}
                        renderInput={(params) => <TextField {...params} label="University" value={university !== null ? university : universityInput} onChange={(e) => setUniversityInput(e.target.value == '' ? null : e.target.value)} sx={{  width: 350}} />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Pass Out Year"
                                views={['year']}
                                value={year}
                                sx={{ '& > :not(style)': { m: 1, width: '350px', height: "5ch", fontSize: "15px", textAlign: "left" }, }}
                                onChange={(newValue) => {
                                    setYear(newValue);
                                }}
                                inputProps={{
                                    component: TextField,
                                    variant: 'outlined',
                                }}
                            />
                        </LocalizationProvider>
                    </LocalizationProvider>

                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2}>
                    <h6>Branch : </h6>
                </Grid>
                <Grid item xs={10} >
                    <FormControl sx={{ m: 1, width: 350 }} size="small">
                        <InputLabel id="demo-select-small-label">Branch</InputLabel>
                        <Select value={branch} label="Branch" onChange={(event) => setBranch(event.target.value)} >
                            {
                                branchList.length !== 0 && branchList.map((branch, i) => {
                                    return (
                                        <MenuItem key={i} value={branch}>{branch}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2}>
                    <h6>Work Experience : </h6>
                </Grid>
                <Grid item xs={10} >
                    <FormControl sx={{ m: 1, width: 350 }} size="small">
                        <InputLabel id="demo-select-small-label">Work Experience</InputLabel>
                        <Select value={experience} label="Work Experience" onChange={(event) => setExperience(event.target.value)} >
                            {
                                experienceList.length !== 0 && experienceList.map((exp, i) => {
                                    return (
                                        <MenuItem key={i} value={exp}>{exp}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2} alignItems='center'>
                    <h6>Date Of Birth : </h6>
                </Grid>
                <Grid item xs={10}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={DOB ? DOB.format('YYYY-MM-DD') : null}
                                sx={{ '& > :not(style)': { m: 1, width: '350px', height: "5ch", fontSize: "15px" }, }}
                                onChange={(newValue) => { setDOB(newValue) }}
                                inputProps={{
                                    component: TextField,
                                    variant: 'outlined',
                                }}
                            />
                        </LocalizationProvider>

                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={2}>
                    <h6>Technology : </h6>
                </Grid>
                <Grid item xs={10}>
                    <FormControl sx={{ m: 1, width: 350 }} size="small">
                        <InputLabel id="demo-select-small-label">Technology</InputLabel>
                        <Select value={technology} label="Technology" onChange={(event) => setTechnology(event.target.value)} >
                            {
                                technologyList.length !== 0 && technologyList.map((tech, i) => {
                                    return (
                                        <MenuItem key={i} value={tech}>{tech}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid >
                <Grid container sx={{ marginTop: "20px" }}>
                    <Grid item xs={2}>
                        <h6>Gender :</h6>
                    </Grid>
                    <Grid item xs={10} >
                        <FormControl fullWidth>
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                                <FormControlLabel value="O" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className='submitBTN'>
                <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
            </Grid>
        </div>
    )
}

export default RegistrationForm
