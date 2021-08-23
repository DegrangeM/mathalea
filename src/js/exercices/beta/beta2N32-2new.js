import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'

export const titre = 'Encadrer une racine carrée par deux entiers consécutifs.'

export default function ExerciceZeroMathalea () {
  Exercice.call(this)
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []

    for (let i = 0, a, reponseG, reponseD, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 300, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289])
      reponseG = Math.floor(Math.sqrt(a))
      reponseD = Math.ceil(Math.sqrt(a))
      texte = `Sans utiliser de calculatrice, encadrer $\\sqrt{${a}}$ entre deux nombres entiers.<br>`
      texteCorr = `La stratégie consiste à encadrer $${a}$ par deux carrés parfaits consécutifs.`
      texteCorr += '<br>A partir des valeurs connues des premiers carrés parfaits :'
      texteCorr += '<br>$4~~;~~9~~;~~ 16~~;~~ 25~~;~~ 36~~;~~ 49~~;~~ 64~~;~~ 81~~;~~ 100~~;~~ 121~~;~~ 144~~;~~ 169~~;~~ 196~~;~~ 225~~;~~ 256~~; ~~289~~;\\dots$'
      texteCorr += '<br>On en déduit facilement un encadrement de 19 entre deux carrés parfaits consécutifs :'
      texteCorr += `<br>$${reponseG ** 2} < ${a} < ${reponseD ** 2}$,<br>`
        texteCorr += `donc $\\sqrt{${reponseG ** 2}} < \\sqrt{${a}} < \\sqrt{${reponseD ** 2}}$,<br>`
        texteCorr += '<i>Cette étape de la démonstration est admise ici, elle sera justifiée dans le chapitre sur les propriétés de la fonction racine carrée.</i>'
      texteCorr += `<br>Comme : $ \\sqrt{${reponseG ** 2}}=${reponseG}$ et $\\sqrt{ ${reponseD ** 2}}=${reponseD} $,<br>`
      texteCorr += `On en conclut que :  $${reponseG} < \\sqrt{${a}} < ${reponseD}$.`

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
