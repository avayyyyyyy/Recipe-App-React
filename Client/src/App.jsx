import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import "./App.css";
import Signup from "./SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
