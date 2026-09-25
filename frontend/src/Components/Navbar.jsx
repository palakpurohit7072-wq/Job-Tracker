import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">

      <div className="container-fluid px-3">

        {/* Logo */}
        <Link
          className="navbar-brand fw-semibold"
          to="/dashboard"
        >
          Job Tracker
        </Link>

        {/* Navigation */}
        <div className="d-flex align-items-center flex-wrap">

          <Link
            className="nav-link text-white px-2 px-md-3"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link text-white px-2 px-md-3"
            to="/jobs"
          >
            Jobs
          </Link>

          <Link
            className="nav-link text-white px-2 px-md-3"
            to="/profile"
          >
            Profile
          </Link>

          <span className="navbar-text text-white px-2 px-md-3">
            Hi, {user?.name}
          </span>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;