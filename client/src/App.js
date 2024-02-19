import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup";
import About from "./pages/about";
import Home from "./pages/home";
import Forgot from "./pages/forgot";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/QnA" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/About" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
