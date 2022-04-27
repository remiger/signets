import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function FrmDossier({ouvert, setOuvert, gererActionDossier, id=null, titre_p='', couleur_p='#000', couverture_p=''}) {
    const [titre, setTitre] = useState(titre_p);
    const [couverture, setCouverture] = useState(couverture_p);
    const [couleur, setCouleur] = useState(couleur_p);

    function viderEtFermerFrm() {
        // Il faut reinitialiser les etats des valeurs de formulaire car sinon
        // les dernieres valeurs saisies seront sauvegardees dans les 'etats' du composant
        setTitre(titre_p);
        setCouverture(couverture_p);
        setCouleur(couleur_p);
        setOuvert(false);
    };

    function gererSoumettre(){
        // Code qui gere l'ajout dans Firestore
        if(titre.search(/[a-z]+/i) !== -1){
          gererActionDossier(id, titre, couverture, couleur);

          // on doit lappeler uniquement lorsquon ajoute un nouveau dossier
          if(id === null){
            viderEtFermerFrm();
          }
          setOuvert(false);
        }
    }

  return (
    <div>
      <Dialog open={ouvert} onClose={viderEtFermerFrm}>
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
          <Button onClick={viderEtFermerFrm}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
