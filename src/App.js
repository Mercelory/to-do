import SignIn from "./SignIn";
import Homepage from './Homepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'


function App() {
  return (
    <div>
    <Router>
        <Routes>
            <Route path = '/' element={<SignIn/>}/>
            <Route path = '/homepage' element={<Homepage/>}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App