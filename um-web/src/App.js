import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login';
import UserGrid from './pages/usergrid';
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/users" element={<UserGrid />} />
    </Routes>
  </Router>
  );
}

export default App;
