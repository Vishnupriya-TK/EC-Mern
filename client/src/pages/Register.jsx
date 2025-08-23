import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import '../styles/register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phone && !/^\+?[0-9\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validate()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.address && { address: formData.address }),
      };
      
      const result = await register(userData);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setSubmitError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = (provider) => {
    alert(`${provider} registration will be implemented soon!`);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Join us today and start your journey</p>
          </div>

          {submitError && (
            <div className="error-message">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {submitError}
            </div>
          )}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="form-control"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-control"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <div className="input-wrapper">
                <FiPhone className="input-icon" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address (Optional)</label>
              <div className="input-wrapper">
                <FiMapPin className="input-icon" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="123 Main St, City, Country"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  name="terms" 
                  required 
                  className="form-checkbox"
                />
                <span>I agree to the <a href="/terms" className="text-primary hover:underline">Terms</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a></span>
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="divider">or continue with</div>

          <div className="social-buttons">
            <button 
              type="button" 
              className="social-btn"
              onClick={() => handleSocialRegister('Google')}
            >
              <FcGoogle className="w-5 h-5" />
            </button>
            <button 
              type="button" 
              className="social-btn"
              onClick={() => handleSocialRegister('GitHub')}
            >
              <FaGithub className="w-5 h-5" />
            </button>
          </div>

          <div className="register-link">
            Already have an account?{' '}
            <Link 
              to="/login" 
              state={{ from: location.state?.from }}
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
