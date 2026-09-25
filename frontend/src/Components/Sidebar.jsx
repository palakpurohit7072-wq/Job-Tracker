import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-light border-end p-2 p-lg-3">

      <h5 className="fw-semibold mb-2 mb-lg-3">
        Menu
      </h5>

      <ul className="nav flex-row flex-lg-column">

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/jobs"
          >
            Jobs
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/profile"
          >
            Profile
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;