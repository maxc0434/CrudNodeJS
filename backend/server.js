const express = require("express");  // Importe le framework Express
const app = express();  // Initialise une application Express

const cors = require("cors");  // Importe le module CORS
const mysql = require("mysql2")  // Importe mysql2 pour interagir avec MySQL

// Options de configuration CORS
const corsOptions = {
    origin: [
        'http://localhost:3000',   // Autorise l'accès depuis localhost:3000
        'http://localhost:8081',   // Autorise l'accès depuis localhost:8081
    ],
    optionsSuccessStatus: 200,  // Code de statut de succès pour OPTIONS
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',  // Méthodes HTTP autorisées
    headers: 'Content-Type, Autorization',  // En-têtes autorisés (⚠️ "Autorization" -> devrait être "Authorization")
    credentials: true,  // Autorise l'envoi de cookies/session cross-origin
};

// Middlewares
app.use(express.json());  // Permet à Express de lire les requêtes JSON
app.use(cors(corsOptions))  // Active CORS avec les options définies

// Connexion à la base de données MySQL
const database = mysql.createConnection({
  host: 'localhost',   // Hôte de la base
  user: 'root',        // Identifiant MySQL
  password: '',        // Mot de passe (⚠️ éviter de laisser vide et en clair)
  database: 'crudnode' // Nom de la base
})

// Route GET pour récupérer tous les étudiants
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";  // Requête SQL sélectionnant tous les étudiants
  database.query(sql, (err,data) => {   // Exécute la requête
    console.log(err)  // Affiche une erreur éventuelle dans la console
    if (err) return res.json("Error");  // Retourne un message d'erreur si échec
    return res.json(data);              // Retourne les données au format JSON
  });
});

// Route POST pour créer un nouvel étudiant
app.post("/create", (req, res)=> {
  const sql = "INSERT INTO student (`name`, `email`) VALUES (?)"; // Requête SQL d'insertion
  const values = [ 
    req.body.name,   // Récupère "name" du corps de la requête
    req.body.email   // Récupère "email" du corps de la requête
  ];
  database.query(sql, [values], (err, data) => { // Exécute la requête avec les valeurs
    if(err) {
      return res.status(500).json("Error"); // Retourne une erreur HTTP 500 si problème
    }
    return res.json(data); // Retourne la réponse SQL (ex. ID du nouvel enregistrement)
  })
});

// Route PUT pour mettre à jour un étudiant selon son ID
app.put("/update/:id", (req, res)=> {
  const sql = "update student set `name` = ?, `email` = ? WHERE id =? "; // Requête SQL update
  const values = [
    req.body.name,   // Nouveau "name"
    req.body.email   // Nouveau "email"
  ];
  const id = req.params.id;  // Récupère l'ID depuis l'URL
  database.query(sql, [...values, id], (err, data) => {
    if(err) {
      return res.json("Error"); // Retourne une erreur si problème
    }
    return res.json(data); // Retourne la réponse SQL
  })
});

// Route DELETE pour supprimer un étudiant par son ID
app.delete('/student/:id', (req, res) => {
  const sql = "DELETE FROM student Where id =?"; // Requête SQL delete
  const id = req.params.id;  // Récupère l'ID depuis l'URL

  database.query(sql, [id], (err, data) => {
    if(err) return res.json("Error"); // Retourne une erreur si échec
    return res.json(data);            // Retourne la réponse SQL
  })
})

// Lancement du serveur sur le port 8081
app.listen(8081, () => {
  console.log("Server is running on port 8081"); // Affiche un message de confirmation
});
