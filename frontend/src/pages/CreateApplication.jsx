import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../api/applicationApi";
import "../styles/applicationForm.css";

function CreateApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    jobType: "",
    status: "Applied",
    salary: "",
    source: "",
    applicationDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createApplication(formData);

      navigate("/applications");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="form-header">
        <h1>Add Application</h1>

        <p>
          Add a new job application to your tracker.
        </p>
      </div>

      <div className="form-card">

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Company Name</label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Job Title</label>

              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>Job Type</label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>


            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>


            <div className="form-group">
              <label>Salary</label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 8 LPA"
              />
            </div>


            <div className="form-group">
              <label>Source</label>

              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g. LinkedIn"
              />
            </div>


            <div className="form-group">
              <label>Application Date</label>

              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
              />
            </div>

          </div>


          <div className="form-group notes-group">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              placeholder="Add any notes about this application..."
            />
          </div>


          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/applications")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Application"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateApplication;