import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStaff() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [staff, setStaff] = useState({
        name: "",
        password: "",
        title: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateField = (name, value) => {
        if (!value) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const isNameValid = validateField("name", staff.name);
        const isPasswordValid = validateField("password", staff.password);
        const isTitleValid = validateField("title", staff.title);
        const isEmailValid = validateField("email", staff.email);

        if (isNameValid && isPasswordValid && isTitleValid && isEmailValid) {
            try {
                await axios.put(`http://localhost:8080/staff/list/${id}`, staff, {
                    withCredentials: true,
                });
                navigate("/staffsList");
            } catch (error) {
                console.error("Error updating staff:", error);
            }
        }
    };

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/staff/list/${id}`, {
                    withCredentials: true,
                });
                setStaff(result.data);
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };
        loadStaff();
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Staff</h2>

                    <form onSubmit={onSubmit}>
                        {/* Name input */}
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={staff.name}
                                onChange={onInputChange}
                            />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>

                        {/* Password input */}
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                value={staff.password}
                                onChange={onInputChange}
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>

                        {/* Title input */}
                        <div className="mb-3">
                            <label htmlFor="Title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Staff title"
                                name="title"
                                value={staff.title}
                                onChange={onInputChange}
                            />
                            {errors.title && <div className="error-message">{errors.title}</div>}
                        </div>

                        {/* Email input */}
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter e-mail address"
                                name="email"
                                value={staff.email}
                                onChange={onInputChange}
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
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
