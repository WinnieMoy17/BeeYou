import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {
  Home,
  Login,
  Register,
  Dashboard
} from './pages';
import Wrapper from './components/Wrapper';

function App() {

  return (
    <Wrapper>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    </Wrapper>
    
  )
}

export default App;
