import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
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
