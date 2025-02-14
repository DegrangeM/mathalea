import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lampeMessage, prenomF, prenomM, calcul, texPrix, texteEnCouleurEtGras, numAlpha, nombreDeChiffresDansLaPartieDecimale, sp } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Augmenter ou diminuer d’un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Description didactique de l'exercice
 * augmenter ou diminuer un prix d'un pourcentage,
 * le calcul intermédiaire du montant de l'augmentation ou de la baisse est demandé
 * Trois niveaux :
 * - 1 valeurs entières et 10%, 20%...;
 * - 2 valeurs entières et 13%, 28%...;
 * - 3 valeurs décimale comme 13,5%...;
 * @author Laurence CANDILLE
 * Référence 6P13
 * Date de Publication : 23/07/2021
 * Relecture : Novembre 2021 par EE
*/
export default function AugmenterEtReduireDunPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactifType = 'mathLive'
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function () {
    const n = parseInt(this.sup) - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.introduction = (this.interactif && context.isHtml)
      ? lampeMessage({
        titre: 'Calculatrice autorisée.',
        texte: 'Ecrire les réponses dans les cases sans arrondir, ne pas préciser "€" ni "euros" ...',
        couleur: 'nombres'
      })
      : ''
    const typeQuestionsDisponibles = ['augmentation', 'réduction'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let billet, loyer // prix du billet, loyer de l'appart
    let pr, pa // pourcentage réduction, pourcentage augmentation
    let mr, ma // montant réduction, montant augmentation
    let final1, final2 // prix final 1 , prix final 2
    let prenom1, prenom2 // choix aleatoire des prenoms
    function nombreDecimales (n) {
      if (n === 0) {
        pr = randint(1, 6) * 10
        pa = randint(1, 3) * 10
      }
      if (n === 1) {
        pr = randint(21, 39, [30])
        pa = randint(2, 9)
      }
      if (n === 2) {
        pr = calcul((randint(40, 60) * 100 + randint(1, 9) * 10) / 100)
        pa = calcul((randint(1, 9) * 10 + randint(1, 9)) / 10)
      }
    }

    for (let i = 0, repa, repb, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      prenom1 = prenomM()
      prenom2 = prenomF()
      billet = randint(100, 200)
      loyer = randint(501, 899, [600, 700, 800])

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'réduction':
          nombreDecimales(n)
          mr = calcul(pr * billet / 100)
          final1 = calcul(billet - mr)
          texte = `Un billet d'avion coûte ${billet} €. ${prenom1} bénéficie d'une réduction de $${pr} \\%$.<br>`
          texte += (this.interactif && context.isHtml) ? `${numAlpha(0)} Le montant de la réduction est :` : `${numAlpha(0)} Calculer le montant de la réduction.`
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: ' €' }) : ''
          texte += '<br>'
          if (!context.isAmc) setReponse(this, 2 * i, mr, { formatInteractif: 'calcul' })
          texte += (this.interactif && context.isHtml) ? `${numAlpha(1)} Finalement, ${prenom1} paiera son billet :` : `${numAlpha(1)} Calculer le prix du billet de ${prenom1}.`
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline', { texteApres: ' €' }) : ''
          texteCorr = `${numAlpha(0)} Le montant de la réduction est :     $${billet} € \\times ${pr} \\div 100$` + sp(1)
          texteCorr += nombreDeChiffresDansLaPartieDecimale(mr) < 3 ? '$ =$' : '$ \\approx$'
          texteCorr += texteEnCouleurEtGras(` $${texPrix(mr)}$ €.<br>`)
          texteCorr += `${numAlpha(1)} Finalement, ${prenom1} paiera son billet : $${billet} € - ${texPrix(mr)} € =$` + sp(1)
          texteCorr += texteEnCouleurEtGras(`$${texPrix(final1)}$ €.`)
          if (!context.isAmc) setReponse(this, 2 * i + 1, final1)
          repa = mr
          repb = final1
          break
        case 'augmentation':
          nombreDecimales(n)
          calcul(ma = pa * loyer / 100)
          calcul(final2 = loyer + ma)

          texte = `Le loyer de l'appartement de ${prenom2} coûte ${loyer} €. Au 1er janvier, il augmente de $${pa} \\%$.<br>`
          texte += (this.interactif && context.isHtml) ? `${numAlpha(0)} Le montant de l'augmentation est :` : `${numAlpha(0)} Calculer le montant de l'augmentation.`
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: ' €' }) : ''
          texte += '<br>'
          texte += (this.interactif && context.isHtml) ? `${numAlpha(1)} Finalement, ${prenom2} paiera son loyer :` : `${numAlpha(1)} Calculer le montant du loyer de ${prenom2}.`
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline', { texteApres: ' €' }) : ''
          if (!context.isAmc) setReponse(this, 2 * i, ma)
          if (!context.isAmc) setReponse(this, 2 * i + 1, final2)
          texteCorr = `${numAlpha(0)} Le montant de l'augmentation est :     $${loyer} € \\times ${pa} \\div 100$` + sp(1)
          texteCorr += nombreDeChiffresDansLaPartieDecimale(ma) < 3 ? '$ =$' : '$ \\approx$'
          texteCorr += texteEnCouleurEtGras(` $${texPrix(ma)}$ €.<br>`)
          texteCorr += `${numAlpha(1)} Finalement, ${prenom2} paiera son loyer : $${loyer} € + ${texPrix(ma)} € =$` + sp(1)
          texteCorr += texteEnCouleurEtGras(`$${texPrix(final2)}$ €.`)
          repa = ma
          repb = final2
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
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
                      texte: 'a)',
                      valeur: [repa],
                      param: {
                        digits: 5,
                        decimals: 2,
                        signe: false,
                        approx: 0,
                        exposantNbChiffres: 0
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
                      texte: 'b)',
                      valeur: [repb],
                      param: {
                        digits: 5,
                        decimals: 2,
                        signe: false,
                        approx: 0,
                        exposantNbChiffres: 0
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Valeurs entières et 10%, 20%...\n2 : Valeurs entières et 4%, 23%...\n3 : Une décimale comme 34,5%']
}
