import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { mathalea2d, point, similitude, longueur, polygone, rotation, codageAngleDroit, nommePolygone, segment, texteSurSegment, droite, projectionOrtho, pointSurSegment, texteParPoint, afficheMesureAngle } from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, creerNomDePolygone, choice } from '../../modules/outils.js'

export const titre = 'Exprimer le cosinus, le sinus ou la tangente d’un angle en fonction des côtés du triangle'

/**
 * @author Rémi Angot
 * 3G30-1
 * Donner un rapport trigonométriques en fonctions des longueurs des côtés (pas de valeurs numériques)
 * * Donner les 3 rapports d'un angle
 * * Un triangle est donné, on demande les 6 rapports
 * * Un triangle rectangle et une hauteur, il faut exprimer un rapport de deux manières différentes
 *
 * janvier 2021
 */
export default function ExprimerCosSinTan () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 2
  this.sup = 1
  if (context.isHtml) {
    this.spacing = 4
    this.spacingCorr = 4
  } else {
    this.spacing = 2
    this.spacingCorr = 2
  }

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = Number(this.sup)
    let texte = ''; let texteCorr = ''; const objetsEnonce = []; const objetsCorrection = []; let choixRapportTrigo

    const a = point(0, 0)
    const b = point(randint(3, 7), 0)
    const c = similitude(b, a, 90, randint(3, 7) / longueur(a, b))
    const p1 = polygone(a, b, c)
    // p1.isVisible = false
    const p2 = rotation(p1, a, randint(0, 360))
    const A = p2.listePoints[0]
    const B = p2.listePoints[1]
    const C = p2.listePoints[2]
    const codage = codageAngleDroit(B, A, C)
    const nom = creerNomDePolygone(4)
    A.nom = nom[0]
    B.nom = nom[1]
    C.nom = nom[2]
    const nomme = nommePolygone(p2, nom)
    const t1 = texteSurSegment('hypoténuse', C, B)
    let t2, t3, t22, t32, codageAngle, codageAngle2
    if (context.isHtml) {
      t2 = texteSurSegment('adjacent à ⍺', B, A)
      t3 = texteSurSegment('opposé à ⍺', A, C)
      t22 = texteSurSegment('opposé à 𝛽', B, A)
      t32 = texteSurSegment('adjacent à 𝛽', A, C)
      codageAngle = afficheMesureAngle(A, B, C, 'red', 1.5, '⍺')
      codageAngle2 = afficheMesureAngle(A, C, B, 'red', 1.5, '𝛽')
    } else {
      t2 = texteSurSegment('adjacent à $\\alpha$', B, A)
      t3 = texteSurSegment('opposé à $\\alpha$', A, C)
      t22 = texteSurSegment('opposé à $\\beta$', B, A)
      t32 = texteSurSegment('adjacent à $\\beta$', A, C)
      codageAngle = afficheMesureAngle(A, B, C, 'red', 1.5, '\\alpha')
      codageAngle2 = afficheMesureAngle(A, C, B, 'red', 1.5, '\\beta')
    }
    const hypo = segment(C, B)
    hypo.epaisseur = 2
    hypo.color = 'blue'
    codageAngle.epaisseur = 3
    codageAngle2.epaisseur = 3
    const d = droite(B, C)
    d.isVisible = false
    const H = projectionOrtho(A, d)
    H.nom = 'H'
    const pointNomH = pointSurSegment(H, A, -0.5)
    const codage2 = codageAngleDroit(A, H, B)
    H.nom = nom[3]
    const t4 = texteParPoint(H.nom, pointNomH)
    const sAH = segment(A, H)
    const t13 = texteSurSegment('hypoténuse', B, A)
    let t23
    let t33
    if (context.isHtml) {
      t23 = texteSurSegment('opposé à ⍺', A, H)
      t33 = texteSurSegment('adjacent à ⍺', H, B)
    } else {
      t23 = texteSurSegment('opposé à $\\alpha$', A, H)
      t33 = texteSurSegment('adjacent à $\\alpha$', H, B)
    }
    const hypo3 = segment(A, B)
    hypo3.epaisseur = 2
    hypo3.color = 'blue'

    objetsEnonce.push(p2, codage, nomme)
    objetsCorrection.push(p2, codage, nomme, t1, t2, t3, hypo, codageAngle)

    if (this.sup === 3) {
      objetsEnonce.push(sAH, t4, codage2)
    }

    const paramsEnonce = { xmin: Math.min(A.x, B.x, C.x) - 1, ymin: Math.min(A.y, B.y, C.y) - 1, xmax: Math.max(A.x, B.x, C.x) + 1, ymax: Math.max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5, mainlevee: false }
    const paramsCorrection = { xmin: Math.min(A.x, B.x, C.x) - 1, ymin: Math.min(A.y, B.y, C.y) - 1, xmax: Math.max(A.x, B.x, C.x) + 1, ymax: Math.max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5, mainlevee: false }
    if (!context.isHtml) {
      texte += '\\begin{minipage}{.4\\linewidth}\n'
    }
    texte += mathalea2d(paramsEnonce, objetsEnonce) + '<br>'
    if (!context.isHtml) {
      texte += '\n\\end{minipage}\n'
      texte += '\\begin{minipage}{.6\\linewidth}\n'
    }
    if (this.sup === 1) {
      texte += `Compléter à l'aide des longueurs $${A.nom + B.nom}$, $${A.nom + C.nom}$, $${B.nom + C.nom}$ : `
      texte += `<br>$\\cos\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
      texte += `<br>$\\sin\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
      texte += `<br>$\\tan\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
    }
    if (this.sup === 2) {
      texte += 'Écrire les 6 rapports trigonométriques pour ce triangle.'
    }
    if (this.sup === 3) {
      choixRapportTrigo = choice(['cosinus', 'sinus', 'tangente'])
      texte += `Exprimer le ${choixRapportTrigo} de $\\widehat{${A.nom + B.nom + C.nom}}$ de deux manières différentes.`
    }
    if (!context.isHtml) {
      texte += '\n\\end{minipage}\n'
    }
    if (this.sup === 1 || this.sup === 2 || this.sup === 3) {
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    }
    if (this.sup === 2) {
      const objetsCorrection2 = [p2, codage, nomme, t1, t22, t32, hypo, codageAngle2]
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection2)
    }
    if (this.sup === 3) {
      const objetsCorrection3 = [p2, codage2, nomme, t13, t23, t33, t4, hypo3, codageAngle, sAH]
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection3)
    }

    if (this.sup === 1 || this.sup === 2) {
      texteCorr += `<br>$${A.nom + B.nom + C.nom}$ est rectangle en $${A.nom}$ donc :`
      texteCorr += `<br>$\\cos\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$ ;`
      texteCorr += `<br>$\\sin\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$ ;`
      texteCorr += `<br>$\\tan\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}$.`
    }
    if (this.sup === 2) {
      texteCorr += `<br>$\\cos\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$ ;`
      texteCorr += `<br>$\\sin\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$ ;`
      texteCorr += `<br>$\\tan\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}$.`
    }
    if (this.sup === 3) {
      if (choixRapportTrigo === 'cosinus') {
        texteCorr += `<br>$${A.nom + B.nom + C.nom}$ est rectangle en $${A.nom}$ donc `
        if (!context.isHtml) {
          texteCorr += '<br>'
        }
        texteCorr += `$\\cos\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$ ;`
        texteCorr += `<br>$${A.nom + B.nom + H.nom}$ est rectangle en $${H.nom}$ donc `
        texteCorr += `$\\cos\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${B.nom + H.nom}}{${A.nom + B.nom}}$.`
      }
      if (choixRapportTrigo === 'sinus') {
        texteCorr += `<br>$${A.nom + B.nom + C.nom}$ est rectangle en $${A.nom}$ donc `
        if (!context.isHtml) {
          texteCorr += '<br>'
        }
        texteCorr += `$\\sin\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$ ;`
        texteCorr += `<br>$${A.nom + B.nom + H.nom}$ est rectangle en $${H.nom}$ donc `
        texteCorr += `$\\sin\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + H.nom}}{${A.nom + B.nom}}$.`
      }
      if (choixRapportTrigo === 'tangente') {
        texteCorr += `<br>$${A.nom + B.nom + C.nom}$ est rectangle en $${A.nom}$ donc `
        if (!context.isHtml) {
          texteCorr += '<br>'
        }
        texteCorr += `$\\tan\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}$ ;`
        texteCorr += `<br>$${A.nom + B.nom + H.nom}$ est rectangle en $${H.nom}$ donc `
        texteCorr += `$\\tan\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=\\dfrac{${A.nom + H.nom}}{${B.nom + H.nom}}$.`
      }
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }

  this.besoinFormulaireNumerique = ['Type de questions', 3, '1 : Compléter 3 rapports trigonométriques\n2 : Donner les 6 rapports trigonométriques\n3 : Deux triangles imbriqués, donner un rapport de deux manières différentes']
}
