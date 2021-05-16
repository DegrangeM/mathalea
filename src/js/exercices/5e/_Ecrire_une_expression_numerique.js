import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import Choisir_expression_numerique from './_Choisir_expression_numerique.js'
import Choisir_expression_litterale from './_Choisir_expression_litterale.js'
import {listeQuestionsToContenu,randint,combinaisonListes,katexPopup2} from '../../modules/outils.js'
/**
* Fonction noyau pour 7 fonctions qui utilisent les mêmes variables et la fonction Choisir_expression_numerique
* @Auteur Jean-Claude Lhote
* Référence 5C11,5C11-1, 5C11-2, 5C12, 5C12-1, 5L13, 5L13-1, 5L13-2, 5L13-3
*/
export default function Ecrire_une_expression_numerique() {
	'use strict'
	Exercice.call(this); // Héritage de la classe Exercice()
	this.consigne = "";
	this.nbQuestions = 4;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup2 = false; // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
	this.sup = false;
	this.sup3 = true;
	this.version = 1; // 1 pour ecrire une expression, 2 pour écrire la phrase, 3 pour écrire l'expression et la calculer, 4 pour calculer une expression numérique

	this.nouvelleVersion = function () {
		let typesDeQuestionsDisponibles = [];
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		if (!this.sup) { // Si aucune liste n'est saisie
			typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]
		}
		else {
			if (typeof (this.sup) == 'number') { // Si c'est un nombre c'est qu'il y a qu'une expression
				typesDeQuestionsDisponibles[0] = this.sup
			} else {
				typesDeQuestionsDisponibles = this.sup.split("-");// Sinon on créé un tableau à partir des valeurs séparées par des -
			}
		}
		let expf, expn, expc, decimal = 1, nbval, nb_operations, resultats
		let listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
		if (this.sup2) decimal = 10;
		for (let i = 0, texte, texteCorr, val1, val2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			nb_operations = parseInt(listeTypeDeQuestions[i])
			val1 = randint(2, 5)
			val2 = randint(6, 9)
			if (this.version > 2 && nb_operations == 1 && !this.litteral) nb_operations++
			if (!this.litteral)
				resultats = Choisir_expression_numerique(nb_operations, decimal, this.sup3)
			else
				resultats = Choisir_expression_litterale(nb_operations, decimal, val1, val2, this.sup3)
			expf = resultats[0]
			expn = resultats[1]
			expc = resultats[2]
			nbval = resultats[3]
			switch (this.version) {
				case 1:
					this.consigne = `Traduire la phrase par un calcul (il n’est pas demandé d’effectuer ce calcul).`
					texte = `${expf}.`
					texteCorr = `${expf} s'écrit<br>${expn}.`
					break
				case 2:
					if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					this.consigne = `Traduire le calcul par une phrase en français.`
					texte = `${expn}`
					expf = `l` + expf.substring(1);
					texteCorr = `${expn} est ${expf}.`
					break
				case 3:
					this.consigne = `Traduire la phrase par un calcul et effectuer ce calcul en respectant les priorités opératoires.`
					if (!this.litteral) texte = `${expf}.`
					else if (nbval == 2) texte = `${expf} puis calculer pour $x=${val1}$ et $y=${val2}$.` //nbval contient le nombre de valeurs en cas de calcul littéral
					else texte = `${expf} puis calculer pour $x=${val1}$.`
					texteCorr = `${expf} s'écrit ${expn}.<br>`
					if (!this.litteral) texteCorr = `${expc}.`
					else if (nbval == 2) texteCorr += `Pour $x=${val1}$ et $y=${val2}$ :<br> ${expc}.`
					else texteCorr += `Pour $x=${val1}$ :<br>${expc}.`
					break
				case 4:
					if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					this.consigne = `Calculer en respectant les priorités opératoires.`
					if (!this.litteral) texte = `${expn}.`
					else if (nbval == 2) texte = `Pour $x=${val1}$ et $y=${val2}$, calculer ${expn}.`
					else texte = `Pour $x=${val1}$, calculer ${expn}.`
					if (!this.litteral) texteCorr = `${expc}.`
					else if (nbval == 2) texteCorr = `Pour $x=${val1}$ et $y=${val2}$ :<br>${expc}.`
					else texteCorr = `Pour $x=${val1}$ :<br>${expc}.`
					break

			}
			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	}
	this.besoinFormulaireTexte = ['Choix des expressions', 'Nombres séparés par des tirets\n 1 : Expressions de base à une opération\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip
	this.besoinFormulaire2CaseACocher = ["Avec décimaux.", false]
	this.besoinFormulaire3CaseACocher = ["Avec le signe × devant les parenthèses", true]

}

