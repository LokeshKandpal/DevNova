import axios from "axios";
import React, { useEffect, useState } from "react";
import './createbatch.css';
import { useLocation, useParams } from "react-router-dom";

const Createbatch = () => {
  const [trainingcourse, settrainingcourse] = useState('');
  const [batchtype, setbatchtype] = useState('');
  const [trainers, settrainers] = useState('');

  const [coursemonth, setcoursemonth] = useState('');
  const [courseday, setcourseday] = useState('');
  const [coursehour, setcoursehour] = useState('');
  const [courseminute, setcourseminute] = useState('');
  const [courseampm, setcourseampm] = useState('');
  const [coursetrainer, setcoursetrainer] = useState('');
  const [coursebatch, setcoursebatch] = useState('');
  const [coursename, setcoursename] = useState(''); 
 
  const [formname, setformname] = useState('');
  const [buttonname, setbuttonname] = useState('');

  const params = useParams();
  const location = useLocation();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];

  useEffect(() => {
    trainingcourselist();
    batchtypelist();
    trainerslist();
    console.log(params.id);

    if (location.pathname.split('/')[1] === 'batch-creation') {
      setformname('Create Batch');
      setbuttonname('Register');
    }
    if (location.pathname.split('/')[1] === '') {
      setformname('Create Batch');
      setbuttonname('Register');
    }
    if (location.pathname.split('/')[1] === 'update') {
      setformname('Update Batch');
      setbuttonname('Update');
      axios
        .get(`https://api.uncodecart.com/students/singlestudentbatchlist/${params.id}`)
        .then((response) => {
          console.log(response);
          setcoursename(response.data.message[0].batch_course_name);
          setcoursetrainer(response.data.message[0].batch_trainer);
          setcoursehour(response.data.message[0].batch_timing.split(":")[0]);
          setcourseminute(
            response.data.message[0].batch_timing.split(":")[1].replace(/[a-zA-Z]/g, '')
          );
          setcourseampm(response.data.message[0].batch_timing.match(/[a-zA-Z]+$/)[0]);
          setcourseday(response.data.message[0].batch_start_date.split("-")[0]);
          setcoursemonth(response.data.message[0].batch_start_date.split("-")[1]);
          setcoursebatch(
            response.data.message[0].batch_type === "WE" ? "WE" : "WD"
          );
        });
    }
  }, [location.pathname, params.id]);

  const trainingcourselist = () => {
    axios.get("https://api.uncodecart.com/students/trainingcourselist")
      .then((response) => {
        settrainingcourse(response.data.message);
      });
  };

  const batchtypelist = () => {
    axios.get("https://api.uncodecart.com/students/batchtypelist")
      .then((response) => {
        setbatchtype(response.data.message);
      });
  };

  const trainerslist = () => {
    axios.get("https://api.uncodecart.com/students/trainerslist")
      .then((response) => {
        settrainers(response.data.message);
      });
  };

  const handlecoursename = (event) => {
    setcoursename(event.target.value); 
  };

  const handlecoursemonth = (event) => {
    setcoursemonth(event.target.value);
  };

  const handlecourseday = (event) => {
    setcourseday(event.target.value);
  };

  const handlecoursehour = (event) => {
    setcoursehour(event.target.value);
  };

  const handlecourseminute = (event) => {
    setcourseminute(event.target.value);
  };

  const handlecourseampm = (event) => {
    setcourseampm(event.target.value);
  };

  const handlecoursetrainer = (event) => {
    setcoursetrainer(event.target.value);
  };

  const handlecoursebatch = (event) => {
    setcoursebatch(event.target.value);
  };

  const resetForm = () => {
    setcoursename('');
    setcoursebatch('');
    setcoursetrainer('');
    setcoursehour('');
    setcourseminute('');
    setcourseampm('');
    setcourseday('');
    setcoursemonth('');
  };

  const submithandler = (event) => {
    event.preventDefault();
    const coursetime = `${coursehour}:${courseminute}${courseampm}`.toLowerCase();
    let courseday1 = `${courseday}-${coursemonth}`;
    let batch_complete_name = `${coursename.toLowerCase()}-${coursebatch.toLowerCase()}-${coursetrainer.toLowerCase()}-${coursetime}-${courseday}${coursemonth.toLowerCase()}`;
    
    var createbatchjson = {
      "batch_course_name": coursename,
      "batch_type": coursebatch,
      "batch_trainer": coursetrainer,
      "batch_timing": coursetime,
      "batch_start_date": courseday1,
      "batch_complete_name": batch_complete_name
    };

    if (location.pathname.split('/')[1] === 'update') {
      // Update the existing batch using PUT request
      axios.put(`https://api.uncodecart.com/students/studentbatchupdate/${params.id}`, createbatchjson)
        .then((response) => {
          console.log(response);
          alert("Batch is updated successfully");
          resetForm();
          // Optionally navigate back to the batch list after update
          window.location.href = '/batchlist'; // Adjust the route as needed
        })
        .catch((error) => {
          console.error("Error updating batch:", error);
          alert("Failed to update batch. Please try again.");
        });
    } else {
      // Create a new batch using POST request
      axios.post('https://api.uncodecart.com/students/studentbatch', createbatchjson)
        .then((response) => {
          console.log(response);
          alert("Batch is created successfully");
          resetForm();
        })
        .catch((error) => {
          console.error("Error creating batch:", error);
          alert("Failed to create batch. Please try again.");
        });
    }
  };

  return (
    <div className="batchComp">
      <div className="container">
        <h2>{formname}</h2>
        <div className="inputCont">
          <label htmlFor="course">Select a Course:</label>
          <select id="course" value={coursename} onChange={handlecoursename}>
            <option value="" disabled>Select a course</option>
            {trainingcourse && trainingcourse.map((course) => (
              <option key={course.training_course_short_name} value={course.training_course_short_name}>
                {course.training_course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="inputCont">
          <label htmlFor="batch">Batch Type:</label>
          <select id="batch" value={coursebatch} onChange={handlecoursebatch}>
            <option value="" disabled>Select batch</option>
            {batchtype && batchtype.map((course) => (
              <option key={course.batch_type_name} value={course.batch_type_name}>
                {course.batch_type_name}
              </option>
            ))}
          </select>
        </div>

        <div className="inputCont">
          <label htmlFor="trainer">Pick a Trainer:</label>
          <select id="trainer" value={coursetrainer} onChange={handlecoursetrainer}>
            <option value="" disabled>Select a trainer</option>
            {trainers && trainers.map((trainer) => (
              <option key={trainer.trainer_short_name} value={trainer.trainer_short_name}>
                {trainer.trainer_name}
              </option>
            ))}
          </select>
        </div>

        <div className="inputCont">
          <label htmlFor="time">Select Time:</label>
          <div className="timeSelectors">
            <select id="hour" value={coursehour} onChange={handlecoursehour}>
              <option value="" disabled>Hour</option>
              {hours.map((hour) => (
                <option key={hour} value={hour.toString().padStart(2, '0')}>
                  {hour.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <select id="minute" value={courseminute} onChange={handlecourseminute}>
              <option value="" disabled>Minute</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
            <select id="ampm" value={courseampm} onChange={handlecourseampm}>
              <option value="" disabled>AM/PM</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="inputCont">
          <label htmlFor="day">Day:</label>
          <select id="day" value={courseday} onChange={handlecourseday}>
            <option value="" disabled>Select a day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          <label htmlFor="month">Month:</label>
          <select id="month" value={coursemonth} onChange={handlecoursemonth}>
            <option value="" disabled>Select a month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="inputCont">
          <input type="button" value={buttonname} onClick={submithandler} />
        </div>
      </div>
    </div>
  );
};

export default Createbatch;