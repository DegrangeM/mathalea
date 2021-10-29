import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, texFraction } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
export const titre = 'Différentes écritures des nombres décimaux'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Compléter des égalités sur les nombres décimaux
 * * n/100 = .../10 + .../100
 * * n/100 = .../100 + .../10
 * * .../100 = u+ d/10 + c/100
 * * u = .../10
 * * u = .../100
 * * n/10 = ... + .../10 + .../100
 * @author Rémi Angot
 * 6N23-1
 */
export default function ExerciceDifferentesEcrituresNombresDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Compléter l'égalité puis donner l'écriture décimale."
  this.spacing = 2
  this.spacingCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestions
    const a = context.isAmc
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6]
    let listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    if (this.nbQuestions === 3) listeTypeDeQuestions = combinaisonListes([choice([1, 2, 6]), 3, choice([4, 5])], this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      const u = randint(2, 9) // chiffre des unités
      const d = randint(1, 9) // chiffre des dixièmes
      const c = randint(1, 9) // chiffre des centièmes
      const n = 100 * u + 10 * d + c
      let ecritureDecimale
      switch (typesDeQuestions) {
        case 1: // n/100 = .../10 + .../100
          ecritureDecimale = texNombre(calcul(u + d / 10 + c / 100))
          texte = `$${texFraction(n, '100')}=${a ? 'a' : '\\ldots\\ldots'}+${texFraction(
            a ? 'b' : '',
            10
          )}+${texFraction(a ? 'c' : '', 100)}=${a ? 'd' : '\\ldots$'}$`
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
            d,
            '10'
          )}+${texFraction(c, '100')}=${ecritureDecimale}$`
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { multicols: true },
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: u,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: d,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'c',
                        valeur: c,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'd',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
        case 2: // n/100 = .../100 + .../10
          ecritureDecimale = texNombre(calcul(u + d / 10 + c / 100))
          texte = `$${texFraction(n, '100')}=${a ? 'a' : '\\ldots\\ldots'}+${texFraction(
            a ? 'b' : '',
            100
          )}+${texFraction(a ? 'c' : '', 10)}=${a ? 'd' : '\\ldots'}$`
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
            c,
            100
          )}+${texFraction(d, 10)}=${ecritureDecimale}$`
          if (context.isAmc) {
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: u,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: c,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'c',
                        valeur: d,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'd',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }

          break
        case 3: // .../100 = u+ d/10 + c/100
          ecritureDecimale = texNombre(calcul(u + d / 10 + c / 100))
          texte = `$${texFraction(a ? 'a' : '', '100')}=${u}+${texFraction(
            d,
            '10'
          )}+${texFraction(c, '100')}=${a ? 'b' : '\\ldots'}$`
          texteCorr = `$${texFraction(n, '100')}=${u}+${texFraction(
            d,
            '10'
          )}+${texFraction(c, '100')}=${ecritureDecimale}$`
          if (context.isAmc) {
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: n,
                        param: {
                          signe: false,
                          digits: 4,
                          decimals: 0
                        }
                      }
                    }
                  ]

                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: calcul(u + d / 10 + c / 100),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }

          break
        case 4: // u = .../10
          texte = `$${u}=${texFraction(a ? 'a' : '', '10')}$`
          texteCorr = `$${u}=${texFraction(10 * u, '10')}$`
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: calcul(10 * u),
                        param: {
                          signe: false,
                          digits: 3,
                          decimals: 0
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }

          break
        case 5: // u = .../100
          texte = `$${u}=${texFraction(a ? 'a' : '', '100')}$`
          texteCorr = `$${u}=${texFraction(100 * u, '10')}$`
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: calcul(100 * u),
                        param: {
                          signe: false,
                          digits: 3,
                          decimals: 0
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }

          break
        case 6: // n/10 = ... + .../10 + .../100
          ecritureDecimale = texNombre(calcul(n / 10))
          texte = `$${texFraction(n, 10)}=${a ? 'a' : '\\ldots\\ldots'}+${texFraction(a ? 'b' : '', 10)}+${texFraction(a ? 'c' : '', 100)}=${a ? 'd' : '\\ldots'}$`
          texteCorr = `$${texFraction(n, 10)}=${u * 10 + d}+${texFraction(
            c,
            10
          )}+${texFraction(0, 100)}=${ecritureDecimale}$`
          if (context.isAmc) {
            this.autoCorrection[i] = {
              options: { multicols: true },
              enonce: texte,
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: texteCorr,
                      reponse: {
                        texte: 'a',
                        valeur: calcul(u * 10 + d),
                        param: {
                          signe: false,
                          digits: 3,
                          decimals: 0
                        }
                      }
                    }
                  ]

                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'b',
                        valeur: c,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'c',
                        valeur: 0,
                        param: {
                          signe: false,
                          digits: 1,
                          decimals: 0
                        }
                      }
                    }
                  ]

                },
                {
                  type: 'AMCNum',
                  propositions: [
                    {
                      texte: '',
                      reponse: {
                        texte: 'd',
                        valeur: calcul(n / 10),
                        param: {
                          signe: false,
                          digits: 5,
                          decimals: 3
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
