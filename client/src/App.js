import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Forgot from "./pages/forgot";
import Bot from "./pages/bot";
import { Toaster } from "react-hot-toast";
import { UserInfoContextProvider } from "./context/UserInfoContext";
import ProtectedRoutes from "./context/ProtectedRoutes";

// import CustomCursor from "./components/CustomCursor";

function App() {
	return (
		<UserInfoContextProvider>
			<div className="App">
				<Toaster />
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/forgot" element={<Forgot />} />
						<Route path="/" element={<Home />} />
						<Route path="*" element={<ProtectedRoutes />} />
					</Routes>
				</Router>
			</div>
		</UserInfoContextProvider>
	);
}

export default App;
