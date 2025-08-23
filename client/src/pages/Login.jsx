import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await login(email, password, remember);
      if (result.success) {
        // Redirect to the intended page or based on role
        const userRole = JSON.parse(localStorage.getItem('user'))?.role;
        if (userRole === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // For now, just show an alert
    alert(`${provider} login will be implemented soon!`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Please enter your details to sign in</p>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {error}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder=" enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>
          
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-btn google"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <FcGoogle />
              <span>Google</span>
            </button>
            <button 
              type="button" 
              className="social-btn github"
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isLoading}
            >
              <FaGithub />
              <span>GitHub</span>
            </button>
          </div>
          
          <div className="login-footer">
            Don't have an account?{' '}
            <Link to="/register" state={{ from: location.state?.from }}>
              Create an account
            </Link>
          </div>
          
          <div className="back-home">
            <Link to="/">
              <FiArrowLeft />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}