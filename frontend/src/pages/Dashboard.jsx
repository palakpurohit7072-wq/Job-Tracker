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
    <div className="container-fluid py-3 py-md-4">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Dashboard
        </h2>

        <p className="text-secondary mb-0">
          Track your job applications and progress
        </p>
      </div>


      {/* Stats */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-secondary">
                Total Applications
              </h6>

              <h3 className="fw-bold mb-0">
                {totalJobs}
              </h3>
            </div>
          </div>
        </div>


        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-secondary">
                Applied
              </h6>

              <h3 className="fw-bold text-primary mb-0">
                {appliedJobs}
              </h3>
            </div>
          </div>
        </div>


        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-secondary">
                Interviews
              </h6>

              <h3 className="fw-bold text-warning mb-0">
                {interviewJobs}
              </h3>
            </div>
          </div>
        </div>


        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center py-4">
              <h6 className="text-secondary">
                Offers
              </h6>

              <h3 className="fw-bold text-success mb-0">
                {offerJobs}
              </h3>
            </div>
          </div>
        </div>

      </div>


      {/* Recent Applications */}
      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-semibold">
            Recent Applications
          </h5>
        </div>

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

                      <td>
                        {job.company}
                      </td>

                      <td>
                        {job.role}
                      </td>

                      <td>
                        <span
                          className={`badge ${getBadgeClass(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td>
                        {job.date}
                      </td>

                    </tr>

                  ))

              ) : (

                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-secondary py-4"
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
  );
}

export default Dashboard;