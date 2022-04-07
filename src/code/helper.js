/**
 * Retourner une date dans le format francais suivant:
 * 5 novembre 2021
 * @param {Number} tsSecondes timestamp en secondes
 * @returns {String} Chaine representant le timestamp dans le format specifie
 */
export function formaterDate(tsSecondes){
    let dateJS = new Date(tsSecondes*1000);
    let nomsDesMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    return `${dateJS.getDate()} ${nomsDesMois[dateJS.getMonth()]} ${dateJS.getFullYear()}`
}