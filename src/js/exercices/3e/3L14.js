import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texFractionReduite, texFraction } from '../../modules/outils.js'
export const titre = 'Résoudre une équation produit nul'

/**
 * Résolution d'équations de type (ax+b)(cx+d)=0
* @author Jean-Claude Lhote
* Tout est dans le nom de la fonction.
* 3L14
*/
export default function ResoudreUneEquationProduitNul () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les équations suivantes'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1.5
  this.spacing = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions = []
    switch (parseInt(this.sup)) {
      case 1: listeTypeDeQuestions = combinaisonListes([1, 2], this.nbQuestions)
        break
      case 2: listeTypeDeQuestions = combinaisonListes([3, 4], this.nbQuestions)
        break
      case 3: listeTypeDeQuestions = combinaisonListes([5, 6], this.nbQuestions)
        break
      case 4: listeTypeDeQuestions = combinaisonListes([1, 2, 3, 4, 5, 6], this.nbQuestions)
    }
    for (let i = 0, a, b, c, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: b = randint(1, 20) // (x+a)(x+b)=0 avec a et b entiers
          d = randint(1, 20, [b])
          texte = `$(x+${b})(x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(x+${b})(x+${d})=0$`
          texteCorr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`
          break
        case 2: b = randint(1, 20) // (x-a)(x+b)=0 avec a et b entiers
          d = randint(1, 20, [b])
          texte = `$(x-${b})(x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(x-${b})(x+${d})=0$`
          texteCorr += '<br> Soit ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${0 - d}$`
          break

        case 3: a = randint(2, 6) // (ax+b)(cx+d)=0  avec b/a et d/c entiers.
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          texte = `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$` + ' ou ' + `$x=-${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${0 - b / a}$` + ' ou ' + `$x=${0 - d / c}$`
          break
        case 4: a = randint(2, 6) // (ax+b)(cx-d)=0  avec b/a et d/c entiers.
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          texte = `$(${a}x+${b})(${c}x-${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x-${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$` + ' ou ' + `$x=${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${0 - b / a}$` + ' ou ' + `$x=${d / c}$`
          break
        case 5:
          a = randint(2, 9) // (ax+b)(cx+d)=0 avec b/a et d/c quelconques.
          b = randint(1, 20, [a])
          c = randint(2, 9, [a])
          d = randint(1, 20, [b, c])
          texte = `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$`
          if (texFraction(b, a) !== texFractionReduite(b, a)) { texteCorr += `$=-${texFractionReduite(b, a)}$` }
          texteCorr += ' ou ' + `$x=-${texFraction(d, c)}$`
          if (texFraction(d, c) !== texFractionReduite(d, c)) { texteCorr += `$=-${texFractionReduite(d, c)}$` }
          break
        case 6:
          a = randint(2, 9) // (ax+b)(cx-d)=0 avec b/a et d/c quelconques.
          b = randint(1, 20, [a])
          c = randint(2, 9, [a])
          d = randint(1, 20, [b, c])
          texte = `$(${a}x+${b})(${c}x-${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x-${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$`
          if (texFraction(b, a) !== texFractionReduite(b, a)) { texteCorr += `$=-${texFractionReduite(b, a)}$` }
          texteCorr += ' ou ' + `$x=${texFraction(d, c)}$`
          if (texFraction(d, c) !== texFractionReduite(d, c)) { texteCorr += `$=${texFractionReduite(d, c)}$` }

          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        // alert(this.listeQuestions)
        // alert(this.listeCorrections)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, ' 1 : Coefficient de x = 1\n 2 : Coefficient de x>1 et solutions entières\n 3 : Solutions rationnelles\n 4 : Mélange']
}
