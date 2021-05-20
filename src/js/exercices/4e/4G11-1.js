import Pavages_et_transformations from '../6e/_Pavages_et_transformations.js'

export const titre = 'Trouver l’image d’une figure par une translation dans un pavage'

/**
 * Exercice en html seulement. Translations dans un pavage.
 * @author Jean-Claude Lhote
 * référence 4G11-1
 */
export default function Pavages_et_translation() {
  Pavages_et_transformations.call(this);
  this.titre = titre;
  this.sup = 3;
  this.besoinFormulaireNumerique = false;
}
