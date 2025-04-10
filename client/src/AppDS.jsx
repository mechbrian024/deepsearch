import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import NewSearch from "./pages/NewSearch";
import Playlists from "./pages/Playlists";
import Community from "./pages/Community";
import Searches from "./pages/Searches";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function AppDS() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-search" element={<NewSearch />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/community" element={<Community />} />
        <Route path="/searches" element={<Searches />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default AppDS;
