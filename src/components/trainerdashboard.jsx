import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./trainerdashboard.css";

const Trainerdashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Profile");
  const [trainerData, setTrainerData] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");

  const checkAuth = useCallback(() => {
    const storedData = localStorage.getItem("userData");
    console.log("Stored Data from localStorage:", storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Parsed trainerData:", parsedData);
      if (parsedData.role !== "trainer") {
        console.log("Role is not trainer, redirecting to login");
        navigate("/login");
        return;
      }
      setTrainerData(parsedData);
      if (parsedData.trainer_short_name) {
        axios
          .get(`https://api.uncodecart.com/students/studentbatchlistbytrainer/${parsedData.trainer_short_name}`)
          .then((response) => {
            console.log("Batch Data Response:", response.data);
            console.log("Batch Data (message):", response.data.message);
            const batches = Array.isArray(response.data.message) ? response.data.message : [];
            setBatchData(batches);
          })
          .catch((err) => {
            console.error("Error fetching batch data:", err.response || err.message);
            setError("Failed to fetch batch list");
            setBatchData([]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } else {
      console.log("No user data, redirecting to login");
      navigate("/login");
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setTrainerData(null);
    setBatchData([]);
    setActiveSection("Profile");
    navigate("/login");
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setSelectedBatch("");
  };

  const handleBatchSelect = (event) => {
    setSelectedBatch(event.target.value);
  };

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;

    if (!trainerData) {
      return <p>Please log in as a trainer.</p>;
    }

    switch (activeSection) {
      case "Profile":
        return (
          <div className="profile-content">
            <div className="profile-header">
              <h2>Profile</h2>
              <button 
                className="profile-logout-button" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <table className="profile-table">
              <thead>
                <tr>
                  <th>Detail</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{trainerData.trainer_name || "N/A"}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{trainerData.trainer_email || "N/A"}</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>{trainerData.trainer_dept || "N/A"}</td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>{trainerData.trainer_id || "N/A"}</td>
                </tr>
                <tr>
                  <td>Short Name</td>
                  <td>{trainerData.trainer_short_name || "N/A"}</td>
                </tr>
                <tr>
                  <td>Batches Managed</td>
                  <td>{batchData.length || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "Batches":
        return (
          <div className="batches-content">
            <h2>Batches</h2>
            {error && <p className="error-message">{error}</p>}
            {selectedBatch ? (
              <p>Selected Batch: {selectedBatch}</p>
            ) : (
              <p>Please select a batch from the sidebar dropdown.</p>
            )}
          </div>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="trainer-dashboard dashboard-container">
      {trainerData && (
        <div className="sidebar">
          <h3>Trainer Dashboard</h3>
          <ul className="sidebar-menu">
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === "Profile" ? "active" : ""}`}
                onClick={() => handleMenuClick("Profile")}
              >
                Profile
              </button>
            </li>
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === "Batches" ? "active" : ""}`}
                onClick={() => handleMenuClick("Batches")}
              >
                Batches
              </button>
              {/* Dropdown for batches, visible only when Batches section is active */}
              {activeSection === "Batches" && (
                <div className="batch-dropdown">
                  {batchData.length > 0 ? (
                    <select
                      className="batch-select"
                      value={selectedBatch}
                      onChange={handleBatchSelect}
                    >
                      <option value="" disabled>
                        Select a batch
                      </option>
                      {batchData.map((batch, index) => (
                        <option
                          key={batch.id || index}
                          value={batch.batch_complete_name || batch.batch_name || "N/A"}
                        >
                          {batch.batch_complete_name || batch.batch_name || "N/A"}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>No batches available.</p>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default Trainerdashboard;