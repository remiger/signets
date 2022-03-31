// CSS
import './Appli.scss';

// Sous-composants
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import AjoutDossier from './AjoutDossier';
import Accueil from './Accueil';

// Composants externes
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// Fonctionnalités requises
import { useState, useEffect } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';
import * as dossierModele from '../code/dossier-modele';

export default function Appli() {
  // Etat 'utilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  // Etat des 'dossiers' de l'utilisateur connecte
  const [dossiers, setDossiers] = useState([]);

  // Etat du formulaire d'ajout de dossier
  const [ouvert, setOuvert] = useState(false);

  // Fonction gerer l'ajout d'un dossier
  function gererAjoutDossier(titre, couverture, couleur){
    // Code Firestore...
    console.log('Les valeurs du formulaire : ', titre, couverture, couleur);
    dossierModele.creer(utilisateur.uid, {
      titre: titre,
      couverture: couverture,
      couleur: couleur
    }).then(
      doc => setDossiers([{id: doc.id, ...doc.data()}, ...dossiers])
    )
  }

  // Surveiller l'etat de la connexion Firebase Auth
  useEffect(() => observerEtatConnexion(setUtilisateur), []);

  return (
    utilisateur ?
      <div className="Appli">
          <Entete utilisateur={utilisateur}/>
          <section className="contenu-principal">
            <ListeDossiers utilisateur={utilisateur} dossiers={dossiers} setDossiers={setDossiers} />
            {/* Ajouter un composant FormDialog de MUI */}
            <AjoutDossier ouvert={ouvert} setOuvert={setOuvert} gererAjoutDossier={gererAjoutDossier} />
            <Fab onClick={() => setOuvert(true)} size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
              <AddIcon />
            </Fab>
          </section>
      </div>
    :
    <Accueil />
  );
}
