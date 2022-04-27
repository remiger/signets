import './ListeDossiers.scss';
import Dossier from './Dossier';
import { useEffect } from 'react';
import * as dossierModele from '../code/dossier-modele';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  
  // Lire les dossiers de lutilisateur connecte dans Firestore
  useEffect(
    () => dossierModele.lireTout(utilisateur.uid).then(
      lesDossiers => setDossiers(lesDossiers)
    )
    , [utilisateur, setDossiers]
  );

  function supprimerDossier(idDossier){
    // Utiliser le modele des dossiers pour supprimer le dossier dans Firestore
    dossierModele.supprimer(utilisateur.uid, idDossier).then(
      () => setDossiers(dossiers.filter(
        dossier => dossier.id !== idDossier
      ))
    );
  }

  function modifierDossier(idDossier, nvTitre, nvCouverture, nvCouleur){
    // Objet qui contient les parametres a modifier
    const objetModif = {
      titre: nvTitre,
      couverture: nvCouverture,
      couleur: nvCouleur
    };

    dossierModele.modifier(utilisateur.uid, idDossier, objetModif).then(
      () => setDossiers(dossiers.map(
        dossier => {
          if(dossier.id === idDossier){
            dossier.titre = nvTitre;
            dossier.couleur = nvCouleur;
            dossier.couverture = nvCouverture;
          }

          return dossier;
        }
      ))
    );
  }

  function ajouterSignet(idDossier, url){
    
  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier =>  <li key={dossier.id}><Dossier {...dossier} modifierDossier={modifierDossier} supprimerDossier={supprimerDossier} ajouterSignet={ajouterSignet} /></li>
        )
      }
    </ul>
  );
}