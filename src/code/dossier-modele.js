import { bdFirestore } from "./init";
import { getDocs, collection } from "firebase/firestore";

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