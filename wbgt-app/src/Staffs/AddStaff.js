import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddStaff() {
    let navigate = useNavigate();

    const [staff, setStaff] = useState({
        name: "",
        password: "",
        title: "",
        email: "",
    });

    const { name,password, title, email } = staff;

    const onInputChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/staff/list", staff);
        navigate("/staffsList");
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Staff</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Title" className="form-label">
                                Title
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter Staff title"
                                name="title"
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary" >
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/staffsList">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
