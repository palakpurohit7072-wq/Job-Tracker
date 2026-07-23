import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getJobs, addJob, updateJob, deleteJob } from "../api/jobApi";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load jobs");
    }
  };

  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter((j) => j.status === "Applied").length;
  const interviewJobs = jobs.filter((j) => j.status === "Interview").length;
  const offerJobs = jobs.filter((j) => j.status === "Offer").length;
  const rejectedJobs = jobs.filter((j) => j.status === "Rejected").length;

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(id);
      await fetchJobs();
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    }
  };

  const resetForm = () => {
    setCompany("");
    setRole("");
    setStatus("Applied");
    setDate("");
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (job) => {
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setDate(job.date);
    setEditId(job._id);
    setShowForm(true);
  };

  const handleSaveJob = async () => {
    if (!company || !role || !date) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateJob(editId, {
          company,
          role,
          status,
          date,
        });

        toast.success("Job updated successfully");
        setEditId(null);
      } else {
        await addJob({
          company,
          role,
          status,
          date,
        });

        toast.success("Job added successfully");
      }

      await fetchJobs();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-primary";
      case "Interview":
        return "bg-warning text-dark";
      case "Offer":
        return "bg-success";
      case "Rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (    <div className="container py-4">
<div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
  <h2 className="mb-0 text-center text-md-start">
    Job Applications
  </h2>

  <div className="d-grid d-md-block">
    <button
      className="btn btn-primary"
      onClick={() => {
        if (showForm) {
          resetForm();
        }
        setShowForm(!showForm);
      }}
    >
      {showForm ? "Close Form" : "+ Add Job"}
    </button>
  </div>
</div>
      {/* Header */}
      {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h2 className="mb-0 text-center text-md-start">
          Job Applications
        </h2>

        <button
          className="btn btn-primary w-100 w-md-auto"
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "+ Add Job"}
        </button>
      </div> */}

      {/* Add/Edit Form */}

      {showForm && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">
              {editId ? "Edit Job" : "Add New Job"}
            </h4>

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <input
                  className="form-control"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  className="form-control"
                  placeholder="Job Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-6">
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="col-12">
                <button
                  className="btn btn-success w-100"
                  onClick={handleSaveJob}
                >
                  {editId ? "Update Job" : "Save Job"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Dashboard Cards */}

      <div className="row g-3 mb-4">

        {[
          ["Total", totalJobs, ""],
          ["Applied", appliedJobs, "text-primary"],
          ["Interview", interviewJobs, "text-warning"],
          ["Offer", offerJobs, "text-success"],
          ["Rejected", rejectedJobs, "text-danger"],
        ].map(([label, value, cls]) => (

          <div
            className="col-6 col-md-4 col-lg"
            key={label}
          >
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">

                <h6 className="text-muted mb-2">
                  {label}
                </h6>

                <h3 className={cls}>
                  {value}
                </h3>

              </div>
            </div>
          </div>

        ))}

      </div>
            {/* Jobs Table */}

      <div className="card shadow-sm">
        <div className="card-body">

          {/* Search + Filter */}

          <div className="row g-3 mb-4">

            <div className="col-12 col-md-8">
              <input
                className="form-control"
                placeholder="Search by company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredJobs.length > 0 ? (

                  filteredJobs.map((job) => (

                    <tr key={job._id}>

                      <td>{job.company}</td>

                      <td>{job.role}</td>

                      <td>
                        <span
                          className={`badge ${getBadgeClass(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td>{job.date}</td>

                      <td>

                        <div className="d-grid d-md-flex gap-2 justify-content-center">

                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleEdit(job)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(job._id)}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-4"
                    >
                      No jobs found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Jobs;