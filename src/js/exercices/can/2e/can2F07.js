import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenuSansNumero, sp, choice } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../../modules/gestionInteractif.js'
import { tableauDeVariation, mathalea2d } from '../../../modules/2d.js'
export const titre = 'Lire les extremums dans un tableau de variations'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '21/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function ExtremumsTableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  this.listePackages = ['tkz-tab']
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let question1, correction1, ligne1
    const x1 = randint(-20, 10)
    const x2 = randint(x1 + 1, 15)
    const x3 = randint(x2 + 1, 20)
    const x4 = randint(x3 + 1, 25)
    const y1 = randint(-10, 10)
    const y2 = randint(y1 - 10, y1 - 1)
    const y3 = randint(y2 + 1, y2 + 10, y1)
    const y4 = randint(y3 - 10, y3 - 1, y2)
    const M = Math.max(y1, y2, y3, y4)
    const m = Math.min(y1, y2, y3, y4)
    const choix = randint(1, 2)
    if (choix === 1) {
      ligne1 = ['Var', 10, `+/$${y1}$`, 10, `-/$${y2}$`, 10, `+/$${y3}$`, 10, `-/$${y4}$`, 10]
    } else {
      ligne1 = ['Var', 10, `-/$${-y1}$`, 10, `+/$${-y2}$`, 10, `-/$${-y3}$`, 10, `+/$${-y4}$`, 10]
    }
    question1 = `Voici le tableau de variations d'une fonction $f$ définie sur $[${x1};${x4}]$ :<br>`
    question1 += mathalea2d({ xmin: -0.5, ymin: -7.5, xmax: 30, ymax: 0.1, scale: 0.6, zoom: 1.2 }, tableauDeVariation({
      tabInit: [
        [
          // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
          ['$x$', 3, 8], ['$f(x)$', 4, 20]
        ],
        // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
        [`$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10, `$${x4}$`, 10]
      ],
      // tabLines ci-dessous contient les autres lignes du tableau.
      tabLines: [ligne1],
      colorBackground: '',
      espcl: 3, // taille en cm entre deux antécédents
      deltacl: 1.5, // distance entre la bordure et les premiers et derniers antécédents
      lgt: 3, // taille de la première colonne en cm
      hauteurLignes: [15, 15]
    })) + '<br>'
    if (choice([true, false])) {
      question1 += '   Le maximum de $f$ est  : '
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ajouteChampTexteMathLive(this, 0, 'largeur15 inline')
      question1 += '<br> Il est atteint en $x=$'
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ajouteChampTexteMathLive(this, 1, 'largeur15 inline')

      if (choix === 1) {
        if (M === y1) {
          correction1 = `Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\leqslant ${y1}$, c'est-à-dire  $f(x)\\leqslant f(${x1})$.<br>
      Ainsi, le maximum de $f$ est $${y1}$. Il est atteint en $x=${x1}$.`
          setReponse(this, 0, y1)
          setReponse(this, 1, x1)
        } else {
          correction1 = `Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\leqslant ${y3}$, c'est-à-dire  $f(x)\\leqslant f(${x3})$.<br>
      Ainsi, le maximum de $f$ est $${y3}$. Il est atteint en $x=${x3}$.  `
          setReponse(this, 0, y3)
          setReponse(this, 1, x3)
        }
      } else {
        if (m === y2) {
          correction1 = `<br>Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\leqslant ${-y2}$, c'est-à-dire  $f(x)\\leqslant f(${x2})$.<br>
        Ainsi, le maximum de $f$ est $${-y2}$. Il est atteint en $x=${x2}$. `
          setReponse(this, 0, -y2)
          setReponse(this, 1, x2)
        } else {
          correction1 = `<br>Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\leqslant ${-y4}$, c'est-à-dire  $f(x)\\leqslant f(${x4})$.<br>
        Ainsi, le maximum de $f$ est $${-y4}$. Il est atteint en $x=${x4}$.  `
          setReponse(this, 0, -y4)
          setReponse(this, 1, x4)
        }
      }
    } else {
      question1 += '   Le minimum de $f$ est  : '
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ajouteChampTexteMathLive(this, 0, 'largeur15 inline')
      question1 += '<br> Il est atteint en $x=$'
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ajouteChampTexteMathLive(this, 1, 'largeur15 inline')

      if (choix === 1) {
        if (m === y2) {
          correction1 = `Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\geqslant ${y2}$, c'est-à-dire  $f(x)\\geqslant f(${x2})$.<br>
          Ainsi, le minimum de $f$ est $${y2}$. Il est atteint en $x=${x2}$.`
          setReponse(this, 0, y2)
          setReponse(this, 1, x2)
        } else {
          correction1 = `Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\geqslant ${y4}$, c'est-à-dire  $f(x)\\geqslant f(${x4})$.<br>
          Ainsi, le minimum de $f$ est $${y4}$. Il est atteint en $x=${x4}$.  `
          setReponse(this, 0, y4)
          setReponse(this, 1, x4)
        }
      } else {
        if (M === y1) {
          correction1 = `Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\geqslant ${-y1}$, c'est-à-dire  $f(x)\\geqslant f(${x1})$.<br>
          Ainsi, le minimum de $f$ est $${-y1}$. Il est atteint en $x=${x1}$. `
          setReponse(this, 0, -y1)
          setReponse(this, 1, x1)
        } else {
          correction1 = `Pour tout réel $x$ de $[${x1};${x4}]$, on a  $f(x)\\geqslant ${-y3}$, c'est-à-dire  $f(x)\\geqslant f(${x3})$.<br>
          Ainsi, le minimum de $f$ est $${-y3}$. Il est atteint en $x=${x3}$.  `
          setReponse(this, 0, -y3)
          setReponse(this, 1, x3)
        }
      }
    }
    this.listeQuestions.push(question1)
    this.listeCorrections.push(correction1)
    listeQuestionsToContenuSansNumero(this)
  }
}
