import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    return (
        <nav className="py-2 bg-light border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <div>
                    <img src="/logo192.png" alt="Logo" className="logo-img" />
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
                            <Link className="nav-link" to={"/api/login"}>Login</Link>
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
