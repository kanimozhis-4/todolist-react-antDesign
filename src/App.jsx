import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import HomePage from './components/HomePage';
import API from './components/API';
import ProjectContext from './contexts/ProjectContext';
import DisplayContent from './components/Display/DisplayContent';
import DisplayContents from './components/API';
import TaskContext from './contexts/TaskContext';

function App() {

  return (
    <ProjectContext>  
      <TaskContext>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path="/project/:id" element={<DisplayContent/>} />
          
        </Routes>
      </Router>  
    </TaskContext>
  </ProjectContext>
  )
}

export default App
