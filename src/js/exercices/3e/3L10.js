import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
export const titre = 'Donner l’opposé d’une expression'

/**
 * Donner l'opposé d'une expression.
 *
 *
 * @author Rémi Angot
 * 3L10
 */
export default function OpposeExpression () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Développer et réduire les expressions suivantes.'
  this.spacing = context.isHtml ? 3 : 2
  this.spacing = context.isHtml ? 3 : 2
  this.nbQuestions = 6
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = ['-(ax+b)', '-(ax2+bx+c)']
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, c, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      c = randint(-11, 11, 0)
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      switch (listeTypeDeQuestions[i]) {
        case '-(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}x+(${b})`
          )})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
            i + 1
          )}}=${printlatex(`${-a}*x+(${-b})`)}$`
          break
        case '-(ax2+bx+c)':
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}x^2+(${b})x+(${c})`
          )})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
            i + 1
          )}}=${printlatex(`${-a}x^2+(${-b})x+(${-c})`)}$`
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif']
}
