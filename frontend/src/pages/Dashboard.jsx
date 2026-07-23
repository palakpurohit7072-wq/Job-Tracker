import { useEffect, useState } from "react";
import { getJobs } from "../api/jobApi";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
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

  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerJobs = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

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

  return (
    <div className="container-fluid">

      <h2 className="mb-4 text-center text-md-start">
        Dashboard
      </h2>

      {/* Stats Cards */}

      <div className="row g-3 mb-4">

        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-muted mb-2">
                Total Applications
              </h6>

              <h3 className="fw-bold">
                {totalJobs}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-muted mb-2">
                Applied
              </h6>

              <h3 className="fw-bold text-primary">
                {appliedJobs}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-muted mb-2">
                Interview
              </h6>

              <h3 className="fw-bold text-warning">
                {interviewJobs}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-muted mb-2">
                Offers
              </h6>

              <h3 className="fw-bold text-success">
                {offerJobs}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Applications */}

      <div className="card shadow-sm border-0">

        <div className="card-header bg-white">
          <h5 className="mb-0 text-center text-md-start">
            Recent Applications
          </h5>
        </div>

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {jobs.length > 0 ? (

                  jobs
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((job) => (

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

                      </tr>

                    ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-4"
                    >
                      No applications found.
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

export default Dashboard;