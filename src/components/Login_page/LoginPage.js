import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import './loginForm.css'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFormApi } from '../../Redux/action/loginAction';

const defaultTheme = createTheme();

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const loginFormSubmit = () => {
    const formData = new FormData() 
    formData.append("email",email)
    formData.append("password",password)
    dispatch(loginFormApi(formData,navigate))
  }
  return (
    <div className='loginStyle'>
      <div className='formStyle'>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <Avatar sx={{ m: 1, bgcolor: '#12646c' }}> <LockOutlinedIcon /></Avatar>
              <Typography component="h1" variant="h5"> Log in </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField margin="normal"
                  required
                  fullWidth
                  placeholder="Email*"
                  name="email"
                  variant='standard'
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginTop: "30px" }}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password*"
                  type="password"
                  id="password"
                  variant='standard'
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginTop: "30px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 ,marginTop:"30px"}} onClick={loginFormSubmit}>
                  Sign In
                </Button>
              </Box>
            </Box>

          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}