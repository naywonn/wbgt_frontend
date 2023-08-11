import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStaff() {
    let navigate = useNavigate();

    
    // eslint-disable-next-line
    const { id } = useParams();

    const [staff, setStaff] = useState({
        name: "",
        title: "",
        email: "",
    });

    const { name, title, email } = staff;

    const onInputChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const loadStaff = async () => {
            const result = await axios.get(`http://localhost:8080/api/staffs/${id}`);
            setStaff(result.data);
        };
        loadStaff();
    }, [id]);
         

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/staffs/${id}`, staff);
        navigate("/staffsList");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Staff</h2>

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
                        <button type="submit" className="btn btn-outline-primary">
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
