import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Forgot from "./pages/forgot";
import { Toaster } from "react-hot-toast";
import { UserInfoContextProvider } from "./context/UserInfoContext";
import ProtectedRoutes from "./context/ProtectedRoutes";
import { Provider } from 'react-redux';
import { store } from './store';

// import CustomCursor from "./components/CustomCursor";

function App() {
	return (
		<UserInfoContextProvider>
			    <Provider store={store}>
			
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
			</Provider>
		</UserInfoContextProvider>
	);
}

export default App;
