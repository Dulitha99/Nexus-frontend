import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./settings.css";

const fetchUserData = async () => {
  return {
    firstName: "John",
    lastName: "Doe",
    username: "currentUsername",
    dateOfBirth: "1990-01-01",
    gender: "male",
    country: "USA",
    email: "john.doe@example.com",
    mobileNo: "123-456-7890",
    profilePic: "https://via.placeholder.com/100",
  };
};


const updateUserProfile = async (userData) => {
 
  console.log("User data updated:", userData);
  return { success: true };
};


const deleteUserAccount = async (password) => {

  console.log("Account deleted with password:", password);
  return { success: true };
};

const SettingsPage = () => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };
    getUserData();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profilePic: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUserData = {
      ...user,
      username: newUsername || user.username,
      password: newPassword,
    };

    const response = await updateUserProfile(updatedUserData);
    if (response.success) {
      setUser(updatedUserData);
      alert("Profile updated successfully");
    } else {
      alert("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    const response = await deleteUserAccount(deletePassword);
    if (response.success) {
      alert("Account deleted successfully");
      
    } else {
      alert("Failed to delete account. Incorrect password");
    }
  };

  const toggleDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const handleConfirmDelete = () => {
    if (deletePassword) {
      handleDeleteAccount();
    } else {
      alert("Please enter your password to confirm account deletion");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #161A30, #31304D)",
        color: "#F0ECE5",
        minHeight: "100vh",
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-12">
          <img
            src={user.profilePic}
            alt="Profile"
            className="profile-picture"
          />
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginTop: "16px",
              color: "#F0ECE5",
            }}
          >
            Settings
          </h1>
        </div>

        <div className="settings-content">
          <h2>Current User Details</h2>
          <div className="mb-4">
            <label>First Name</label>
            <input type="text" value={user.firstName} readOnly />
          </div>
          <div className="mb-4">
            <label>Last Name</label>
            <input type="text" value={user.lastName} readOnly />
          </div>
          <div className="mb-4">
            <label>Username</label>
            <input type="text" value={user.username} readOnly />
          </div>
          <div className="mb-4">
            <label>Date of Birth</label>
            <input type="date" value={user.dateOfBirth} readOnly />
          </div>
          <div className="mb-4">
            <label>Email</label>
            <input type="email" value={user.email} readOnly />
          </div>
          <div className="mb-4">
            <label>Mobile No.</label>
            <input type="text" value={user.mobileNo} readOnly />
          </div>
        </div>

        <div className="settings-content">
          <h2>Edit Profile Information</h2>
          <div className="mb-4">
            <label>New Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Change Profile Picture</label>
            <div className="flex items-center">
              <input
                type="file"
                id="fileInput"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Choose File
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="settings-content">
          <div className="flex justify-center mt-6">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleDeletePopup}
            >
              Delete Account
            </button>
          </div>
        </div>

        {showDeletePopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={toggleDeletePopup}>
                <FaTimes />
              </button>
              <h2>Confirm Account Deletion</h2>
              <p>Please enter your password to confirm account deletion:</p>
              <div className="mb-4">
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleConfirmDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
