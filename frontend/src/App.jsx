import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Fotter from "./components/Fotter";
import SignUp from "../pages/SignUp";
import Landing from "../pages/Landing";
import SignIn from "../pages/SignIn";
import Elections from "../pages/Elections";
import AdminNav from "./components/AdminNav";
import Dashboard from "../pages/Dashboard";
import Result from "../pages/Result";
import Notices from "../pages/Notices";
import Vote from "../pages/Vote";
import LearnMore from "../pages/LearnMore";

function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute ? <NavBar /> : <AdminNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/election" element={<Elections />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/learnmore" element={<LearnMore />} />
      </Routes>

      <Fotter />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
