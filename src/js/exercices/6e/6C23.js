import CalculsFractionsSimples from '../c3/c3C23.js'

export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Additionner ou soustraire des fractions de même dénominateur'

export default function ExerciceAdditionnerFractions6e () {
  CalculsFractionsSimples.call(this)
  this.sup = 4
  this.besoinFormulaireNumerique = false
}
