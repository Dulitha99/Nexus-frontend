import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useForgotPassword from "../../hooks/useForgotPassword"; // Import the custom hook
import Vector from "../../images/Logo.png";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { loading: loginLoading, login } = useLogin();
  const navigate = useNavigate();

  const {
    step,
    setStep, // Include setStep here
    email,
    setEmail,
    verificationKey,
    setVerificationKey,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    sendVerificationKey,
    verifyKey,
    resetPassword,
  } = useForgotPassword(); // Use the custom hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setInvalidCredentials(true);
      console.error("Login error", error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await sendVerificationKey(email);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    verifyKey(verificationKey);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    await resetPassword(email, verificationKey, newPassword, confirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#161A30]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <center>
          <img src={Vector} alt="Nexus Logo" className="w-24 h-24 mb-6" />
          <h2 className="text-2xl font-bold mb-6 text-black">Sign In</h2>
        </center>
        {invalidCredentials && (
          <p className="text-red-500 text-sm mb-4">Invalid credentials</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loginLoading}
          >
            {loginLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </p>
          <p className="mt-2 text-sm">
            {"Don't have an account? "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {step > 0 && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-2 right-2 text-red-600"
              onClick={() => setStep(0)}
            >
              &times;
            </button>
            {step === 1 && (
              <form onSubmit={handleForgotPassword}>
                <h2 className="text-xl font-bold mb-4 text-black">
                  Forgot Password
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Next"
                  )}
                </button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerification}>
                <h2 className="text-xl font-bold mb-4 text-black">
                  Verify Key
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="verificationKey"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter the 8-digit key sent to your email
                  </label>
                  <input
                    type="text"
                    id="verificationKey"
                    placeholder="Enter verification key"
                    value={verificationKey}
                    onChange={(e) => setVerificationKey(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Verify
                </button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              </form>
            )}
            {step === 3 && (
              <form onSubmit={handlePasswordReset}>
                <h2 className="text-xl font-bold mb-4 text-black">
                  Reset Password
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Create Password"
                  )}
                </button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              </form>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-black">
                  Password Reset Successful
                </h2>
                <button
                  onClick={() => setStep(0)}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
