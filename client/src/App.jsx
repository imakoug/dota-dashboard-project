import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/index";
import Dashboard from "./components/dashboard";
import "./App.css";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Dashboard/>
      </Router>
    </div>
  );

}

export default App;
