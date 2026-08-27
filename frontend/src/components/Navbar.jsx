import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-navbar">
      <div className="app-brand">
        💼 JobTrack
      </div>

      <div className="navbar-right">

        <span className="user-name">
          {user?.username}
        </span>

        <button
          className="theme-button"
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </header>
  );
}

export default Navbar;