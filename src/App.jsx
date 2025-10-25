import './App.css'
import { Outlet, Link } from "react-router-dom";

function App() {

  return (
    <div>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/players">Players</Link>
        <Link to="/clubs">Clubs</Link>
      </nav>
      <Outlet /> {/* This is where nested route components will render */}
    </div>
  )
}

export default App
