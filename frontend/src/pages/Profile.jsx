import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJobs } from "../api/jobApi";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "React Developer",
    experience: "Fresher",
    skills: "React, JavaScript, HTML, CSS, Bootstrap",
    resume: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));

    if (saved) {
      setProfile(saved);
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === "Applied").length;
  const interview = jobs.filter((j) => j.status === "Interview").length;
  const offer = jobs.filter((j) => j.status === "Offer").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setEditing(false);
    toast.success("Profile saved successfully!");
  };

  const handleCancel = () => {
    const saved = JSON.parse(localStorage.getItem("profile"));

    if (saved) {
      setProfile(saved);
    } else {
      setProfile({
        name: "",
        email: "",
        phone: "",
        location: "",
        role: "React Developer",
        experience: "Fresher",
        skills: "React, JavaScript, HTML, CSS, Bootstrap",
        resume: "",
      });
    }

    setEditing(false);
  };
    return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <div className="card-body p-3 p-md-4">

          {/* Profile Header */}

          <div className="text-center mb-4">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="rounded-circle border img-fluid"
              style={{ width: "120px", height: "120px" }}
            />

            <h2 className="mt-3 mb-0">
              My Profile
            </h2>
          </div>

          {/* Personal Information */}

          <h5 className="border-bottom pb-2 mb-3">
            Personal Information
          </h5>

          <div className="row g-3 mb-4">

            <div className="col-12 col-md-6">
              <label className="form-label">
                Name
              </label>

              <input
                className="form-control"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">
                Email
              </label>

              <input
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">
                Phone
              </label>

              <input
                className="form-control"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">
                Location
              </label>

              <input
                className="form-control"
                name="location"
                value={profile.location}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

          </div>

          {/* Professional Information */}

          <h5 className="border-bottom pb-2 mb-3">
            Professional Information
          </h5>

          <div className="row g-3 mb-4">

            <div className="col-12 col-lg-4">
              <label className="form-label">
                Current Role
              </label>

              <input
                className="form-control"
                name="role"
                value={profile.role}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="col-12 col-lg-4">
              <label className="form-label">
                Experience
              </label>

              <input
                className="form-control"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="col-12 col-lg-4">
              <label className="form-label">
                Skills
              </label>

              <input
                className="form-control"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

          </div>

          {/* Resume */}

          <h5 className="border-bottom pb-2 mb-3">
            Resume
          </h5>

          <div className="row g-3 mb-4">

            <div className="col-12 col-lg-9">

              <label className="form-label">
                Resume Link
              </label>

              <input
                type="url"
                className="form-control"
                name="resume"
                placeholder="https://drive.google.com/..."
                value={profile.resume}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

            <div className="col-12 col-lg-3 d-grid align-self-end">

              {profile.resume ? (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  View Resume
                </a>
              ) : (
                <button
                  className="btn btn-secondary"
                  disabled
                >
                  No Resume
                </button>
              )}

            </div>

          </div>
                    {/* Statistics */}

          <h5 className="border-bottom pb-2 mb-3">
            Statistics
          </h5>

          <div className="row g-3 mb-4">

            <div className="col-6 col-md-4 col-lg">
              <div className="card text-center shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="text-muted">Total</h6>
                  <h3>{total}</h3>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <div className="card text-center shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="text-muted">Applied</h6>
                  <h3 className="text-primary">{applied}</h3>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <div className="card text-center shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="text-muted">Interview</h6>
                  <h3 className="text-warning">{interview}</h3>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg">
              <div className="card text-center shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="text-muted">Offer</h6>
                  <h3 className="text-success">{offer}</h3>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg">
              <div className="card text-center shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="text-muted">Rejected</h6>
                  <h3 className="text-danger">{rejected}</h3>
                </div>
              </div>
            </div>

          </div>

          {/* Buttons */}

          <div className="d-grid d-md-flex justify-content-md-end gap-2">

            {editing ? (
              <>
                <button
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Save
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;