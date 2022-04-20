import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function ModificationDossier({ouvert, setOuvert, modifierDossier, id, titre_p, couleur_p, couverture_p}) {
    const [titre, setTitre] = useState(titre_p);
    const [couverture, setCouverture] = useState(couverture_p);
    const [couleur, setCouleur] = useState(couleur_p);

    const gererOuvrir = () => {
        setOuvert(true);
    };

    const gererFermer = () => {
        // Il faut reinitialiser les etats des valeurs de formulaire car sinon
        // les dernieres valeurs saisies seront sauvegardees dans les 'etats' du composant
        setOuvert(false);
    };

    const gererAnnuler = () => {
      setTitre(titre_p);
      setCouverture(couverture_p);
      setCouleur(couleur_p);
      gererFermer();
    }

    function gererSoumettre(){
        console.log("test");
        // Code qui gere l'ajout dans Firestore
        if(titre.search(/[a-z]{2,}/i) !== -1){
          modifierDossier(id, titre, couverture, couleur);
          gererFermer();
        }
    }

  return (
    <div>
      <Dialog open={ouvert} onClose={gererAnnuler}>
        <DialogTitle>Modifier ce dossier</DialogTitle>
        <DialogContent>
            {/* Titre du dossier */}
            <TextField
                autoFocus
                margin="dense"
                id="titre"
                label="Titre du dossier"
                type="text"
                fullWidth
                variant="standard"
                onChange={evt => setTitre(evt.target.value)}
                value={titre}
            />
            {/* URL de l'image */}
            <TextField
                margin="dense"
                id="couverture"
                label="Image couverture du dossier"
                type="url"
                fullWidth
                variant="standard"
                style={{marginBottom: "1.5rem"}}
                onChange={evt => setCouverture(evt.target.value)}
                value={couverture}
            />
            {/* Choix de couleur */}
            <TwitterPicker 
                triangle='hide'
                color={couleur}
                colors={["#090", "#900", "#009", "#880", "#F03", "#130", "#04B"]}
                width="auto"
                onChangeComplete={(couleur, evt) => setCouleur(couleur.hex)}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererAnnuler}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
