import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Studentlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [batchlist, setBatchlist] = useState([]);
  const [lastUpdateCheck, setLastUpdateCheck] = useState(null); // Track last update check

  useEffect(() => {
    const getBatchlist = () => {
      axios
        .get("https://api.uncodecart.com/students/studentbatchlist")
        .then((response) => {
          console.log("Batch List API Response:", response.data);
          setBatchlist(response.data.message || []);
        })
        .catch((error) => {
          console.error("Error fetching batch list:", error.response || error.message);
          setBatchlist([]);
        });
    };

    getBatchlist();
    getStudentList();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      console.log("Refreshing due to location.state.refresh");
      getStudentList(); // Refresh on new registration
    }

    // Enhanced refresh logic for update return
    const checkForUpdateReturn = () => {
      console.log("Checking for update return, referrer:", document.referrer);
      if (document.referrer && document.referrer.includes("/updatestudentpage")) {
        console.log("Detected return from update page, refreshing student list");
        getStudentList();
        setLastUpdateCheck(new Date().toISOString()); // Mark the check time
      }
    };

    checkForUpdateReturn(); // Run on mount or path change
    const interval = setInterval(checkForUpdateReturn, 1000); // Check every second
    return () => clearInterval(interval); // Cleanup interval
  }, [location.state, location.pathname]);

  const getStudentList = () => {
    axios
      .get("https://api.uncodecart.com/students/studentlist")
      .then((response) => {
        console.log("Student List API Full Response:", response.data);
        const studentsData = response.data.message || [];
        console.log("Students data received:", studentsData); // Log individual students
        // Deduplicate by keeping the latest record per student_id
        const uniqueStudents = [];
        const seenIds = new Set();
        studentsData.reverse().forEach((student) => {
          if (!seenIds.has(student.student_id)) {
            seenIds.add(student.student_id);
            uniqueStudents.push(student);
          }
        });
        setStudents(uniqueStudents.reverse()); // Reverse back to original order
      })
      .catch((error) => {
        console.error("Error fetching student list:", error.response || error.message);
        setStudents([]);
      });
  };

  const getBatchName = (batchId) => {
    const batch = batchlist.find((b) => b.id === batchId);
    return batch ? batch.batch_complete_name : "N/A";
  };

  const handleDelete = (student_id) => {
    axios
      .delete(`https://api.uncodecart.com/students/studentdelete/${student_id}`)
      .then((response) => {
        console.log("Delete API Response:", response.data);
        getStudentList(); // Refresh list after delete
      })
      .catch((error) => {
        console.error("Error deleting student:", error.response || error.message);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/updatestudentpage/${id}`); // Navigate to update page
  };

  return (
    <>
      <table className="studentTable">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.student_name}</td>
              <td>{student.student_gender}</td>
              <td>{student.student_email}</td>
              <td>{student.student_mobile}</td>
              <td>{getBatchName(student.batch_id)}</td>
              <td>
                <div className="table-div">
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => handleDelete(student.student_id)}
                  />
                  <input
                    type="button"
                    value="Update"
                    onClick={() => handleUpdate(student.student_id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {lastUpdateCheck && <p>Last checked for update: {lastUpdateCheck}</p>}
    </>
  );
};

export default Studentlist;