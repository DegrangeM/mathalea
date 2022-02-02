import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, choice, shuffle } from '../../modules/outils.js'
import { mathalea2d, courbe2, repere2 } from '../../modules/2d.js'
export const titre = 'Lecture graphique de limites'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '01/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Mathieu Degrange
 * Référence
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      texte = `Déterminer graphiquement les limites de la fonction $${['f', 'g', 'h', 'p', 'q', 'r', 's'][i] % 7}$ dont la représentation graphique est donnée ci-dessous.<br>`
      texteCorr = ''

      console.time()

      // On détermine aléatoirement les abscisses avec une discontinuité
      // Étape n°1 : On liste les possibilités
      let x = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      // Étape n°2 : On mélange les possibilités
      x = shuffle(x)
      // Étape n°3 : On choisi un nombre aléatoire de discontinuités
      // Il pourra y avoir de 0 à 3 discontinuité sauf pour la première question où il y aura toujours au moins une discontinuité
      x = x.slice(0, choice([i !== 0 ? 0 : 2, 1, 2, 3]))
      // Étape n°4 : On tri les discontinuités dans l'ordre croissant
      x = x.sort((a, b) => a - b) // Il faut passer une fonction de tri car par défaut javascript tri par code unicode donc -2 < -4

      const id = x.slice() // identifiant de la question qui dépant des données aléatoires

      const f = []
      const monRepere = repere2()

      if (x.length !== 0) {
        // Calcul entre xmin et x[0]
        {
          const lim1 = randint(-5, 5) // lim x->-oo
          const lim2 = choice([-1, 1]) // lim x->x[0]- (-1 pour -oo, +1 pour +oo)
          const g = t => lim1 + lim2 * 1 / (t - x[0])
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: -10, xMax: x[0] - 0.5, yMin: -10, yMax: 10, step: 0.1 }))
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: x[0] - 0.5, xMax: x[0] - 0.001, yMin: -10, yMax: 10, step: 0.001 }))
          id.push(lim1, lim2)
        }

        for (let k = 0; k < x.length - 1; k++) {
          // Calcul entre chaque borne
          const lim1 = choice([-1, 1]) // lim x->x[k]+ (-1 pour -oo, +1 pour +oo)
          const lim2 = choice([-1, 1]) // lim x->x[k+1]- (-1 pour -oo, +1 pour +oo)
          const c = randint(-3, 3)
          const g = t => lim1 * 1 / (t - x[k]) + c + lim2 * 1 / (t - x[k + 1])
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: x[k] + 0.001, xMax: x[k] + 0.5, yMin: -10, yMax: 10, step: 0.001 }))
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: x[k] + 0.5, xMax: x[k + 1] - 0.5, yMin: -10, yMax: 10, step: 0.1 }))
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: x[k + 1] - 0.5, xMax: x[k + 1] - 0.001, yMin: -10, yMax: 10, step: 0.001 }))
          id.push(lim1, lim2 /*, c */)
        }

        // Calcul entre x[n] et xmax
        {
          const lim1 = choice([-1, 1]) // lim x->x[n]+ (-1 pour -oo, +1 pour +oo)
          const lim2 = randint(-5, 5) // lim x->+oo
          const g = t => lim1 * 1 / (t - x[x.length - 1]) + lim2
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: x[x.length - 1] + 0.001, xMax: x[x.length - 1] + 0.5, yMin: -10, yMax: 10, step: 0.001 }))
          f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: x[x.length - 1] + 0.5, xMax: 10, yMin: -10, yMax: 10, step: 0.1 }))
          id.push(lim1, lim2)
        }
      } else {
        // f(x) = ax^3 + bx² + cx + d
        // f(-10) = l
        // f(10) = L
        // f'(-10) = 0
        // f'(10) = 0
        // f'(x) = 3ax^2 + 2bx + c
        // f'(10) = 300a + 20b + c
        // f'(-10) = 300a - 20b + c
        // 300a + 20b = 300a - 20b donc b = 0
        // 300a + c = 0 donc c = -300a
        // f(10) = 1000a - 3000a + d = -2000a + d = l
        // f(-10) = -1000a + 3000a + d = 2000a + d = L
        // d=(l+L)/2
        // a = (L-l)/4000
        // c = -3/40*(L-l)
        const lim1 = choice([-1, 1]) // lim x->x[n]+ (-1 pour -oo, +1 pour +oo)
        const lim2 = randint(-5, 5) // lim x->+oo
        const a = (lim1 - lim2) / 4000
        const c = -3 / 40 * (lim1 - lim2)
        const d = (lim1 + lim2) / 2
        const g = t => a * t * t * t + c * t + d
        f.push(courbe2(g, { color: 'red', repere: monRepere, xMin: -10, xMax: 10, yMin: -10, yMax: 10, step: 0.001 }))
        id.push('∅', lim1, lim2)
      }

      texte += mathalea2d({ xmin: -15, ymin: -10, xmax: 15, ymax: 10, scale: 1 }, monRepere, ...f)

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, id)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Ici, a est utilisée mais pas b, c et d, alors supprime ces trois derniers !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
      console.timeEnd()
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
