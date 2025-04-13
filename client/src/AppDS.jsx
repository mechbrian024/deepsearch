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
import Profile from "./pages/Profile";
import "./App.css";
import { SpotifyAuthProvider } from "./context/SpotifyAuthContext";
import PrivateRoute from "./components/PrivateRoute";

function AppDS() {
  return (
    <Router>
      <SpotifyAuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Protected routes */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {/* <Dashboard /> */}
                <Navigate to="/create-search" replace />
              </PrivateRoute>
            }
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/create-search"
            element={
              <PrivateRoute>
                <NewSearch />
              </PrivateRoute>
            }
          />
          {/* <Route path="/create-search" element={<NewSearch />} /> */}
          <Route
            path="/playlists"
            element={
              <PrivateRoute>
                <Playlists />
              </PrivateRoute>
            }
          />
          {/* <Route path="/playlists" element={<Playlists />} /> */}
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <Community />
              </PrivateRoute>
            }
          />
          {/* <Route path="/community" element={<Community />} /> */}
          <Route
            path="/searches"
            element={
              <PrivateRoute>
                <Searches />
              </PrivateRoute>
            }
          />
          {/* <Route path="/searches" element={<Searches />} /> */}
          {/* <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          /> */}
          {/* <Route path="/account" element={<Account />} /> */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </SpotifyAuthProvider>
    </Router>
  );
}

export default AppDS;
