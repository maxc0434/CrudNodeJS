import './App.css';  // Importe le fichier CSS global
import {BrowserRouter, Routes, Route} from "react-router-dom";  // Importe les composants nécessaires de React Router v6 pour le routing
import Student from './components/Student';  // Importe le composant Student (liste des étudiants)
import CreateStudent from './components/CreateStudent';  // Importe le composant de création d'étudiant
import UpdateStudent from './components/UpdateStudent';  // Importe le composant de mise à jour d'étudiant

function App() {
  return (
    <div className="App">
      {/* BrowserRouter encapsule l'application pour activer le routing côté client */}
      <BrowserRouter>
        {/* Routes regroupe les différentes routes de l'application */}
        <Routes>
          {/* Route pour la page d'accueil affichant la liste des étudiants */}
          <Route path='/' element={<Student/>}> </Route>
          {/* Route pour créer un nouvel étudiant */}
          <Route path='/create' element={<CreateStudent/>}> </Route>
          {/* Route pour mettre à jour un étudiant via son id dynamique */}
          <Route path='/update/:id' element={<UpdateStudent/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;  // Exporte la fonction App comme composant racine

