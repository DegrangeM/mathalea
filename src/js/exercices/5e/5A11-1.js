import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,combinaisonListes,texteEnCouleurEtGras} from '../../modules/outils.js'
import {mathalea2d,labyrinthe} from '../../modules/2d.js'


export const titre = 'Labyrinthe de multiples basé sur les critères de divisibilité'

/**
 * @author Jean-Claude Lhote
 * Publié le 7/12/2020
 * Ref 5A11-1
 * Sortir du labyrinthe en utilisant les critères de divisibilité.
 */
export default function Exercice_labyrinthe_divisibilite() {
	Exercice.call(this);
	this.titre = titre;
	this.consigne = "";
	this.niveau = '6e';
	this.nbQuestions = 1;
	this.nbQuestionsModifiable = false;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.pasDeVersionLatex = false;
	this.pas_de_version_HMTL = false;
	this.sup3 = 3;
	this.sup = 9;
	if (this.niveau = 'CM') {
		this.sup2 = 1;
		this.sup3 = 3;
	}
	else {
		this.sup2 = 2;
		this.sup3 = 4;
	}
	//this.consigne=`Trouve la sortie en ne passant que par les cases contenant un nombre divisible par $${parseInt(this.sup)}$.`
	this.nouvelleVersion = function () {
		this.listeCorrections = [];
		this.listeQuestions = [];
		let params, texte, texteCorr, trouve;
		let laby = labyrinthe();
		laby.niveau = parseInt(this.sup3); // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
		laby.chemin = laby.choisitChemin(laby.niveau); // On choisi un chemin
		laby.murs2d = laby.construitMurs(laby.chemin); // On construit le labyrinthe
		laby.chemin2d = laby.traceChemin(laby.chemin); // On trace le chemin solution
		let monchemin = laby.chemin;
		let table = parseInt(this.sup);
		if (this.sup2 == 2) {
			if (table % 2 != 0) {
				table = table * 2;
			}
		}
		else if (this.sup2 == 3) {
			if (table % 3 != 0) {
				table = table * 3;
			}
		}
		else if (this.sup2 == 4) {
			if (table % 4 != 0) {
				if (table % 2 != 0) {
					table = table * 4;
				}
				else {
					table = table * 2;
				}
			}
		}
		else if (this.sup2 == 5) {
			if (table % 5 != 0) {
				table = table * 5;
			}
		}
		else if (this.sup2 == 6) {
			if (table % 9 != 0) {
				if (table % 3 != 0) {
					table = table * 9;
				}
			}
			else {
				table = table * 3;
			}
		}
		texte = `${texteEnCouleurEtGras(`Trouve la sortie en ne passant que par les cases contenant un nombre divisible par `, 'black')}$${table}$.<br>`;
		texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en marron et la sortie était la numéro $${2 - monchemin[monchemin.length - 1][1] + 1}$.`, 'black')}<br>`;
		// Zone de construction du tableau de nombres : Si ils sont sur monchemin et seulement si, ils doivent vérifier la consigne
		let listeMultiples = [], index = 0;
		for (let i = 200; i <= 12000; i += randint(1, 100)) {
			listeMultiples.push(table * i);
		}
		listeMultiples = combinaisonListes(listeMultiples, 12);
		for (let a = 1; a < 7; a++) {
			laby.nombres.push([0, 0, 0]);
		}
		for (let a = 1; a < 7; a++) {
			for (let b = 0; b < 3; b++) {
				trouve = false;
				for (let k = 0; k < monchemin.length; k++) {
					if (monchemin[k][0] == a && monchemin[k][1] == b)
						trouve = true;
				}
				if (!trouve) {
					laby.nombres[a - 1][b] = randint(200, 5000) * table + randint(1, table - 1);
				}
				else {
					laby.nombres[a - 1][b] = listeMultiples[index];
					index++;
				}
			}
		} // Le tableau de nombre étant fait, on place les objets nombres.
		laby.nombres2d = laby.placeNombres(laby.nombres, 1);
		params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.7 };
		texte += mathalea2d(params, laby.murs2d, laby.nombres2d);
		texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d);
		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);
		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ["Critère de divisibilité ", 5, '1 : Par 2\n2 : Par 3\n3 : Par 4\n4 : Par 5\n5 : Par 9'];
	this.besoinFormulaire2Numerique = ["Critère de divisibilité supplémentaire ", 6, '1 : Aucun\n2 : Par 2\n3 : Par 3\n4 : Par 4\n5 : Par 5\n6 : Par 9'];
	this.besoinFormulaire3Numerique = ['Niveau de rapidité', 6, '1 : Escargot\n 2 : Tortue\n 3 : Lièvre\n 4 : Antilope\n 5 : Guépard\n 6 : Au hasard'];
} // Fin de l'exercice.

