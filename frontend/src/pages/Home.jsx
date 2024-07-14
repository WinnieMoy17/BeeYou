import React from "react";
import beeIcon from "../assets/bee.png";
import "../stylesheets/Home.css"
import { useNavigate, Navigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
      }
    
    const navigateToRegister = () => {
        navigate('/register');
    }
    return (
        <div className="home">
            <img src={beeIcon}/>
            <h1 className="app-name-home">BeeYou</h1>
            <p className="hook-line">Bee-ing yourself!</p>
            <button className="button" onClick={navigateToLogin}>Login</button>
            <button className="button" onClick={navigateToRegister}>Register</button>
        </div>
    )
}

export default Home