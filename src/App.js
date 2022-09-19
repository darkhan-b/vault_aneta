import React from 'react';
import './App.css';
import Bridge from './pages/Bridge/Bridge'
import Feedback from './pages/Feedback/Feedback'
import Vault from './pages/Vault/Vault'
import {Routes, Route} from "react-router-dom";
import Navbar from './pages/Navbar.tsx'
import Transactions from './pages/Transactions/Transactions'
import Dashboard from './pages/Dashboard/Dashboard'
import Menu from './pages/Menu'

function App() {
  return (
    <div className="App" >

      <Navbar />
      <Menu />
      
      <Routes><Route path="/" element={<Bridge />} /></Routes>
      <Routes><Route path="/transactions" element={<Transactions />} /></Routes>
      <Routes><Route path="/dashboard" element={<Dashboard />} /></Routes>
      <Routes><Route path="/feedback" element={<Feedback />} /></Routes>
   
    </div>
  )
}

export default App;
