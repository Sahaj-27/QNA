import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Forgot from "./pages/forgot";
import { Toaster } from "react-hot-toast";
import { UserInfoContextProvider } from "./context/UserInfoContext";
import ProtectedRoutes from "./context/ProtectedRoutes";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { useMediaQuery } from "react-responsive";

const App = () => {
	const isDesktop = useMediaQuery({ minWidth: 1024 });
	const display = {}; // Add this line

	return (
		<>
			{isDesktop ? (
				<UserInfoContextProvider>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
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
						</PersistGate>
					</Provider>
				</UserInfoContextProvider>
			) : (
				<div className="App">
					<p
						style={{
							...display,
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							textAlign: "center",
						}}
					>
						This website can only be accessed in desktop mode. Mobile view is
						not available.
					</p>{" "}
				</div>
			)}
		</>
	);
};

export default App;
