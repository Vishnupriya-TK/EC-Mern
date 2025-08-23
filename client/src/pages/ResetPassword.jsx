import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiLock, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidToken, setIsValidToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { token } = useParams();
  const { validateResetToken, resetPasswordWithToken } = useAuth();
  const navigate = useNavigate();

  // Validate the reset token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        await validateResetToken(token);
        setIsValidToken(true);
      } catch (err) {
        setError('Invalid or expired reset link. Please request a new one.');
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [token, validateResetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setError('');
      setIsSubmitting(true);
      
      // Call the reset password function
      await resetPasswordWithToken(token, password);
      
      // Show success message
      setMessage('Your password has been reset successfully!');
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="animate-pulse">
            <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <FiLock className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Verifying your link...</h3>
            <p className="mt-2 text-sm text-gray-500">Please wait while we verify your password reset link.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <FiAlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Invalid Link</h2>
          <p className="mt-2 text-sm text-gray-600">
            {error || 'The password reset link is invalid or has expired. Please request a new one.'}
          </p>
          <div className="mt-6">
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Request a new reset link
            </Link>
          </div>
          <div className="mt-4">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-gray-600"
            >
              <div className="flex items-center justify-center">
                <FiArrowLeft className="mr-1" />
                Back to Home
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Password Reset</h2>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <FiLock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Set a new password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : 'Reset Password'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 text-sm"
          >
            <div className="flex items-center justify-center">
              <FiArrowLeft className="mr-1" />
              Back to login
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
