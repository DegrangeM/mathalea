import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, ecritureParentheseSiNegatif, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Réduire une expression'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCHybride'
export const amcReady = true

/**
* Réduire des expressions lorsque c'est possible
*
* @author Rémi Angot
* 3L11-2
*/
export default function ReductionSiPossible () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Réduire les expressions suivantes, si cela est possible.'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles
    context.isAmc ? typesDeQuestionsDisponibles = ['ax+b', 'ax+bx', 'ax*b', 'b*ax', 'ax+b+cx+d', 'b+ax+d+cx', 'ax+b+x'] : typesDeQuestionsDisponibles = ['ax+b', 'ax+bx', 'ax+bx2', 'ax*b', 'b*ax', 'ax+b+cx+d', 'b+ax+d+cx', 'ax+b+x']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, coeffa, constb, a, b, c, d, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(-11, 11, 0)
      b = randint(-11, 11, [0, a])
      c = randint(-11, 11, [0])
      d = randint(-11, 11, 0)
      switch (listeTypeDeQuestions[i]) {
        case 'ax+b':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b})`)}$`
          texteCorr = texte
          reponse = printlatex(`${a}*x+(${b})`)
          coeffa = a
          constb = b
          break
        case 'ax+bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}=${printlatex(`${a + b}x`)}$`
          reponse = printlatex(`${a + b}x`)
          coeffa = a + b
          constb = 0
          break
        case 'ax+bx2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x^2)`)}$`
          texteCorr = texte
          reponse = printlatex(`${a}*x+(${b}*x^2)`)
          // celui-ci ne peut pas être choisi pour AMC
          break
        case 'ax*b':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x`)}\\times ${ecritureParentheseSiNegatif(b)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x`)}\\times ${ecritureParentheseSiNegatif(b)}=${printlatex(`${a * b}*x`)}$`
          reponse = printlatex(`${a * b}*x`)
          coeffa = a * b
          constb = 0
          break
        case 'b*ax':
          a = randint(1, 11)
          texte = `$${lettreDepuisChiffre(i + 1)}=${b}\\times ${printlatex(`${a}*x`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${b}\\times ${printlatex(`${a}*x`)}=${printlatex(`${b * a}*x`)}$`
          reponse = printlatex(`${b * a}*x`)
          coeffa = a * b
          constb = 0
          break
        case 'ax+b+cx+d':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b})+(${c})*x+(${d})`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b})+(${c})*x+(${d})`)}`
          if (b + d === 0) {
            if (a + c === 0) {
              texteCorr += '=0$'
              reponse = '0'
              coeffa = 0
              constb = 0
            } else {
              texteCorr += `=${printlatex(`${a + c}*x`)}$`
              reponse = printlatex(`${a + c}*x`)
              coeffa = a + c
              constb = 0
            }
          } else {
            if (a + c === 0) {
              texteCorr += `=${b + d}$`
              reponse = `${b + d}`
              constb = b + d
              coeffa = 0
            } else {
              texteCorr += `=${printlatex(`${a + c}*x+(${b + d})`)}$`
              reponse = printlatex(`${a + c}*x+(${b + d})`)
              coeffa = a + c
              constb = b + d
            }
          }
          break
        case 'b+ax+d+cx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${b}+(${a})*x+(${d})+(${c})*x`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${b}+(${a})*x+(${d})+(${c})*x`)}`
          if (b + d === 0) {
            if (a + c === 0) {
              texteCorr += '=0$'
              reponse = '0'
              coeffa = 0
              constb = 0
            } else {
              texteCorr += `=${printlatex(`${a + c}*x`)}$`
              coeffa = a + c
              constb = 0
            }
          } else {
            if (a + c === 0) {
              texteCorr += `=${b + d}$`
              reponse = `${b + d}$`
              coeffa = 0
              constb = b + d
            } else {
              texteCorr += `=${printlatex(`${a + c}*x+(${b + d})`)}$`
              reponse = printlatex(`${a + c}*x+(${b + d})`)
              coeffa = a + c
              constb = b + d
            }
          }
          break
        case 'ax+b+x':
          a = randint(-11, 11, [0, -1])
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b})+x`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b})+x`)}=${printlatex(`${a + 1}*x+(${b})`)}$`
          reponse = printlatex(`${a + 1}*x+(${b})`)
          coeffa = a + 1
          constb = b
          break
      }
      if (!context.isAmc) {
        setReponse(this, i, reponse)
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: ' $=$' })
      } else {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [{
                texte: texteCorr,
                statut: 3
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'valeur de $a$ dans $ax+b$',
                  valeur: [coeffa],
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'valeur de $b$ dans $ax+b$',
                  valeur: [constb],
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            }
          ]
        }
      }

      if (this.questionJamaisPosee(i, a, b, c, d)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
