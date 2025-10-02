import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Student() {

    const [student, setStudent] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setStudent(res.data))

        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8081/student/'+id)
            window.location.reload()
        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div className="d-flex vh-10 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded border border-dark">

            <h1 className="mt-2"> Liste des Eleves</h1>
            <table className="table table-striped mt-5 mb-5 table-bordered">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, i) => (
                            <tr key={i}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <Link to={`update/${data.id}`} className="btn btn-primary me-2"> Modifier </Link>
                                    <button className="btn btn-danger" onClick={ e => handleDelete(data.id)}> Supprimer</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                    <div className="display-flex justify-content-center mb-4">
                    <Link to="/create" className="btn btn-success mt-2 "> Ajouter </Link>
                    </div>
        </div>

    </div>
  );
}

export default Student;
