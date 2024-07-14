import React from "react";
import beeIcon from "../assets/bee.png";
import '../stylesheets/Login.css';
import arrowLeft from "../assets/arrow-left@512w.png";
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate('/');
      }
    
    const tempNav = () => {
        navigate('/dashboard');
    }
    
    return (
        <>
            <button className="back-button" onClick={navigateBack}>
                <img src={arrowLeft} className="arrow-left"/>
            </button>
            <div className="login">
                {/* <form onSubmit={handleSubmit} className="login-form"> */}
                    <div className="app-title">
                        <img src={beeIcon} className="login-bee"/>
                        <h2 className="app-name">BeeYou</h2>
                    </div>
                    <h1 className="auth-title">Login</h1>
                    <div className="auth-input">
                        <label className="auth-label">Username</label>
                        <input
                            type="text"
                            className="input-fields"
                            />
                    </div>
                    <div className="auth-input">
                        <label className="auth-label">Password</label>
                        <input
                            type="password"
                            className="input-fields"
                            />
                    </div>
                    <a className="forgot-pw">Forgot Password?</a>
                    <button onClick={tempNav} className="submit-button">Login</button>
                {/* </form> */}
            </div>
        </>
    )
}

export default Login;