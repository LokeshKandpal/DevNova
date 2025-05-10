import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
// import './trainerregistration.css';

function Trainerregistration() {
  const [trainername, setTrainername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [shortName, setShortName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleTrainer = () => {
      if (location.pathname.includes("updatetrainerpage")) {
        axios
          .get(`https://api.uncodecart.com/trainers/singletrainerslist/${id}`)
          .then((response) => {
            const trainer = response.data.message?.[0] || {};
            setTrainername(trainer.trainer_name || "");
            setSelectedTech(trainer.trainer_dept || "");
            setMobilenumber(trainer.trainer_mobileno || "");
            setEmail(trainer.trainer_email || "");
            setPassword(trainer.trainer_password || "");
            setGender(trainer.trainer_gender || "");
            setShortName(trainer.trainer_short_name || "");
          })
          .catch((err) => {
            console.error("Error Fetching Trainer:", err);
          });
      }
    };

    fetchSingleTrainer();
  }, [id, location.pathname]);

  const resetForm = () => {
    setTrainername("");
    setMobilenumber("");
    setEmail("");
    setPassword("");
    setGender("");
    setSelectedTech("");
    setShortName("");
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const registrationData = {
      trainer_name: trainername,
      trainer_dept: selectedTech,
      trainer_email: email,
      trainer_mobileno: mobilenumber,
      trainer_password: password,
      trainer_short_name: shortName,
      trainer_gender: gender,
    };

    console.log("Submit:", registrationData);

    if (location.pathname.includes("updatetrainerpage")) {
      // Update the existing trainer using PUT request
      axios
        .put(`https://api.uncodecart.com/trainers/trainerupdate/${id}`, registrationData)
        .then((response) => {
          console.log("Update Response:", response.data);
          setSuccessMessage("Trainer updated successfully!");
          resetForm();
          // Navigate back to the trainer list after update
          setTimeout(() => {
            window.location.href = '/trainerlist'; // Adjust the route as needed
          }, 1000); // Delay to allow the user to see the success message
        })
        .catch((err) => {
          console.error("Update error:", err.response || err.message);
          setErrorMessage("Update failed. Please try again.");
        });
    } else {
      // Create a new trainer using POST request
      axios
        .post("https://api.uncodecart.com/trainers/trainerregistration", registrationData)
        .then((response) => {
          console.log("Register Response:", response.data);
          setSuccessMessage("Trainer registered successfully!");
          resetForm();
        })
        .catch((err) => {
          console.error("Registration error:", err.response || err.message);
          setErrorMessage("Registration failed. Please try again.");
        });
    }
  };

  return (
    <div className="main-container">
      <div className="registration-container">
        <h2>Trainer Registration</h2>

        {successMessage && (
          <p
            style={{
              fontSize: "1.5rem", // Bigger font
              textAlign: "center", // Centered
              color: "blue", // Green color (optional)
              margin: "20px 0", // Spacing
            }}
          >
            {successMessage}
          </p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmission}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={trainername}
              onChange={(e) => setTrainername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shortname">Trainer Short Name</label>
            <input
              type="text"
              id="shortname"
              name="shortname"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={mobilenumber}
              onChange={(e) => setMobilenumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tech">Trainer's Tech</label>
            <select
              id="tech"
              name="tech"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a Tech
              </option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Automation Testing">Automation Testing</option>
              <option value="Cloud Computing">Cloud Computing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Trainerregistration;