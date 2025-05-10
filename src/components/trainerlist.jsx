import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./registration.css"; // Assuming this is correct

const TrainerList = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getTrainerList();
  }, []);

  const getTrainerList = () => {
    axios
      .get("https://api.uncodecart.com/trainers/trainerslist")
      .then((response) => {
        console.log("Trainer List Response:", response.data);
        setTrainers(response.data.message || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the trainer list!", error);
        setErrorMessage("Failed to load trainers.");
      });
  };

  const handleDelete = (trainerId) => {
    console.log("Attempting to delete trainer with ID:", trainerId);
    axios
      .delete(`https://api.uncodecart.com/trainers/trainerdelete/${trainerId}`)
      .then((response) => {
        console.log("Delete Response:", response.data);
        setErrorMessage("");
        getTrainerList(); // Refresh list
      })
      .catch((error) => {
        console.error("Delete Error:", error.response || error.message);
        setErrorMessage("Failed to delete trainer: " + (error.response?.data?.error || error.message));
      });
  };

  const handleUpdate = (trainerId) => {
    navigate(`/updatetrainerpage/${trainerId}`);
  };

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="trainerTable">
        <thead>
          <tr>
            <th>Trainer ID</th>
            <th>Name</th>
            <th>Short Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length === 0 ? (
            <tr>
              <td colSpan="8">No trainers found.</td>
            </tr>
          ) : (
            trainers.map((trainer) => (
              <tr key={trainer.trainer_id}>
                <td>{trainer.trainer_id || "N/A"}</td>
                <td>{trainer.trainer_name || "N/A"}</td>
                <td>{trainer.trainer_short_name || "N/A"}</td>
                <td>{trainer.trainer_dept || "N/A"}</td>
                <td>{trainer.trainer_email || "N/A"}</td>
                <td>{trainer.trainer_mobileno || "N/A"}</td>
                <td>{trainer.trainer_gender || "N/A"}</td>
                <td>
                  <div className="table-div">
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => handleDelete(trainer.trainer_id)}
                    />
                    <input
                      type="button"
                      value="Update"
                      onClick={() => handleUpdate(trainer.trainer_id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default TrainerList;