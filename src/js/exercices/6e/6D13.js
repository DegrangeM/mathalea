import { context } from '../../modules/context'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, contraindreValeur, listeQuestionsToContenu, randint, sp, texteEnCouleur } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Convertir en min vers h et min ou en s vers min et s'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

export default function ConversionHeuresMinutesOuMinutesEtSecondes (can = false) {
  Exercice.call(this)
  this.nbQuestions = 5
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.sup = 1
  this.nouvelleVersion = function () {
    this.sup = contraindreValeur(1, 2, this.sup, 1)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    for (let i = 0, cpt = 0, a, b, d, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 4)
      b = randint(10, 59)
      d = calcul(a * 60 + b)
      if (this.sup === 1) {
        texte = `Convertir $${d}$ minutes en heures(h) et minutes(min) :` + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: sp(5), texteApres: ' h ' }) +
        ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: sp(5), texteApres: ' min ' })
      } else {
        texte = `Convertir $${d}$ secondes en minutes(min) et secondes(s) :` + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: sp(5), texteApres: ' min ' }) +
        ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: sp(5), texteApres: ' s ' })
      }
      if (can) {
        if (this.sup === 1) {
          texteCorr = texteEnCouleur(`
    <br> Mentalement : <br>
On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$min $= ${Math.floor(d / 60)}$h$${d % 60}$min.`) + '<br>'
        } else {
          texteCorr = texteEnCouleur(`
          <br> Mentalement : <br>
      On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
      Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$s $= ${Math.floor(d / 60)}$min$${d % 60}$s.`) + '<br>'
        }
      } else {
        if (this.correctionDetaillee) {
          texteCorr = `On doit effectuer la division euclidienne de ${d} par 60 car il y a 60 minutes dans une heure.<br>Le quotient entier donne le nombre d'heures et le reste enter donne le nombre de minutes.<br>`
        } else {
          texteCorr = ''
        }
      }
      if (this.sup === 1) {
        texteCorr += `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min.`
      } else {
        texteCorr += `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ s = ${a}min ${b}s.`
      }
      if (this.questionJamaisPosee(i, a, b, d)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (context.isAmc) {
          if (this.sup === 1) {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: 'Heure(s)',
                      valeur: a,
                      param: {
                        digits: 1,
                        decimals: 0,
                        signe: false,
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
                      texte: 'Minute(min)',
                      valeur: b,
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
                        approx: 0
                      }
                    }
                  }]
                }
              ]
            }
          } else {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: 'Minutes(min)',
                      valeur: a,
                      param: {
                        digits: 1,
                        decimals: 0,
                        signe: false,
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
                      texte: 'Secondes(s)',
                      valeur: b,
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
                        approx: 0
                      }
                    }
                  }]
                }
              ]
            }
          }
        } else {
          setReponse(this, 2 * i, a)
          setReponse(this, 2 * i + 1, b)
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type d\'unité de départ', 2, '1 : Minutes\n2 : Secondes']
}
