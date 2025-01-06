import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import HomePage from './components/HomePage';
import API from './components/API';
import ProjectContext from './contexts/ProjectContext';
import DisplayContent from './components/Display/DisplayContent';
import DisplayContents from './components/API';

function App() {

  return (
    <ProjectContext> 
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/project/:id" element={<DisplayContent/>} />
        
      </Routes>
    </Router> 
  </ProjectContext>
  )
}

export default App
