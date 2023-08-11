import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewStaff() {
    const [staff, setStaff] = useState({
        name: "",
        title: "",
        email: "",
    });

    const { id } = useParams();

    useEffect(() => {
        const loadStaff = async () => {
            const result = await axios.get(`http://localhost:8080/api/staffs/${id}`);
            setStaff(result.data);
        };
        loadStaff();
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Staff Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of staff id : {staff.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {staff.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Title: </b>
                                    {staff.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {staff.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/staffsList"}>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}
