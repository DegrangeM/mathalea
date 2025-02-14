import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire le symétrique d’un point par symétrie centrale'
export const dateDeModificationImportante = '14/11/2021'
/**
 * Référence 6G11-2
 * @author Jean-Claude Lhote
 */
export default function SymetrieCentralePoint () {
  ConstruireParSymetrie.call(this)
  this.figure = false
  this.sup = 5
  this.besoinFormulaireNumerique = false
}
