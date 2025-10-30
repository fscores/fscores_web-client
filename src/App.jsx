import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
