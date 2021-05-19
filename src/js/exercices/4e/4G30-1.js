import Exercice_Thales from '../3e/3G20-2.js'
import { context } from '../../modules/context.js'

// 4G30-1
export const titre = 'Calculer des longueurs avec la propriété de Thalès (MG32)'

export default function Thales4eme () {
  // Dans cette version, pas de configuration papillon reservée aux 3èmes.
  Exercice_Thales.call(this)
  this.titre = titre
  this.quatrieme = true
  context.isHtml ? this.spacing = 2 : this.spacing = 1
}
