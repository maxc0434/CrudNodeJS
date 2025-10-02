import React from "react";  // Importe React
import { useEffect, useState } from "react";  // Importe les hooks useEffect et useState
import axios from "axios";  // Importe Axios pour faire les requêtes HTTP
import { Link } from "react-router-dom";  // Importe Link pour la navigation entre pages

function Student() {
    const [student, setStudent] = useState([])  // Initialise le state 'student' avec un tableau vide

    useEffect(() => {  
        // Effet déclenché au montage du composant : récupérer la liste des étudiants
        axios.get('http://localhost:8081/')  // Requête GET vers l'API pour récupérer les étudiants
        .then(res => setStudent(res.data))  // Si succès, met à jour le state avec les données reçues
        .catch(err => console.log(err));    // En cas d'erreur, affiche dans la console
    }, [])  // Le tableau vide [] signifie que l'effet ne s'exécute qu'une fois (au montage)

    // Fonction asynchrone pour gérer la suppression d'un étudiant
    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8081/student/' + id)  // Requête DELETE pour supprimer l'étudiant par ID
            window.location.reload()  // Recharge la page pour mettre à jour la liste (très simple mais pas optimal)
        } catch(err) {
            console.log(err);  // Affiche l'erreur en console en cas d'échec
        }
    }

    // Le rendu JSX du composant
    return (
        <div className="d-flex vh-10 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded border border-dark">

                <h1 className="mt-2"> Liste des Eleves</h1>
                <table className="table table-striped mt-5 mb-5 table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>      {/* Colonne Nom */}
                            <th>Email</th>    {/* Colonne Email */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Parcourt le tableau student et affiche une ligne par étudiant
                            student.map((data, i) => (
                                <tr key={i}>  {/* La clé doit idéalement être unique, ici l'indice i */}
                                    <td>{data.name}</td>    {/* Affiche le nom */}
                                    <td>{data.email}</td>   {/* Affiche l'email */}
                                    <td>
                                        {/* Bouton pour modifier, redirige vers une route de mise à jour */}
                                        <Link to={`update/${data.id}`} className="btn btn-primary me-2"> Modifier </Link>
                                        {/* Bouton pour supprimer, lance la fonction handleDelete */}
                                        <button className="btn btn-danger" onClick={ e => handleDelete(data.id)}> Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="display-flex justify-content-center mb-4">
                    {/* Lien pour ajouter un nouvel étudiant */}
                    <Link to="/create" className="btn btn-success mt-2 "> Ajouter </Link>
                </div>
            </div>
        </div>
    );
}

export default Student;  // Exporte le composant pour l'importer ailleurs
