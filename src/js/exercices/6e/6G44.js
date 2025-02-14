import NombreDeFacesEtDAretes from '../can/6e/can6G06.js'
export const titre = 'Compter les arêtes et les faces'
export { interactifReady, interactifType, amcReady, amcType } from '../can/6e/can6G06.js'

/*!
 * @author Jean-Claude Lhote
 * Créé le 7/11/2021
 * Référence 6G44 clone à 4 question de can6G06
 */
export default function NombreDeFacesEtDAretesExo () {
  NombreDeFacesEtDAretes.call(this)
  this.titre = titre
  this.nbQuestions = 4
}
