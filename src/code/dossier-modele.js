import { bdFirestore } from "./init";
import { getDocs, query, orderBy, collection, addDoc, Timestamp, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

/**
 * Obtenir tous les dossiers d'un utilisateur tries par date de modification descendante
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecte
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque complete
 */
export async function lireTout(idUtilisateur){
    return getDocs(query(collection(bdFirestore, 'signets', idUtilisateur, 'dossiers'), orderBy("dateModif", "desc"))).then(
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

/**
 * Supprimer un dossier pour l'utilisateur connecte
 * @param {string} uid id Firebase Auth de l'utilisateur connecte
 * @param {string} idDossier id du document correspondant au dossier a supprimer
 * @returns {Promise<void>} Promesse contenant rien
 */
export async function supprimer(uid, idDossier){
    const refDoc = doc(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    return await deleteDoc(refDoc);
}

/**
 * Modifier les proprietes d'un dossier pour l'utilisateur connecte
 * 
 */
export async function modifier(uid, idDossier, objetModif){
    objetModif.dateModif = Timestamp.now();
    const docRef = doc(bdFirestore, "signets", uid, "dossiers", idDossier);
    return await updateDoc(docRef, objetModif);
}