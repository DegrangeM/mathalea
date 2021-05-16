import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,choice,shuffle,combinaisonListesSansChangerOrdre,texNombre,texteGras,warnMessage} from '../../modules/outils.js'
export const titre = 'Calcul mental et calcul littéral'

/**
 * * Calcul mental autour des identités remarquables
 * * numéro de l'exo ex : 3L11-5
 * * publié le  14/11/2020
 * @author Sébastien Lozano
 */
export default function identites_calculs() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1;
	if (this.debug) {
		this.nbQuestions = 3;
	} else {
		this.nbQuestions = 3;
	};

	this.titre = titre;
	this.consigne = `Faire les calculs suivants sans calculatrice. Utiliser la double distributivité ou les identités remarquables.`;

	this.nbCols = 1;
	this.nbColsCorr = 1;
	//this.nbQuestionsModifiable = false;	
	context.isHtml ? this.spacing = 1 : this.spacing = 1;
	context.isHtml ? this.spacingCorr = 1 : this.spacingCorr = 1;

	this.listePackages = `bclogo`;

	let typesDeQuestionsDisponibles;

	this.nouvelleVersion = function () {
		//une fonction pour gérer un \hfill dans la sortie LaTeX
		function myhfill() {
			if (context.isHtml) {
				return `<br><br>`;
			} else {
				return `\\hfill`;
			}
		};
		switch (Number(this.sup)) {
			case 1:
				typesDeQuestionsDisponibles = [0, 0, 0]; //shuffle([choice([1,3]),choice([2,3]),0]);
				this.introduction = warnMessage(`$(a+b)^2=a^2+2ab+b^2$`, `nombres`, `Coup de pouce`);
				break;
			case 2:
				typesDeQuestionsDisponibles = [1, 1, 1]; //shuffle([choice([1,3]),choice([2,3]),0]); 
				this.introduction = warnMessage(`$(a-b)^2 = a^2-2ab+b^2$`, `nombres`, `Coup de pouce`);
				break;
			case 3:
				typesDeQuestionsDisponibles = [2, 2, 2]; //shuffle([choice([1,3]),choice([2,3]),0]);      			
				this.introduction = warnMessage(`$(a+b)(a-b)=a^2-b^2$`, `nombres`, `Coup de pouce`);
				break;
			case 4:
				typesDeQuestionsDisponibles = shuffle([0, 1, 2]); //shuffle([choice([1,3]),choice([2,3]),0]);      			
				this.introduction = warnMessage(`$(a+b)^2 = a^2 +2ab + b^2$ ${myhfill()} $(a-b)^2 = a^2-2ab+b^2$ ${myhfill()} $(a+b)(a-b)=a^2-b^2$`, `nombres`, `Coup de pouce`);
				break;
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées


		//let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions); // Tous les types de questions sont posées --> à remettre comme ci dessus		


		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			// une fonction pour gérer l'affichage sous forme de carré
			// a et b  sont les facteurs du produit, s'ils sont égaux on affiche sous forme de carré
			function ifIsCarreAfficheCarre(a, b) {
				if (a == b) {
					return `${a}^2`;
				} else {
					return `${a}\\times ${b}`;
				}
			}

			// une fonction pour afficher le double terme rectangle ou pas
			function ifIsCarreAfficheDblProd(bool, dblTermeRect) {
				if (bool) {
					return dblTermeRect;
				} else {
					return ``;
				}
			};

			let a = randint(2, 9);
			let b_somme = randint(1, 4);
			let b_difference = randint(1, 4);
			let b_som_dif = randint(1, 9);
			let coeff = choice([10, 100]);
			let coeff_som_dif = 100;
			let signes_som_dif = choice([[{ str: '-', nb: -1 }, { str: '+', nb: 1 }], [{ str: '+', nb: 1 }, { str: '-', nb: -1 }]]);
			let lettres = choice(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{
					lettre: lettres,
					a: a,
					b: b_somme,
					coeff: coeff,
					a_coeff: a * coeff,
					operations: [{ str: '+', nb: 1 }, { str: '+', nb: 1 }],
					facteurs: [{ str: `${texNombre(a * coeff)}+${b_somme}`, nb: texNombre(a * coeff + b_somme) }, { str: `${texNombre(a * coeff)}+${b_somme}`, nb: texNombre(a * coeff + b_somme) }],
					carre_de_a_coeff: texNombre(coeff * coeff * a * a),
					//carre_de_coeff:coeff*coeff,	
					carre_de_b: texNombre(b_somme * b_somme),
					termes_rectangles: [texNombre(coeff * a * b_somme), texNombre(coeff * a * b_somme)],
					somme_terme_rect: texNombre(2 * coeff * a * b_somme),
					signes_dbl_dist: ['+', '+', '+'],
					carre: true,
					resultat: texNombre(a * a * coeff * coeff + b_somme * b_somme + 2 * a * coeff * b_somme)
				},
				{
					lettre: lettres,
					a: a,
					b: b_difference,
					coeff: coeff,
					a_coeff: a * coeff,
					operations: [{ str: '-', nb: -1 }, { str: '-', nb: -1 }],
					facteurs: [{ str: `${texNombre(a * coeff)}-${b_difference}`, nb: texNombre(a * coeff - b_difference) }, { str: `${texNombre(a * coeff)}-${b_difference}`, nb: texNombre(a * coeff - b_difference) }],
					carre_de_a_coeff: texNombre(coeff * coeff * a * a),
					//carre_de_coeff:coeff*coeff,					
					carre_de_b: texNombre(b_difference * b_difference),
					termes_rectangles: [texNombre(coeff * a * b_difference), texNombre(coeff * a * b_difference)],
					somme_terme_rect: texNombre(2 * coeff * a * b_difference),
					signes_dbl_dist: ['+', '-', '-'],
					carre: true,
					resultat: texNombre(a * a * coeff * coeff + b_difference * b_difference - 2 * a * coeff * b_difference)
				},
				{
					lettre: lettres,
					a: a,
					b: b_som_dif,
					coeff: coeff_som_dif,
					a_coeff: a * coeff_som_dif,
					operations: signes_som_dif,
					facteurs: [{ str: `${texNombre(a * coeff_som_dif)} ${signes_som_dif[0].str} ${b_som_dif}`, nb: texNombre(a * coeff_som_dif + signes_som_dif[0].nb * b_som_dif) }, { str: `${texNombre(a * coeff_som_dif)} ${signes_som_dif[1].str} ${b_som_dif}`, nb: texNombre(a * coeff_som_dif + signes_som_dif[1].nb * b_som_dif) }],
					carre_de_a_coeff: texNombre(coeff_som_dif * coeff_som_dif * a * a),
					//carre_de_coeff:coeff*coeff,	
					carre_de_b: texNombre(b_som_dif * b_som_dif),
					termes_rectangles: [texNombre(coeff_som_dif * a * b_som_dif), texNombre(coeff_som_dif * a * b_som_dif)],
					somme_terme_rect: 0,
					signes_dbl_dist: ['-', '+', '-'],
					carre: false,
					resultat: texNombre(a * a * coeff_som_dif * coeff_som_dif - b_som_dif * b_som_dif)
				},
			];

			let enonces = [];
			for (let k = 0; k < situations.length; k++) {
				enonces.push({
					enonce: `					
					 $${situations[k].lettre}=${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$
					`,
					question: ``,
					correction1: `
						${texteGras(`Avec la double distributivité`)}<br>
						$${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
						$${situations[k].lettre} = (${situations[k].facteurs[0].str})\\times (${situations[k].facteurs[1].str})$<br>
						$${situations[k].lettre} = ${situations[k].a_coeff}^2 ${situations[k].signes_dbl_dist[1]} ${situations[k].a_coeff}\\times ${situations[k].b} ${situations[k].signes_dbl_dist[2]} ${situations[k].b}\\times ${situations[k].a_coeff} ${situations[k].signes_dbl_dist[0]} ${situations[k].b}^2$<br>
						$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${situations[k].signes_dbl_dist[1]} ${situations[k].termes_rectangles[0]} ${situations[k].signes_dbl_dist[2]} ${situations[k].termes_rectangles[1]}	${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
						$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} ${situations[k].somme_terme_rect}`)} ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
						$${situations[k].lettre} = ${situations[k].resultat}$
					`,
					correction2: `
					${texteGras(`Avec une identité`)}<br>
					$${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
					$${situations[k].lettre} = ${ifIsCarreAfficheCarre(`(${situations[k].facteurs[0].str})`, `(${situations[k].facteurs[1].str})`)} $<br>
					$${situations[k].lettre} = ${situations[k].a_coeff}^2 ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].a_coeff} \\times ${situations[k].b}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].b}^2$<br>
					$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].termes_rectangles[0]}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].carre_de_b}$<br>
					$${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} ${situations[k].somme_terme_rect}`)} ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
					$${situations[k].lettre} = ${situations[k].resultat}$				
				`
				});
			};

			// autant de case que d'elements dans le tableau des situations
			switch (listeTypeDeQuestions[i]) {
				case 0: // carré d'une somme 
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction1}<br>${enonces[0].correction2}`;
						texteCorr = ``;
					} else {
						if (context.isHtml) {
							texteCorr = `${enonces[0].correction1}<br><br>${enonces[0].correction2}`;
						} else {
							texteCorr = `Détaillons deux méthodes : <br><br>`;
							texteCorr += `\\begin{minipage}{8cm}`;
							texteCorr += enonces[0].correction1;
							texteCorr += `\\end{minipage}`;
							texteCorr += `\\hfill \\vrule \\hfill`;
							texteCorr += `\\begin{minipage}{8cm}`;
							texteCorr += enonces[0].correction2;
							texteCorr += `\\end{minipage}`;
							texteCorr += `<br>`;
						};
					};
					break;
				case 1: // carré d'une différence
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction1}<br>${enonces[1].correction2}`;
						texteCorr = ``;
					} else {
						if (context.isHtml) {
							texteCorr = `${enonces[1].correction1}<br><br>${enonces[1].correction2}`;
						} else {
							texteCorr = `Détaillons deux méthodes : <br><br>`;
							texteCorr += `\\begin{minipage}{8cm}`;
							texteCorr += enonces[1].correction1;
							texteCorr += `\\end{minipage}`;
							texteCorr += `\\hfill \\vrule \\hfill`;
							texteCorr += `\\begin{minipage}{8cm}`;
							texteCorr += enonces[1].correction2;
							texteCorr += `\\end{minipage}`;
							texteCorr += `<br>`;
						};
					};
					break;
				case 2: // Produit somme différence
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction1}<br>${enonces[2].correction2}`;
						texteCorr = ``;
					} else {
						if (context.isHtml) {
							texteCorr = `${enonces[2].correction1}<br><br>${enonces[2].correction2}`;
						} else {
							texteCorr = `Détaillons deux méthodes : <br><br>`;
							texteCorr += `\\begin{minipage}{8cm}`;
							texteCorr += enonces[2].correction1;
							texteCorr += `\\end{minipage}`;
							texteCorr += `\\hfill \\vrule \\hfill`;
							texteCorr += `\\begin{minipage}{8cm}`;
							texteCorr += enonces[2].correction2;
							texteCorr += `\\end{minipage}`;
							texteCorr += `<br>`;
						};
					};
					break;
			};

			if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);

	};
	this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, "1 : Carré d'une somme\n2 : Carré d'une différence\n3 : Produit de la somme et de la différence\n4 : Mélange"];
	//this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];	
}
