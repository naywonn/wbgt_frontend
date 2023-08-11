import React from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    return (
        <nav className="py-2 bg-light border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo-container">
                    <img src="/wbgtTeam9.jpeg" alt="Logo" className="logo-img1" />
                    <h1 className="logo-text">Team 9 AD Project</h1>
                </div>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/staffsList"}>Manage Staff</Link>
                            </li>
                        </>
                    )}
                    {!isLoggedIn ? (
                        <li className="nav-item">
                            <Link className="nav-link" to={"/staff/login"}>Login</Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => { handleLogout(); navigate("/"); }}>Logout </button>
                        </li>
                    )}

                </ul>
            </div>
        </nav>
    );
}

export default NavigationBar;
