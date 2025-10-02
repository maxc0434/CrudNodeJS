import React from "react";  // Importe React
import { useState } from 'react'  // Importe le hook useState pour gérer l'état local
import { useNavigate, useParams } from 'react-router-dom'  // Importe useNavigate pour rediriger et useParams pour récupérer les paramètres d'URL
import axios from 'axios'  // Importe axios pour faire les requêtes HTTP

function UpdateStudent() {
  const [name, setName] = useState("");  // State pour stocker le nom, initialisé à chaîne vide
  const [email, setEmail] = useState("");  // State pour stocker l'email, initialisé à chaîne vide
  const { id } = useParams();  // Récupère le paramètre 'id' depuis l'URL (ex: /update/5 → id=5)
  const navigate = useNavigate();  // Fonction pour naviguer/rediriger vers une autre route

  // Fonction appelée lors de la soumission du formulaire (clic sur "Soumettre")
  function handleSubmit(event) {
    event.preventDefault();  // Empêche le rechargement automatique de la page (comportement par défaut du formulaire)
    const updatedStudent = {name, email};  // Crée un objet avec les nouvelles données du formulaire
    axios
      .put(`http://localhost:8081/update/${id}`, updatedStudent)  // Requête PUT pour mettre à jour l'étudiant avec l'ID donné
      .then(res => {
        console.log(res);     // Affiche la réponse dans la console (pour debug)
        navigate("/");        // Redirige vers la page d'accueil après mise à jour réussie
      })
      .catch(err => console.log(err));  // Affiche une erreur en console si la requête échoue
  }

  // Rendu JSX affichant le formulaire de mise à jour
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit} >  {/* Au submit, appelle handleSubmit */}
          <h2 className='fw-bolder mb-5'> Mettre a jour </h2>
          
          <div className='mb-2 '>
            <label htmlFor="" className='me-2'> Nom </label>
            {/* Champ texte pour le nom, met à jour le state name à chaque changement */}
            <input 
              placeholder='Remplacer votre Nom' 
              className='form-control w-50 mx-auto' 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className='mb-2 '>
            <label htmlFor="" className='me-2'> Email </label>
            {/* Champ texte pour l'email, met à jour le state email à chaque changement */}
            <input 
              placeholder='Remplacer votre eMail' 
              className='form-control w-50 mx-auto' 
              type="text" 
              onChange={(e) => setEmail(e.target.value)}  
            />   
          </div>

          {/* Bouton de soumission */}
          <button className='btn btn-outline-success mt-3'>Soumettre</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;  // Exporte le composant pour l'utiliser dans d'autres fichiers
