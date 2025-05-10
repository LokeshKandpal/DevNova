import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./registration.css";

const Registration = () => {
  const [studentname, setStudentname] = useState("");
  const [batchId, setBatchId] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [batchlist, setBatchlist] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const getBatchlist = () => {
      axios
        .get("https://api.uncodecart.com/students/studentbatchlist")
        .then((response) => {
          console.log("Batch List API Response:", response.data); // Debug: Check API response
          const batches = response.data.message || [];
          setBatchlist(batches);
          console.log("Set batchlist:", batches); // Debug: Confirm batchlist
        })
        .catch((err) => {
          console.error("Error fetching batch list:", err.response || err.message);
          setBatchlist([]);
          setErrorMessage("Failed to load batches. Please try again.");
          setTimeout(() => setErrorMessage(""), 5000);
        });
    };

    const fetchSingleStudent = () => {
      if (location.pathname.includes("updatestudentpage")) {
        axios
          .get(`https://api.uncodecart.com/students/singlestudent/${id}`)
          .then((response) => {
            console.log("Single Student API Response:", response.data);
            const student = response.data.message?.[0] || {};
            setStudentname(student.student_name || "");
            setBatchId(student.batch_id?.toString() || ""); // Convert to string for select
            setMobilenumber(student.student_mobile || "");
            setEmail(student.student_email || "");
            setPassword(student.student_password || "");
            setGender(student.student_gender || "");
          })
          .catch((err) => {
            console.error("Error fetching student:", err.response || err.message);
            setErrorMessage("Failed to load student data.");
            setTimeout(() => setErrorMessage(""), 5000);
          });
      }
    };

    getBatchlist();
    fetchSingleStudent();
  }, [id, location.pathname]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);

    // Find selected batch to get batch_complete_name
    const selectedBatch = batchlist.find((batch) => 
      batch.batch_complete_name === batchId || batch.id?.toString() === batchId
    );
    const batchName = selectedBatch ? selectedBatch.batch_complete_name : "";

    console.log("batchId at submission:", batchId); // Debug: Check batchId
    console.log("Selected batch name:", batchName); // Debug: Check batch name

    // Validate that a batch name is selected
    if (!batchName) {
      setErrorMessage("Please select a valid batch.");
      setIsLoading(false);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const registrationData = {
      student_name: studentname,
      student_batch: batchName, // Send batch_complete_name like friend's code
      batch_id: batchId || "", // Send batch_id as string or "", avoiding NaN/null
      student_mobile: mobilenumber,
      student_email: email,
      student_gender: gender,
      student_password: password,
    };

    console.log("Data being sent to Registration API:", registrationData);

    axios
      .post("https://api.uncodecart.com/students/studentregistration", registrationData)
      .then((response) => {
        console.log("Registration API Full Response:", response);
        setStudentname("");
        setBatchId("");
        setMobilenumber("");
        setEmail("");
        setPassword("");
        setGender("");
        setSuccessMessage("Registration successful!");
        setIsLoading(false);
        // Removed navigation: setTimeout(() => { setSuccessMessage(""); navigate("/studentlist", { state: { refresh: true } }); }, 2000);
      })
      .catch((err) => {
        console.error("Registration API Full Error:", err.response || err.message);
        setErrorMessage(
          err.response?.data?.error ||
            `Registration failed: ${err.response?.status || "Unknown error"}`
        );
        setIsLoading(false);
        setTimeout(() => setErrorMessage(""), 5000);
      });
  };

  return (
    <div className="main-container">
      <div className="registration-container">
        <h2>Student Registration</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isLoading && <p>Loading...</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={studentname}
              onChange={(e) => setStudentname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="batch">Batch Allotment</label>
            <select
              id="batch"
              value={batchId}
              onChange={(e) => {
                console.log("Selected batch value:", e.target.value); // Debug: Check selection
                setBatchId(e.target.value); // Set batchId directly to the selected value
              }}
              required
            >
              <option value="">Select Batch</option>
              {batchlist.map((batch, index) => (
                <option key={index} value={batch.batch_complete_name || batch.id?.toString() || ""}>
                  {batch.batch_complete_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
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

          <input type="submit" value="Register" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default Registration;