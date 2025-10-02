import React from 'react'  // Importe React
import { useState } from 'react'  // Importe le hook useState pour gérer l'état local
import { useNavigate } from 'react-router-dom'  // Importe useNavigate pour la navigation programmatique
import axios from 'axios'  // Importe axios pour faire des requêtes HTTP

function CreateStudent() {
    const [name, setName] = useState('')  // State pour stocker le nom, initialisé vide
    const [email, setEmail] = useState('')  // State pour stocker l'email, initialisé vide
    const navigate = useNavigate();  // Fonction pour rediriger vers une autre route

    // Fonction appelée à la soumission du formulaire
    function handleSubmit(event){
        event.preventDefault();  // Empêche le rechargement automatique de la page
        // Requête POST pour créer un étudiant avec les données saisies
        axios.post('http://localhost:8081/create', {name, email})
        .then(res => {
            console.log("Created Student", res);  // Affiche la réponse dans la console
            navigate('/')  // Redirige vers la page d'accueil après succès
        })
        .catch(err =>console.log(err))  // Affiche une erreur en console si échec
    }

    // Rendu JSX du formulaire
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >  {/* Appelle handleSubmit au submit */}
                    <h2 className='fw-bolder mb-5'> Ajouter un Etudiant </h2>
                    
                    <div className='mb-2 '>
                        <label htmlFor="" className='me-2'> Nom </label>
                        {/* Input pour saisir le nom, met à jour le state name */}
                        <input 
                            placeholder='Tapez votre Nom' 
                            className='form-control w-50 mx-auto' 
                            type="text" 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="" className='me-2'> Email </label>
                        {/* Input pour saisir l'email, met à jour le state email */}
                        <input 
                            placeholder='Tapez votre eMail' 
                            className='form-control w-50 mx-auto' 
                            type="text" 
                            onChange={(e) => setEmail(e.target.value)}  
                        />   
                    </div>

                    {/* Bouton pour soumettre le formulaire */}
                    <button className='btn btn-outline-success mt-3'>Soumettre</button>
                </form>
            </div>
        </div>
    )
}

export default CreateStudent  // Exporte le composant pour utilisation externe
