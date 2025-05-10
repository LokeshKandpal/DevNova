import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Profile');
  const [userData, setUserData] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage and update state on mount
  const checkAuth = () => {
    const storedData = localStorage.getItem('userData');
    console.log('Stored Data from localStorage:', storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('Parsed userData:', parsedData);
      setUserData(parsedData);

      const batchParts = parsedData.student_batch?.split('/');
      console.log(`This is batchpart thing ${batchParts}`);
      const trainerShortName = batchParts ? batchParts[2] : '';
      console.log('Trainer Short Name:', trainerShortName);

      if (trainerShortName) {
        axios
          .get(`https://api.uncodecart.com/students/singletrainerslist/${trainerShortName}`)
          .then((response) =>{
            console.log(`my repsonse is ${response}`);
            return response;
          })
          .then((response) => {
            console.log('Trainer API Response:',response.data.message[0]);
            setTrainerData(response.data.message[0]);
          })
          .catch((err) => {
            console.error('Error fetching trainer data:', err.response || err.message);
            setTrainerData(null);
          });
      } else {
        console.log('No trainer short name found in student_batch');
      }
    } else {
      setUserData(null); // Reset userData for default view
      setTrainerData(null); // Clear trainer data
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth(); // Run on mount
  }, []); // Empty array, runs once on mount

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null); // Reset state for default view
    setTrainerData(null);
    setActiveSection('Profile');
    console.log('Logged out, showing default dashboard');
    // No navigation needed, stays on /dashboard and shows default view
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const parseBatchDetails = (batch) => {
    if (!batch) return { courseName: 'N/A', batchType: 'N/A', trainer: 'N/A', timing: 'N/A', startDate: 'N/A' };
    const [courseName, batchType, trainer, timing, startDate] = batch.split('/');
    return { courseName, batchType, trainer, timing, startDate };
  };

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;

    if (!userData) {
      // Default dashboard for non-logged-in users or after logout
      return (
        <div className="default-dashboard">
          <h2>Welcome to the Student Dashboard</h2>
          <p>This is a preview of the dashboard. Please log in to access your personalized information.</p>
          <button onClick={() => navigate('/login')} className="login-button">
            Log In
          </button>
          <p>Explore sample sections below:</p>
          <ul>
            <li><strong>Profile:</strong> View your personal details (after login).</li>
            <li><strong>Courses:</strong> See your enrolled courses (after login).</li>
            <li><strong>Attendance:</strong> Track your attendance (after login).</li>
          </ul>
        </div>
      );
    }

    // Personalized dashboard for logged-in users
    const batchDetails = parseBatchDetails(userData.student_batch);
    console.log('Batch Details:', batchDetails);

    switch (activeSection) {
      case 'Profile':
        return (
          <div>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {userData.student_name || 'N/A'}</p>
            <p><strong>Email:</strong> {userData.student_email || 'N/A'}</p>
            <p><strong>Mobile:</strong> {userData.student_mobile || 'N/A'}</p>
            <p><strong>Gender:</strong> {userData.student_gender || 'N/A'}</p>
            <p><strong>Trainer:</strong> {trainerData?.trainer_name || batchDetails.trainer || 'N/A'}</p>
            <p><strong>Trainer Department:</strong> {trainerData?.trainer_dept || 'N/A'}</p>
            <p><strong>Batch:</strong> {userData.student_batch || 'N/A'}</p>
          </div>
        );
      case 'Courses':
        return (
          <div>
            <h2>Courses</h2>
            <p><strong>Course Name:</strong> {batchDetails.courseName || 'N/A'}</p>
            <p><strong>Batch Type:</strong> {batchDetails.batchType || 'N/A'}</p>
            <p><strong>Timing:</strong> {batchDetails.timing || 'N/A'}</p>
            <p><strong>Start Date:</strong> {batchDetails.startDate || 'N/A'}</p>
          </div>
        );
      case 'Attendance':
        return <div><h2>Attendance</h2><p>Attendance details go here (TBD).</p></div>;
      case 'Assignment':
        return <div><h2>Assignment</h2><p>Assignment details go here (TBD).</p></div>;
      case 'Project':
        return <div><h2>Project</h2><p>Project details go here (TBD).</p></div>;
      case 'Fee':
        return <div><h2>Fee</h2><p>Fee details go here (TBD).</p></div>;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      {userData && (
        <div className="sidebar">
          <h3>Student Dashboard</h3>
          <ul className="sidebar-menu">
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === 'Profile' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Profile')}
              >
                Profile
              </button>
            </li>
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === 'Courses' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Courses')}
              >
                Courses
              </button>
            </li>
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === 'Attendance' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Attendance')}
              >
                Attendance
              </button>
            </li>
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === 'Assignment' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Assignment')}
              >
                Assignment
              </button>
            </li>
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === 'Project' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Project')}
              >
                Project
              </button>
            </li>
            <li className="menu-item">
              <button
                className={`menu-button ${activeSection === 'Fee' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Fee')}
              >
                Fee
              </button>
            </li>
            <li className="menu-item logout-item">
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
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

export default Dashboard;