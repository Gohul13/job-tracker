import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplication, updateApplication, } from "../api/applicationApi";
import "../styles/applicationForm.css";

function EditApplication() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getApplication(id);

        const application = response.data;

        setFormData({
          companyName: application.companyName || "",
          jobTitle: application.jobTitle || "",
          location: application.location || "",
          jobType: application.jobType || "",
          status: application.status || "Applied",
          salary: application.salary || "",
          source: application.source || "",
          applicationDate: application.applicationDate
            ? application.applicationDate.split("T")[0]
            : "",
          notes: application.notes || "",
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

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
      setSaving(true);
      setError("");

      await updateApplication(id, formData);

      navigate(`/applications/${id}`);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update application"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading application...</p>
      </div>
    );
  }

  if (error && !formData.companyName) {
    return (
      <div className="page-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="form-header">
        <h1>Edit Application</h1>

        <p>
          Update the details of your job application.
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
              onClick={() =>
                navigate(`/applications/${id}`)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Application"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditApplication;