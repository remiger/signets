import { bdFirestore } from "./init";
import { doc, updateDoc } from "firebase/firestore";

/**
 * Ajoute un signet en recreant le tableau des top 3 dans le dossier identifie
 * @param {string} uid Identifiant Firebase Auth de lutilisateur connecte
 * @param {string} idDossier Identifiant Firestore du dossier auquel on ajoute le signet
 * @param {Object[]} derniers3 Tableau des signets representant les derniers 3 signets a conserver
 * @returns {Promise<void>} Promesse sans parametre une fois que la requete Firestore est completee
 */
export async function creer(uid, idDossier, derniers3){
    // reference au document dans laquelle on veut ajouter le signet
    let refDoc = doc(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    return await updateDoc(refDoc, {top3: derniers3});
}