import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApplication,
  deleteApplication,
} from "../api/applicationApi";
import "../styles/applicationDetails.css";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getApplication(id);

        setApplication(response.data);
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

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      await deleteApplication(id);

      navigate("/applications");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to delete application"
      );

      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading application...</p>
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="page-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Back */}

      <button
        className="back-button"
        onClick={() => navigate("/applications")}
      >
        ← Back to Applications
      </button>


      {/* Header */}

      <div className="details-header">

        <div>
          <h1>{application.companyName}</h1>

          <p>{application.jobTitle}</p>
        </div>

        <span
          className={`status-badge status-${application.status.toLowerCase()}`}
        >
          {application.status}
        </span>

      </div>


      {/* Error */}

      {error && (
        <div className="details-error">
          {error}
        </div>
      )}


      {/* Details Card */}

      <div className="details-card">

        <div className="details-grid">

          <div className="detail-item">
            <span className="detail-label">
              Company
            </span>

            <span className="detail-value">
              {application.companyName}
            </span>
          </div>


          <div className="detail-item">
            <span className="detail-label">
              Job Title
            </span>

            <span className="detail-value">
              {application.jobTitle}
            </span>
          </div>


          <div className="detail-item">
            <span className="detail-label">
              Location
            </span>

            <span className="detail-value">
              {application.location || "No location"}
            </span>
          </div>


          <div className="detail-item">
            <span className="detail-label">
              Job Type
            </span>

            <span className="detail-value">
              {application.jobType || "Not specified"}
            </span>
          </div>


          <div className="detail-item">
            <span className="detail-label">
              Salary
            </span>

            <span className="detail-value">
              {application.salary || "Not specified"}
            </span>
          </div>


          <div className="detail-item">
            <span className="detail-label">
              Source
            </span>

            <span className="detail-value">
              {application.source || "Not specified"}
            </span>
          </div>


          <div className="detail-item">
            <span className="detail-label">
              Application Date
            </span>

            <span className="detail-value">
              {application.applicationDate
                ? new Date(
                    application.applicationDate
                  ).toLocaleDateString()
                : "Not specified"}
            </span>
          </div>

        </div>


        {/* Notes */}

        <div className="notes-section">

          <span className="detail-label">
            Notes
          </span>

          <p>
            {application.notes || "No notes added."}
          </p>

        </div>


        {/* Actions */}

        <div className="details-actions">

          <button
            className="edit-button"
            onClick={() =>
              navigate(`/applications/${application._id}/edit`)
            }
          >
            Edit Application
          </button>

          <button
            className="delete-button"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Application
          </button>

        </div>

      </div>


      {/* Delete Modal */}

      {showDeleteModal && (
        <div className="modal-overlay">

          <div className="delete-modal">

            <h2>Delete Application?</h2>

            <p>
              Are you sure you want to delete this
              application? This action cannot be undone.
            </p>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ApplicationDetails;