import './App.css';
import Dashboard from './Dashboard';
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>

  )
}

export default App;
