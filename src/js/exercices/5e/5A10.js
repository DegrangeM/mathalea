import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,combinaisonListesSansChangerOrdre,listeDiviseurs,cribleEratostheneN,texteOuPas} from '../../modules/outils.js'


export const titre = 'Écrire la liste de tous les diviseurs d’un entier'

/**
 * 5A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */
export default function Liste_des_diviseurs_5e() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	// pas de différence entre la version html et la version latex pour la consigne
	//this.consigne =`Écrire la liste de tous les diviseurs d'un entier.`;
	this.consigne = ``;
	//this.consigne += `<br>`;
	context.isHtml ? this.spacing = 2 : this.spacing = 1;
	context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
	this.nbQuestions = 3;
	//this.correctionDetailleeDisponible = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		let typesDeQuestions;
		if (context.isHtml) { // les boutons d'aide uniquement pour la version html
			//this.boutonAide = '';
			//this.boutonAide = modalPdf(numeroExercice,"assets/pdf/FicheArithmetique-3A10.pdf","Aide mémoire sur la division euclidienne (Sébastien Lozano)","Aide mémoire")		
			//this.boutonAide += modalVideo('conteMathsNombresPremiers','/videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenuCorrection = ''; // Liste de questions corrigées

		let typesDeQuestionsDisponibles = [1, 1, 2];
		//let typesDeQuestionsDisponibles = [1];
		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions);

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			typesDeQuestions = listeTypeDeQuestions[i];

			switch (typesDeQuestions) {
				case 1: // Compléter un tableau pour trouver la liste de tous les diviseurs d'un entier
					// on choisit un entier non premier inférieur à 99
					let M = randint(2, 99, cribleEratostheneN(99));
					// on calcule le nombre de diviseur de M pour prévoir le nombre de lignes du tableau
					let nbre_diviseurs_M = listeDiviseurs(M).length;

					texte = `Compléter le tableau suivant et faire la liste de tous les diviseurs de ${M}`;
					if (!context.isHtml) {
						texte += `$\\medskip$`;
					};
					texte += `<br>`;
					if (context.isHtml) {
						texte += `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n`;
					} else {

						texte += `$\\begin{array}{|c|c|c|}\n`;
					};
					texte += `\\hline\n`;
					texte += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`;
					texte += `\\hline\n`;

					if (nbre_diviseurs_M % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (listeDiviseurs(M).length / 2); m++) {
							texte += texteOuPas(listeDiviseurs(M)[m]) + ` & ` + texteOuPas(listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)]) + `& ${texteOuPas(M)} \\\\\n`;
							texte += `\\hline\n`;
						};
					} else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
						for (let m = 0; m < ((listeDiviseurs(M).length - 1) / 2); m++) {
							texte += texteOuPas(listeDiviseurs(M)[m]) + ` & ` + texteOuPas(listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)]) + `& ${texteOuPas(M)} \\\\\n`;
						};
						texte += texteOuPas(listeDiviseurs(M)[(nbre_diviseurs_M - 1) / 2]) + ` & ` + texteOuPas(listeDiviseurs(M)[(nbre_diviseurs_M - 1) / 2]) + `& ${texteOuPas(M)} \\\\\n`;
						texte += `\\hline\n`;
					};
					texte += `\\end{array}\n$`;

					// correction
					texteCorr = `Le tableau suivant contient tous les couples de facteurs dont le produit vaut ${M}`;
					if (!context.isHtml) {
						texteCorr += `$\\medskip$`;
					};
					texteCorr += `<br>`;
					if (context.isHtml) {
						texteCorr += `$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n`;
					} else {
						texteCorr += `$\\begin{array}{|c|c|c|}\n`;
					};
					texteCorr += `\\hline\n`;
					texteCorr += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`;
					texteCorr += `\\hline\n`;

					if (nbre_diviseurs_M % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (listeDiviseurs(M).length / 2); m++) {
							texteCorr += listeDiviseurs(M)[m] + ` & ` + listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)] + `& ${M} \\\\\n`;
							texteCorr += `\\hline\n`;
						};
					} else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
						for (let m = 0; m < ((listeDiviseurs(M).length - 1) / 2); m++) {
							texteCorr += listeDiviseurs(M)[m] + ` & ` + listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)] + `& ${M} \\\\\n`;
						};
						texteCorr += listeDiviseurs(M)[(nbre_diviseurs_M - 1) / 2] + ` & ` + listeDiviseurs(M)[(nbre_diviseurs_M - 1) / 2] + `& ${M} \\\\\n`;
						texteCorr += `\\hline\n`;
					};
					texteCorr += `\\end{array}\n$`;
					if (!context.isHtml) {
						texteCorr += `$\\medskip$`;
					};
					texteCorr += `<br>`;
					texteCorr += `${M} a donc ${nbre_diviseurs_M} diviseurs qui sont : `;
					texteCorr += `1`;
					for (let w = 1; w < listeDiviseurs(M).length; w++) {
						texteCorr += ` ; ` + listeDiviseurs(M)[w];
					};
					texteCorr += `.`;
					break;
				case 2: // liste des diviseurs
					// on définit un tableau pour les choix du nombre dont on veut les diviseurs
					// 3 parmis 2,99 y compris les premiers et 1 parmis les entiers à 3 chiffres ayant au moins 8 diviseurs, il y en a 223 !
					let tableau_de_choix = [];
					tableau_de_choix = [randint(2, 99), randint(2, 99, [tableau_de_choix[0]]), randint(2, 99, [tableau_de_choix[0], tableau_de_choix[1]]), randint(2, 99, [tableau_de_choix[0], tableau_de_choix[1], tableau_de_choix[2]])];
					let tableau_de_choix_3chiffres = [];
					for (let m = 101; m < 999; m++) {
						if (listeDiviseurs(m).length > 8) {
							tableau_de_choix_3chiffres.push(m);
						};
					};
					// on ajoute un nombre à trois chiffre avec au moins 8 diviseurs dans les choix possibles
					let rg_Nb_3chiffres = randint(0, (tableau_de_choix_3chiffres.length - 1));
					tableau_de_choix.push(tableau_de_choix_3chiffres[rg_Nb_3chiffres]);

					let N; // on déclare le nombre dont on va chercher les diviseurs
					let rg_N; // pour tirer le rang du nombre dans le tableau des choix
					rg_N = randint(0, (tableau_de_choix.length - 1));
					N = tableau_de_choix[rg_N];
					texte = `Écrire la liste de tous les diviseurs de ${N}.`;
					texteCorr = `Pour trouver la liste des diviseurs de ${N} on cherche tous les produits de deux facteurs qui donnent ${N}. En écrivant toujours le plus petit facteur en premier.<br>`;
					texteCorr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${N}, par exemple ici, ${Math.trunc(Math.sqrt(N))}$\\times $${Math.trunc(Math.sqrt(N))} = ${Math.trunc(Math.sqrt(N)) * Math.trunc(Math.sqrt(N))}<${N}`;
					texteCorr += ` et ${Math.trunc(Math.sqrt(N)) + 1}$\\times $${Math.trunc(Math.sqrt(N)) + 1} = ${(Math.trunc(Math.sqrt(N)) + 1) * (Math.trunc(Math.sqrt(N)) + 1)}>${N} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(N))}.`;
					texteCorr += ` En effet, si ${N} est le produit de deux entiers p$\\times $q avec p < q alors si p$\\times $p > ${N} c'est que q$\\times $q < ${N} mais dans ce cas p serait supérieur à q sinon p$\\times $q serait inférieur à ${N} ce qui ne doit pas être le cas.<br>`;
					if (listeDiviseurs(N).length % 2 == 0) { //si il y a un nombre pair de diviseurs
						for (let m = 0; m < (listeDiviseurs(N).length / 2); m++) {
							texteCorr += `` + listeDiviseurs(N)[m] + `$\\times $` + listeDiviseurs(N)[(listeDiviseurs(N).length - m - 1)] + ` = ${N}<br>`;
						};
					} else {
						for (let m = 0; m < ((listeDiviseurs(N).length - 1) / 2); m++) {
							texteCorr += `` + listeDiviseurs(N)[m] + `$\\times $` + listeDiviseurs(N)[(listeDiviseurs(N).length - m - 1)] + `<br>`;
						};
						texteCorr += `` + listeDiviseurs(N)[(listeDiviseurs(N).length - 1) / 2] + `$\\times $` + listeDiviseurs(N)[(listeDiviseurs(N).length - 1) / 2] + ` = ${N}<br>`;
					};
					texteCorr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${N}.<br>`;
					texteCorr += `La liste des diviseurs de ${N} est donc `;
					texteCorr += `1`;
					for (let w = 1; w < listeDiviseurs(N).length; w++) {
						texteCorr += ` ; ` + listeDiviseurs(N)[w];
					};
					texteCorr += `.`;
					break;
			};

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}

		listeQuestionsToContenu(this);
	};
	//this.besoinFormulaireNumerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}
