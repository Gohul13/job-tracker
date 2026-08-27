import { useEffect, useState } from "react";
import { getApplications } from "../api/applicationApi";
import { useNavigate } from "react-router-dom";
import "../styles/applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [jobType, setJobType] = useState("");
  const [sort, setSort] = useState("latest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getApplications({
          page,
          limit,
          search,
          status,
          jobType,
          sort,
        });

        setApplications(response.data.applications);
        setTotal(response.data.total);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [page, limit, search, status, jobType, sort]);

  const totalPages = Math.ceil(total / limit);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  if (error) {
    return (
      <div className="page-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Header */}

      <div className="applications-header">
        <div>
          <h1>Applications</h1>

          <p>
            Track and manage your job applications
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => navigate("/applications/new")}
        >
          + Add Application
        </button>
      </div>


      {/* Filters */}

      <div className="filters-card">

        <input
          type="text"
          placeholder="Search company or job title..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />

        <select
          value={status}
          onChange={handleStatusChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={jobType}
          onChange={handleJobTypeChange}
          className="filter-select"
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          value={sort}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

      </div>


      {/* Applications */}

      <div className="applications-card">

        {loading ? (
          <div className="loading-state">
            Loading applications...
          </div>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <table className="applications-table">

            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Status</th>
                <th>Application Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((application) => (
                <tr key={application._id}>

                  <td>
                    <span className="company-name">
                      {application.companyName}
                    </span>
                  </td>

                  <td>
                    <span className="job-title">
                      {application.jobTitle}
                    </span>
                  </td>

                  <td>
                    {application.location || "No location"}
                  </td>

                  <td>
                    <span
                      className={`status-badge status-${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      application.applicationDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(
                          `/applications/${application._id}`
                        )
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

        {/* Pagination */}

        {!loading && totalPages > 0 && (
          <div className="pagination">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Applications;