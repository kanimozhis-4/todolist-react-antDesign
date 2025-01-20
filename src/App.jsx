import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import HomePage from "./components/HomePage";
import API from "./components/API";
import ProjectContext from "./contexts/ProjectContext";
import DisplayContent from "./components/Display/DisplayContent";
import DisplayContents from "./components/API";
import TaskContext from "./contexts/TaskContext";
import LogIn from "./components/LogIn";
import UserContext from "./contexts/UserContext";
import SignIn from "./components/SignIn";

function App() {
  return (
    <UserContext>
      <Router>
        <Routes> 
          <Route path="/" element={<LogIn />} />
          <Route path="/signin" element={<SignIn/>}/>
          <Route
            path="/homepage"
            element={
              <ProjectContext>
                <TaskContext>
                  <HomePage />
                </TaskContext>
              </ProjectContext>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProjectContext>
                <TaskContext>
                  <DisplayContent />
                </TaskContext>
              </ProjectContext>
            }
          />
        </Routes>
      </Router>
    </UserContext>
  );
}

export default App;
