/* global $ */

import { context } from '../context.js'
import { afficheScore } from '../gestionInteractif.js'
import { addElement, get, setStyles } from '../dom.js'
import { gestionCan } from './gestionCan.js'

export function verifQuestionListeDeroulante (exercice, i) {
  // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
  let eltFeedback = get(`resultatCheckEx${exercice.numeroExercice}Q${i}`, false)
  // On ajoute le div pour le feedback
  if (!eltFeedback) {
    const eltExercice = document.querySelector(`li#exercice${exercice.numeroExercice}Q${i}`)
    eltFeedback = addElement(eltExercice, 'div', { id: `resultatCheckEx${exercice.numeroExercice}Q${i}` })
  }
  setStyles(eltFeedback, 'marginBottom: 20px')
  if (eltFeedback) eltFeedback.innerHTML = ''
  let resultat
  const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  const optionsChoisies = document.querySelectorAll(`#ex${exercice.numeroExercice}Q${i}`)
  let reponses = []
  if (!Array.isArray(exercice.autoCorrection[i].reponse.valeur)) {
    reponses = [exercice.autoCorrection[i].reponse.valeur]
  } else {
    reponses = exercice.autoCorrection[i].reponse.valeur
  }
  let saisie = []
  for (const option of optionsChoisies) {
    saisie.push(option.value)
  }
  saisie = saisie.join('-')
  for (const reponse of reponses) {
    if (reponse.join('-') === saisie) {
      resultat = 'OK'
      spanReponseLigne.innerHTML = '😎'
    }
  }
  if (resultat !== 'OK') {
    spanReponseLigne.innerHTML = '☹️'
    resultat = 'KO'
  }
  spanReponseLigne.style.fontSize = 'large'
  return resultat
}

export const choixDeroulant = (exercice, i, c, choix, type = 'nombre') => {
  let result = `<select class="ui fluid dropdown ex${exercice.numeroExercice}" id="ex${exercice.numeroExercice}Q${i}" data-choix="${c}">
      <option> Choisir ${type === 'nombre' ? 'un nombre' : 'une réponse'} </option>`
  for (const a of choix) {
    result += `<option>${a}</option>`
  }
  result += '</select>'
  return result
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceListeDeroulante (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    $('select.dropdown').dropdown()
    // Couleur pour surligner les label avec une opacité de 50%
    if (context.vue === 'can') {
      gestionCan(exercice)
    }
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbQuestionsValidees = 0
          let nbQuestionsNonValidees = 0
          const uiselects = document.querySelectorAll(`.ui.dropdown.ex${exercice.numeroExercice}`)
          uiselects.forEach(function (uiselect) {
            uiselect.classList.add('disabled')
          })
          button.classList.add('disabled')
          for (let i = 0; i < exercice.nbQuestions; i++) {
            const resultat = verifQuestionListeDeroulante(exercice, i)
            resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
          }
          afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees)
        })
        button.hasMathaleaListener = true
      }
    }
  })
}
