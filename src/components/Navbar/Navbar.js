import React from 'react'
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/';
    const getActiveTab = () => {
        const { pathname } = location;
        if (pathname === '/registration') return 'Registration';
        if (pathname === '/Interview_schedule') return 'Interview';
        if (pathname === '/result') return 'Result';
        if (pathname === '/dashboard') return 'Dashboard';
        if (pathname === '/candidate') return 'Candidate';
        return '';
    };
    const activeTab = getActiveTab();
    const _localData = JSON.parse(localStorage.getItem("employee_profile"))
    const logoutHandle = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            {
                !isLoginPage &&
                <nav className="navbar navbar-expand-lg  sidebar">
                    <div className="container-fluid">
                        <div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 sidebar-menu">
                                <li className={activeTab === 'Registration' ? 'active' : ''}>
                                    <Link to='/registration'>Registration</Link>
                                </li>
                                <li className={activeTab === 'Interview' ? 'active' : ''}>
                                    <Link to='/Interview_schedule'>Interview</Link>
                                </li>
                                <li className={activeTab === 'Candidate' ? 'active' : ''}>
                                    <Link to='/candidate'>Candidate</Link>
                                </li>
                                <li className={activeTab === 'Dashboard' ? 'active' : ''}>
                                    <Link to='/dashboard'>Dashboard</Link>
                                </li>
                                <li className={activeTab === 'Result' ? 'active' : ''}>
                                    <Link to='/result'>Result</Link>
                                </li>
                                <li onClick={logoutHandle}>
                                    {/* <button onClick={logoutHandle}  style={{color:"black",background:"#ededa7",border:"none",padding:"2px 10px"}}> */}
                                        logout
                                    {/* </button> */}
                                </li>
                                <li style={{ textTransform: "capitalize" }}>
                                    {_localData ? <div><AccountCircleIcon /> {_localData.name}</div> : null}
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            }
        </>
    )
}

export default Navbar
