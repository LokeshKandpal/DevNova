import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './batchlist.css';

const Batchlist = () => {
    const navigate = useNavigate();
    const [usersdata, setusersdata] = useState('');

    useEffect(() => {
        getbatchlist();
    }, []);

    const getbatchlist = () => {
        axios.get('https://api.uncodecart.com/students/studentbatchlist').then((response) => {
            setusersdata(response.data.message);
        });
    };

    const handleDelete = (batch_id) => {
        axios.delete('https://api.uncodecart.com/students/studentbatchdelete/' + batch_id).then((response) => {
            getbatchlist();
        });
    };

    const handleUpdate = (batch_id) => {
        navigate('/update/' + batch_id);
    };

    return (
        <div className="batchlist-container">
            <table>
                <thead>
                    <tr>
                        <th>Batch Id</th>
                        <th>Batch Course Name</th>
                        <th>Batch Type</th>
                        <th>Batch Trainer</th>
                        <th>Batch Timing</th>
                        <th>Batch Start Date</th>
                        <th>Batch Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {usersdata && usersdata.map((user) => (
                        <tr key={user.batch_id}>
                            <td>{user.batch_id}</td>
                            <td>{user.batch_course_name}</td>
                            <td>{user.batch_type}</td>
                            <td>{user.batch_trainer}</td>
                            <td>{user.batch_timing}</td>
                            <td>{user.batch_start_date}</td>
                            <td>{user.batch_complete_name}</td>
                            <td>
                                <div className="table-div">
                                    <input type="button" value="Delete" onClick={() => { handleDelete(user.batch_id)}}/>
                                    <input type="button" value="Update" onClick={() => { handleUpdate(user.batch_id)}}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Batchlist;