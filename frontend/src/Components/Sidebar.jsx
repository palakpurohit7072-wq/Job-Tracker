import { Link } from "react-router-dom";

function Sidebar() {
  return (
    
      <div className="bg-light  p-3 vh-100">
      <h5>Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;