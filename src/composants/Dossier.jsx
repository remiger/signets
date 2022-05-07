import './Dossier.scss'; 
import FrmDossier from './FrmDossier';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import couvertureDefaut from '../images/couverture-defaut.jpg';
import { formaterDate } from '../code/helper';
import { useState, useContext } from 'react';
import * as signetModele from '../code/signet-modele';
import { UtilisateurContext } from './Appli';

export default function Dossier({id, titre, couleur, dateModif, couverture, top3, supprimerDossier, modifierDossier, ajouterSignet}) {
  // Etat de la carte active
  const [carteActive, setCarteActive] = useState(false);

  // Identifiant de l'utilisateur
  const uid = useContext(UtilisateurContext).uid;

  // Etat des signets dans ce dossier
  const [signets, setSignets] = useState(top3 || []);

  // Etat du menu contextuel
  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvertMenu = Boolean(eltAncrage);

  // Etat du formulaire de modification
  const [ouvertFrm, setOuvertFrm] = useState(false);
  const ouvertModif = Boolean(ouvertFrm);

  function gererMenu(evt){
    setEltAncrage(evt.currentTarget);
    evt.stopPropagation();
  };

  function gererFermerMenu(evt){
    setEltAncrage(null);
    // Arreter le bubbling de levenement
    evt.stopPropagation();
  };

  function afficherFormulaireDossier(evt){
    // Ouvrir le formulaire de modification du dossier
    setOuvertFrm(true);

    // Fermer le menu
    gererFermerMenu(evt);

    // Arreter le bubbling de levenement
    evt.stopPropagation();
  };
  
  function gererSupprimer(evt){
    // Appeler la fonction de ListeDossiers qui gere la suppression dans Firestore
    supprimerDossier(id);

    // Fermer le menu
    gererFermerMenu(evt);

    // Arreter le bubbling de levenement
    evt.stopPropagation();
  };

  // Tester si l'URL dans la variable couverture est valide
  let urlCouverture;
  try{
    urlCouverture = new URL(couverture);
  } 
  catch(e){
    couverture = couvertureDefaut;
  }

  // Etat dropzone
  const [dropzone, setDropzone] = useState(false);

  function gererDragEnter(evt){
    // TODO limiter aux liens
    evt.dataTransfer.effectAllowed = 'link';

    evt.preventDefault();
    setDropzone(true);
  }

  function gererDragLeave(){
    setDropzone(false);
  }

  function gererDragOver(evt){
    evt.preventDefault();
  }

  function gererDrop(evt){
    evt.preventDefault();
    setDropzone(false);
    let url = evt.dataTransfer.getData("URL");
    // on aimerait aussi chercher le TITLE
    // chercher lURL par fetch() et lire le contenu de la page, et
    // selectionner la balise TITLE de son innerText...

    // Ne fonctionne que si on peut heberger un script serveur sur le meme
    // domaine pour faire lextraction des titres des URLs....
    /*fetch("https://cors-anywhere.herokuapp.com/" + url)
    .then(reponse => reponse.text())
    .then(
      chaineDoc => {
        const doc = new DOMParser().parseFromString(chaineDoc, "text/html");
        const titre = doc.querySelectorAll('title')[0];

        // on appelle la methode dajout dun signet dans un dossier definie 
        // dans le composant parent et passee ici en props
        // elle prend 2 arguments: id du dossier et chaine de lurl deposee
        ajouterSignet(id, url, titre.innerText);
      }
    );*/

    // Alternative sans les titres
    ajouterSignet(id, url, "Titre a venir");
  }

  function ajouterSignet(idDossier, url, titreUrl){
    const derniers3 = [...signets, {url: url, titre: titreUrl}].slice(-3);
    signetModele.creer(uid, idDossier, derniers3).then(
      () => setSignets(derniers3)
    );
  }

  return (
    <article className={"Dossier" + (dropzone ? ' dropzone' : '') + (carteActive ? ' actif' : '')} onDrop={gererDrop}  onDragEnter={gererDragEnter} onDragOver={gererDragOver} onDragLeave={gererDragLeave} style={{backgroundColor: couleur}}>
      <div className="carte">
        <div className="endroit" onClick={() => setCarteActive(true)}>
          <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
            <SortIcon />
          </IconButton>
          <div className="couverture">
            <img src={couverture} alt={titre}/>
          </div>
          <div className="info">
            <h2>{titre}</h2>
            <p>Modifié : {formaterDate(dateModif.seconds)}</p>
          </div>
          <IconButton onClick={gererMenu} className="modifier" aria-label="modifier" size="small">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-contextuel-dossier"
            anchorEl={eltAncrage}
            open={ouvertMenu}
            onClose={gererFermerMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={afficherFormulaireDossier}>Modifier</MenuItem>
            <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
          </Menu>
        </div>
        <div className="envers">
          <ButtonUnstyled onClick={() => setCarteActive(false)} className="tourner-carte" size="small">
            <CloseIcon />
          </ButtonUnstyled>
            {
              signets.map(
                (signet, position) => <a key={position} href={signet.adresse} target="_blank">{signet.titre}</a>
              )
            }
        </div>
      </div>
      
      <FrmDossier gererActionDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} />
    </article>
  );
}
