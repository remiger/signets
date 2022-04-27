import { bdFirestore } from "./init";
import { getDocs, query, orderBy, collection, addDoc, Timestamp, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function creer(uid, idDossier, url){
    // reference au document dans laquelle on veut ajouter le signet
    let coll = collection(bdFirestore, 'signets', uid, 'dossiers', idDossier);

    //ajout du dossier avec addDoc : retourne une promesse contenant une reference firestore au document ajoute
    let refDoc = await addDoc(coll, dossier);

    return await getDoc(refDoc);
}