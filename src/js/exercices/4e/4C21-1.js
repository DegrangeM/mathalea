import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureParentheseSiNegatif,pgcd,simplificationDeFractionAvecEtapes,miseEnEvidence,texFraction,ppcm} from '../../modules/outils.js'


export const titre = 'Additionner deux fractions'

/**
* Effectuer la somme de deux fractions
*
* * Niveau 1 : 4 fois sur 5 un dénominateur est un multiple de l'autre et une fois sur 5 il faut additionner une fraction et un entier
* * Niveau 2 : 2 fois sur 5, il faut trouver le ppcm, 1 fois sur 5 le ppcm correspond à leur produit, 1 fois sur 5 un dénominateur est multiple de l'autre, 1 fois sur 5 il faut additionner une fraction et un entier
* * Paramètre supplémentaire : utiliser des nommbres relatifs (par défaut tous les nombres sont positifs)
* @Auteur Rémi Angot
* 4C21-1
*/
export default function Exercice_additionner_des_fractions() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 2; // Niveau de difficulté
	this.sup2 = false; // Avec ou sans relatifs
	this.titre = titre;
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée";
	this.spacing = 2;
	this.spacingCorr = 2;
	this.nbQuestions = 5;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles;
		if (this.sup == 1) {
			type_de_questions_disponibles = ['b_multiple_de_d', 'd_multiple_de_b', 'b_multiple_de_d', 'd_multiple_de_b', 'entier'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ppcm', 'ppcm', 'premiers_entre_eux', choice(['b_multiple_de_d', 'd_multiple_de_b']), 'entier'];
		}
		let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texteCorr, type_de_questions; i < this.nbQuestions; i++) {
			type_de_questions = listeTypeDeQuestions[i];
			switch (type_de_questions) {
				case 'ppcm':
					let liste_couples_de_denominateurs = [[6, 9], [4, 6], [8, 12], [9, 12], [10, 15], [10, 25], [6, 21], [12, 30], [6, 8], [50, 75],];
					let couples_de_denominateurs = choice(liste_couples_de_denominateurs);
					if (choice([true, false])) {
						b = couples_de_denominateurs[0];
						d = couples_de_denominateurs[1];
					} else {
						b = couples_de_denominateurs[1];
						d = couples_de_denominateurs[0];
					}
					k1 = ppcm(b, d) / b;
					k2 = ppcm(b, d) / d;
					break;

				case 'premiers_entre_eux':
					b = randint(2, 9);
					d = randint(2, 9);
					while (pgcd(b, d) != 1) {
						b = randint(2, 9);
						d = randint(2, 9);
					}
					k1 = ppcm(b, d) / b;
					k2 = ppcm(b, d) / d;
					break;

				case 'd_multiple_de_b':
					b = randint(2, 9);
					k = randint(2, 11);
					d = b * k;
					break;

				case 'b_multiple_de_d':
					d = randint(2, 9);
					k = randint(2, 11);
					b = d * k;
					break;
			}


			a = randint(1, 9, [b]);
			c = randint(1, 9, [d]);
			if (this.sup2) { //si les numérateurs sont relatifs
				a = a * choice([-1, 1]);
				c = c * choice([-1, 1]);
			}
			texte = `$${texFraction(a, b)}+${texFraction(c, d)}=$`;
			texteCorr = `$${texFraction(a, b)}+${texFraction(c, d)}`;

			// a/b+c/d = num/den (résultat non simplifié)
			if (type_de_questions == 'ppcm' || type_de_questions == 'premiers_entre_eux') {
				texteCorr += `=${texFraction(a + miseEnEvidence('\\times ' + k1), b + miseEnEvidence('\\times ' + k1))}+${texFraction(c + miseEnEvidence('\\times ' + k2), d + miseEnEvidence('\\times ' + k2))}`;
				//texteCorr += `=${texFraction(a*k1,b*k1)}+${texFraction(c*k2,d*k2)}`;
				num = a * k1 + c * k2;
				den = b * k1;
				texteCorr += `=${texFraction(a * k1 + `+` + ecritureParentheseSiNegatif(c * k2), den)}`;

			}

			if (type_de_questions == 'd_multiple_de_b') {
				texteCorr += `=${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}+${texFraction(c, d)}`;
				//texteCorr += `=${texFraction(a*k1,b*k1)}+${texFraction(c*k2,d*k2)}`;
				num = a * k + c;
				den = b * k;
				texteCorr += `=${texFraction(a * k + `+` + ecritureParentheseSiNegatif(c), den)}`;
			}

			if (type_de_questions == 'b_multiple_de_d') {
				texteCorr += `=${texFraction(a, b)}+${texFraction(c + miseEnEvidence('\\times ' + k), d + miseEnEvidence('\\times ' + k))}`;
				//texteCorr += `=${texFraction(a*k1,b*k1)}+${texFraction(c*k2,d*k2)}`;
				num = a + c * k;
				den = b;
				texteCorr += `=${texFraction(a + `+` + ecritureParentheseSiNegatif(c * k), den)}`;
			}

			if (type_de_questions == "entier") {
				a = randint(1, 9);
				b = randint(2, 9, [a]);
				let n = randint(1, 9);
				if (this.sup2) {
					a = a * choice([-1, 1]);
					n = n * choice([-1, 1]);
				}
				if (choice([true, false])) {
					texte = `$${n}+${texFraction(a, b)}=$`;
					texteCorr = texte;
					texteCorr += `$${texFraction(n + '\\times ' + b, b)}+${texFraction(a, b)}`;
					texteCorr += `=${texFraction(n * b + '+' + ecritureParentheseSiNegatif(a), b)}`;
				} else {
					texte = `$${texFraction(a, b)}+${ecritureParentheseSiNegatif(n)}=$`;
					texteCorr = texte;
					texteCorr += `$${texFraction(a, b)}+${texFraction(n + '\\times ' + b, b)}`;
					texteCorr += `=${texFraction(a + '+' + ecritureParentheseSiNegatif(n * b), b)}`;
				}
				num = n * b + a;
				den = b;
			}
			texteCorr += `=${texFraction(num, den)}`;
			texteCorr += simplificationDeFractionAvecEtapes(num, den) + '$';
			this.listeQuestions.push(texte);
			this.listeCorrections.push(texteCorr);
		}
		listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, "1 : Un dénominateur multiple de l'autre\n\
2 : Cas général"];
	this.besoinFormulaire2CaseACocher = ['Avec des nombres relatifs'];

}
