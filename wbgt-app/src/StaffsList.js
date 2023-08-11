
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StaffsList() {
  

  const [staffs, setStaffs] = useState([]);


  useEffect(() => {
    loadStaffs();
  }, []);

  const loadStaffs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/staff/list");
      // const jsonData = JSON.parse(response.data);
      setStaffs(response.data);
      
    } catch (error) {
      console.error("Error loading staffs:", error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/staff/list/${id}`);
      loadStaffs();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };


  return (
    <div className="container">
      <h3 className="title">Manage Staff Page</h3>
      <div className="py-4">

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Name</th>
              <th scope="col">Password</th>
              <th scope="col">Title</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {staffs.map((staff, index) => (
              <tr key={staff.id}>
              <td>{index + 1}</td>
                <td>{staff.name}</td>
                <td>{staff.password}</td>
                <td>{staff.title}</td>
                <td>{staff.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewStaff/${staff.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editStaff/${staff.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteStaff(staff.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/addStaff" className="btn btn-primary mb-3">
          Add Staff
        </Link>

      </div>
    </div>
  );
}



  