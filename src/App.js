import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RegistrationForm from './components/Registration/RegistrationForm';
import Interview from './components/Interview_Details/Interview';
import Result from './components/Result/Result';
import LoginPage from './components/Login_page/LoginPage';
import Candidate from './components/Candidates/Candidate';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<LoginPage />}></Route>
              <Route path='/registration' element={<RegistrationForm />}></Route>
              <Route path='/Interview_schedule' element={<Interview />}></Route>
              <Route path='/result' element={<Result />}></Route>
              <Route path='/candidate' element={<Candidate />}></Route>
              <Route path='/dashboard' element={<Dashboard />}></Route>
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
