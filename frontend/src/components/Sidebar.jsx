import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className="sidebar-link"
        >
          Applications
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;