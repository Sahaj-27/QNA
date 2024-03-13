import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Forgot from "./pages/forgot";
import Bot from "./pages/bot";
import { Toaster } from "react-hot-toast";
import { UserInfoContextProvider } from "./context/UserInfoContext";
import ProtectedRoute from "./context/ProtectedRoutes";

// import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <UserInfoContextProvider>
    <div className="App">
      <Toaster  />
      <Router>
        <Switch>
          <ProtectedRoute path="/bot-chat" element={<Bot />} />
          <ProtectedRoute path="/QnA-Input" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/" element={<Home />} />
          </Switch>
      </Router>
    </div>
    </UserInfoContextProvider>
  );
}

export default App;
