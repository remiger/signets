import './Dossier.scss'; 
import ModificationDossier from './ModificationDossier';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import couvertureDefaut from '../images/couverture-defaut.jpg';
import { formaterDate } from '../code/helper';
import { useState } from 'react';

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier, modifierDossier}) {
  // Etat du menu contextuel
  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvertMenu = Boolean(eltAncrage);

  // Etat du formulaire de modification
  const [ouvertFrm, setOuvertFrm] = useState(false);
  const ouvertModif = Boolean(ouvertFrm);

  function gererMenu(event){
    setEltAncrage(event.currentTarget);
  };

  function gererFermerMenu(){
    setEltAncrage(null);
  };

  function gererFormulaireModifier(){
    // Ouvrir le formulaire de modification du dossier
    setOuvertFrm(true);

    // Fermer le menu
    gererFermerMenu();
  };
  
  function gererSupprimer(){
    // Appeler la fonction de ListeDossiers qui gere la suppression dans Firestore
    supprimerDossier(id);

    // Fermer le menu
    gererFermerMenu();
  };

  // Tester si l'URL dans la variable couverture est valide
  let urlCouverture;
  try{
    urlCouverture = new URL(couverture);
  } 
  catch(e){
    couverture = couvertureDefaut;
  }

  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
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
        <MenuItem onClick={gererFormulaireModifier}>Modifier</MenuItem>
        <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
      </Menu>
      <ModificationDossier modifierDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} />
    </article>
  );
}
