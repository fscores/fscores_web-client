import "./App.css";
import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-4">
        <Outlet /> {/* This is where nested route components will render */}
      </div>
    </div>
  );
}

export default App;
