import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Playlists from "./pages/Playlists";
import Community from "./pages/Community";
import Searches from "./pages/Searches";
import Account from "./pages/Account";

function AppDS() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/community" element={<Community />} />
        <Route path="/searches" element={<Searches />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default AppDS;
