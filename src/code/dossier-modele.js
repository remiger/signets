import { bdFirestore } from "./init";
import { getDocs, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";

/**
 * Obtenir tous les dossiers d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecte
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque complete
 */
export async function lireTout(idUtilisateur){
    return getDocs(collection(bdFirestore, 'signets', idUtilisateur, 'dossiers')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))        
    )
}

export async function creer(idUtilisateur, dossier){
    // On ajoute dateModif a l'objet
    dossier.dateModif = Timestamp.now();
    let coll = collection(bdFirestore, 'signets', idUtilisateur, 'dossiers');
    let refDoc = await addDoc(coll, dossier);
    return await getDoc(refDoc);
}