import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      const response = await registerUser(formData);

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="auth-register-page">

      <div className="auth-register-card">

        <div className="auth-register-logo">
          JobTrack
        </div>

        <div className="auth-register-heading">
          <h1>Create your account</h1>

          <p>
            Start tracking your job applications in one place.
          </p>
        </div>

        <form
          className="auth-register-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-register-field">
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>


          <div className="auth-register-field">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>


          <div className="auth-register-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>


          <button
            type="submit"
            className="auth-register-button"
          >
            Create Account
          </button>

        </form>


        <div className="auth-register-footer">
          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

      </div>

    </div>
  );
}

export default Register;