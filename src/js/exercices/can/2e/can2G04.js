import Exercice from '../../Exercice.js'
import { randint, choice, texNombrec, ecritureParentheseSiNegatif, texteEnCouleur, creerNomDePolygone } from '../../../modules/outils.js'
export const titre = 'Calculer les coordonnées du milieu'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can2G04
 * Date de publication sptembre 2021
*/
export default function CalculCoordonneesMilieu () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d
    const nom = creerNomDePolygone(2, 'PQ')
    switch (choice(['b', 'b', 'a', 'b', 'c'])) { //,
      case 'a':
        a = randint(1, 6)
        b = randint(3, 5)
        c = randint(2, 9)
        d = randint(1, 10)
        this.question = `Dans un repère du plan, on donne $${nom[0]}(${a};${c})$ et $${nom[1]}(${b};${d})$.<br>
        Déterminer les coordonnées du milieu de $[${nom[0] + nom[1]}]$ sous forme décimale.`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Les coordonnées du milieu sont  données par : 
        $\\left(\\dfrac{${a}+${b}}{2};\\dfrac{${c}+${d}}{2}\\right)=
        \\left(\\dfrac{${texNombrec(a + b)}}{2};\\dfrac{${texNombrec(c + d)}}{2}\\right)=
        (${texNombrec((a + b) / 2)};${texNombrec((c + d) / 2)})$<br>`
        this.correction += texteEnCouleur(` Mentalement : <br>
       On calcule la moyenne des abscisses et des orodonnées des deux points.
         `)
        this.reponse = `(${texNombrec((a + b) / 2)};${texNombrec((c + d) / 2)})`
        break
      case 'b' :
        a = randint(-9, 9, 0)
        b = randint(-9, 9, 0)

        this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a};${b})$.<br>
        Déterminer les coordonnées du milieu de $[O${nom[0]}]$ sous forme décimale.`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Comme les coordonnées du point $O$ sont $(0;0)$, les coordonnées du milieu sont  données par : 
        $\\left(\\dfrac{0+${ecritureParentheseSiNegatif(a)}}{2};\\dfrac{0+${ecritureParentheseSiNegatif(b)}}{2}\\right)
        =(${texNombrec((a) / 2)};${texNombrec((b) / 2)})$<br>`
        this.correction += texteEnCouleur(` Mentalement : <br>
       Puisque le premier point est l'orogine du repère, les coordonnées du milieu sont données par la moitié de l'abscisse et de l'ordonnée du deuxième point.
         `)
        this.reponse = `(${texNombrec((a) / 2)};${texNombrec((b) / 2)})`
        break
      case 'c':
        a = randint(-9, 9, 0)
        b = randint(-9, 9, 0)
        this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a};${b})$.<br>
        Déterminer les coordonnées du point $${nom[1]}$ de façon que $O$ soit le milieu de $[${nom[0]}${nom[1]}]$.<br>`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Les points $${nom[0]}$ et $${nom[1]}$ ont des coordonnées oppsées (faites un petit dessin pour représenter la situation), donc $${nom[1]}(${texNombrec(-a)};${texNombrec(-b)})$`
        this.reponse = `(${texNombrec(-a)};${texNombrec(-b)})`
        break
    }
  }
}
