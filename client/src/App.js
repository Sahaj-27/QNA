import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Forgot from "./pages/forgot";
// import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="App">
      {/* <CustomCursor /> */}
      <Router>
        <Routes>
          <Route path="/QnA" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
