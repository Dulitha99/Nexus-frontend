import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import Vector from "../../images/Logo.png";
import "./Signup.css";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    email: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const { loading, signup } = useSignup();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setInputs({ ...inputs, password: newPassword });
    // Validate password
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setPasswordError("Password must contain at least one special character");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (inputs.password !== inputs.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    if (passwordError) {
      setFormError(passwordError);
      return;
    }
    try {
      await signup(inputs);
      navigate("/");
    } catch (error) {
      setFormError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#161A30] to-[#31304D] min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-[#F0ECE5] p-8 rounded-lg shadow-lg">
          <center>
            <img src={Vector} alt="Nexus Logo" className="mb-4 w-24" />
            <h2 className="text-3xl font-semibold mb-6 text-black">Signup</h2>
          </center>
          {formError && (
            <p className="text-red-500 text-sm mt-1">{formError}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-black"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={inputs.gender}
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={inputs.password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                required
              />
            </div>
            <center>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </center>
            <div className="text-center mt-6">
              <p className="text-sm text-black">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
