// CSS
import './Appli.scss';

// Sous-composants
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';
import Accueil from './Accueil';

// Composants externes
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// Fonctionnalités requises
import { useState, useEffect, createContext } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';
import * as dossierModele from '../code/dossier-modele';

// Creer une variable de contexte (globale) qui sera accessible dans les composants enfants
export const UtilisateurContext = createContext(null);

export default function Appli() {
  // Etat 'utilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  // Etat des 'dossiers' de l'utilisateur connecte
  const [dossiers, setDossiers] = useState([]);

  // Etat du formulaire d'ajout de dossier
  const [ouvert, setOuvert] = useState(false);

  // Fonction gerer l'ajout d'un dossier
  function ajouterDossier(id, titre, couverture, couleur){
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
      <UtilisateurContext.Provider value={utilisateur}>
        <div className="Appli">
            <Entete />
            <section className="contenu-principal">
              <ListeDossiers dossiers={dossiers} setDossiers={setDossiers} />
              {/* Ajouter un composant FormDialog de MUI */}
              <FrmDossier ouvert={ouvert} setOuvert={setOuvert} gererActionDossier={ajouterDossier} />
              <Fab onClick={() => setOuvert(true)} size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
        </div>
      </UtilisateurContext.Provider>
    :
    <Accueil />
  );
}
