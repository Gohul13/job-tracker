import { useState } from "react";
import { loginUser } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await loginUser(formData);

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="auth-login-page">

      <div className="auth-login-card">

        <div className="auth-login-logo">
          JobTrack
        </div>

        <div className="auth-login-heading">
          <h1>Welcome back</h1>

          <p>
            Login to manage your job applications.
          </p>
        </div>

        <form
          className="auth-login-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-login-field">
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


          <div className="auth-login-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>


          <button
            type="submit"
            className="auth-login-button"
          >
            Login
          </button>

        </form>


        <div className="auth-login-footer">
          Don't have an account?

          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Create account
          </button>
        </div>

      </div>

    </div>
  );
}

export default Login;