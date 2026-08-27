import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApplicationStats,
  getApplications,
} from "../api/applicationApi";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, applicationsResponse] =
          await Promise.all([
            getApplicationStats(),
            getApplications({
              page: 1,
              limit: 5,
              sort: "latest",
            }),
          ]);

        setStats(statsResponse.data);

        setApplications(
          applicationsResponse.data.applications || []
        );
      } catch (error) {
        console.error(error);

        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Page Header */}

      <div className="page-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Here's an overview of your job applications.
          </p>
        </div>
      </div>


      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-label">
            Total Applications
          </span>

          <span className="stat-value">
            {stats.total}
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Applied
          </span>

          <span className="stat-value">
            {stats.applied}
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Interviews
          </span>

          <span className="stat-value">
            {stats.interview}
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Selected
          </span>

          <span className="stat-value">
            {stats.selected}
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Rejected
          </span>

          <span className="stat-value">
            {stats.rejected}
          </span>
        </div>

      </div>


      {/* Recent Applications Header */}

      <div className="section-header">

        <div>
          <h2>Recent Applications</h2>

          <p>
            Your latest job applications.
          </p>
        </div>

        <button
          className="view-all-button"
          onClick={() => navigate("/applications")}
        >
          View All
        </button>

      </div>


      {/* Recent Applications */}

      <div className="applications-card">

        {applications.length === 0 ? (

          <div className="empty-state">
            <h3>No applications yet</h3>

            <p>
              Start tracking your job applications.
            </p>
          </div>

        ) : (

          <div className="applications-list">

            {applications.map((application) => (

              <div
                className="application-row clickable-row"
                key={application._id}
                onClick={() =>
                  navigate(
                    `/applications/${application._id}`
                  )
                }
              >

                <div className="application-info">

                  <h3>
                    {application.companyName}
                  </h3>

                  <p>
                    {application.jobTitle}
                  </p>

                </div>


                <span
                  className={`status-badge status-${application.status.toLowerCase()}`}
                >
                  {application.status}
                </span>


                <span className="application-location">
                  {application.location || "No location"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;