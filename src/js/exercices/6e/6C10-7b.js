import FabriqueAYohaku from './Yohaku.js'
export const titre = 'Yahoku multiplicatif niveau 1'
export const dateDePublication = '10/08/2022'
export { interactifReady, interactifType } from './Yohaku.js'
export default function FabriqueAYohaku6B () {
  FabriqueAYohaku.call(this)
  this.sup = 10
  this.sup2 = 2
  this.sup3 = 2
  this.sup4 = false
  this.type = 'entiers'
  this.besoinFormulaireNumerique = false
  this.besoinFormulaire2Numerique = false
  this.besoinFormulaire3Numerique = false
  this.besoinFormulaire4CaseACocher = ['Avec aide (la présence d\'une valeur impose une solution unique)', false]
}
