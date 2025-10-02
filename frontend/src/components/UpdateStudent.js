import React from "react";
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function UpdateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const updatedStudent = {name, email};
    axios
      .put(`http://localhost:8081/update/${id}`, updatedStudent)
      .then(res => {
        console.log(res);
        navigate("/");
      })
      .catch(err => console.log(err));
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit} >
                <h2 className='fw-bolder mb-5'> Ajouter un Etudiant </h2>
                    <div className='mb-2 '>
                        <label htmlFor="" className='me-2'> Nom </label>
                        <input placeholder='Tapez votre Nom' className='form-control w-50 ' type="text" onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="" className='me-2'> Email </label>
                        <input placeholder='Tapez votre eMail' className='form-control w-50' type="text" onChange={(e) => setEmail(e.target.value)}/>   
                    </div>

                <button className='btn btn-outline-success mt-3'>Soumettre</button>
            </form>
        </div>
    </div>
  );
}

export default UpdateStudent;
