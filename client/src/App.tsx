import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Dashboard />
      </Router>
    </AuthProvider>
  );
}

export default App;
