import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, extraireRacineCarree, pgcd, calcul, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
import { fraction } from '../../modules/fractions.js'
import { choisiDelta } from '../../modules/fonctionsMaths.js'
export const interactifReady = false
export const interactifType = 'mathLive'
export const titre = 'Résoudre une équation du second degré à partir de la forme canonique'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export default function Resolutionavecformecanonique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Utiliser la forme canonique pour résoudre une équation du second degré : '
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (this.interactif) {
      this.consigne += '<br> '
    }
    const listeTypeDeQuestions = combinaisonListes([true, true, false], this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, p, b1, b2, c1, x1String, x2String, stringX1, stringX2, x1, x2, c, delta, alpha, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      [a, b, c] = choisiDelta(listeTypeDeQuestions[i])
      c1 = fraction(c, a)
      b1 = fraction(b, a)
      alpha = fraction(b, 2 * a)
      delta = b * b - 4 * a * c
      b2 = fraction(delta, 4 * a * a).simplifie() // terme b² dans l'expression a²-b²
      texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ .`
      texteCorr = `On veut résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0\\quad(1)$.`
      texteCorr += '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
      texteCorr += '<br>On commence par calculer le discriminant : $\\Delta = b^2-4ac$'
      texteCorr += `<br>$\\Delta = ${b}^2-4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${delta}$`

      // test des solutions
      if (delta < 0) {
        texteCorr += '<br>Le discriminant étant négatif, d\'après le cours, l\'équation n\'admet pas de solutions réelles.'
        texteCorr += '<br>On en déduit que $S=\\emptyset$'
      } else if (delta > 0) { // Cas des deux solutions :
        texteCorr += '<br>Le discriminant étant positif, d\'après le cours, l\'équation admet deux solutions réelles :'
        texteCorr += '<br>$x_1=\\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2=\\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
        texteCorr += `<br>$x_1=\\dfrac{-${ecritureParentheseSiNegatif(b)}-\\sqrt{${delta}}}{2\\times${ecritureParentheseSiNegatif(a)}}$ et $x_2=\\dfrac{-${ecritureParentheseSiNegatif(b)}+\\sqrt{${delta}}}{2\\times${ecritureParentheseSiNegatif(a)}}$`
        if (pgcd(Math.abs(b), Math.abs(calcul(2 * a))) === pgcd(extraireRacineCarree(delta)[0], Math.abs(calcul(2 * a)))) {
          p = pgcd(Math.abs(b), Math.abs(calcul(2 * a)))
        } else {
          p = 1
        }
        if (b2.estParfaite()) {
          x1 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie()
          x2 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie()).simplifie()
          if (a < 0) {
            x1String = x1.oppose().ecritureAlgebrique
            stringX1 = x1.ecritureAlgebrique
            x2String = x2.oppose().ecritureAlgebrique
            stringX2 = x2.ecritureAlgebrique
          } else {
            x1String = x1.ecritureAlgebrique
            stringX1 = x1.oppose().ecritureAlgebrique
            x2String = x2.ecritureAlgebrique
            stringX2 = x2.oppose().ecritureAlgebrique
          }
        } else {
          if (a < 0) {
            if (b < 0) {
              x1String = `+\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              stringX1 = `\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${calcul(-b / p)}}{${Math.abs(calcul(2 * a / p))}}`
              x2String = `+\\dfrac{${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              stringX2 = `\\dfrac{${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
            } else {
              x2String = `+\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${b}}{${Math.abs(calcul(2 * a / p))}}`
              stringX2 = `\\dfrac{${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              x1String = `-\\dfrac{${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              stringX1 = `\\dfrac{${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
            }
          } else {
            if (b < 0) {
              x1String = `-\\dfrac{${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              stringX1 = `\\dfrac{${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              x2String = `-\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              stringX2 = `\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
            } else {
              x1String = `-\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${b}}{${Math.abs(calcul(2 * a / p))}}`
              stringX1 = `\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${b}}{${Math.abs(calcul(2 * a / p))}}`
              x2String = `+\\dfrac{${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              stringX2 = `\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
            }
          }
        }
        texteCorr += `<br> d'où après simplification : $x_1 = ${stringX1}$ et  $x_2 = ${stringX2}$`
        texteCorr += `<br> $S =\\left\\{${stringX2};${stringX1}\\right\\}$`
      } else { // cas de delta  = 0
        // pour l'instant pas de delta nul avec choisiDelta
      }

      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
