import { authFirebase, authGoogle } from '../code/init';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import { bdFirestore } from '../code/init';

/**
 * Ouvre une connexion Firebase (avec Google)
 */
export function connexion(){
    signInWithPopup(authFirebase, authGoogle);
}


/**
 * Ferme la connexion Firebase Auth 
 */
export function deconnexion(){
    authFirebase.signOut();
}

/**
 * Observer la connexion Firebase Auth et mettre a jour letat 'utilisateur' a chaque changment detecte (par exemple connexion/deconnexion)
 * @param {Function} mutateurEtatUtilisateur reference a la fonction 'setter' de l'etat utilisateur
 */

export function observerEtatConnexion(mutateurEtatUtilisateur){
    onAuthStateChanged(authFirebase, 
        user => {
            if(user){
                // Sauvegarder le profil dans Firestore
                setDoc(doc(bdFirestore, 'signets', user.uid), {nom: user.displayName, courriel: user.email}, {merge: true});
            }
            mutateurEtatUtilisateur(user)
        }
    )
}
  