import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,choice,calcul,tex_prix,texFraction} from '../../modules/outils.js'

export const titre = 'Variation en pourcentages'

/**
* Calculer +/- 20, 30, 40 ou 60 %
* @Auteur Rémi Angot
* 5N110
*/
export default function Variation_en_pourcentages() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "Calculer le nouveau prix";
	this.nbQuestions = 5;
	this.spacing = 1;
	this.spacingCorr = 2;
	this.nbColsCorr = 1;
	this.nbCols = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		for (let i = 0, prix, taux, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			prix = choice([randint(2, 9), randint(1, 9) * 10, randint(1, 9) * 100, calcul(randint(11, 99) / 10)]);
			// X | X0 | X00 | X,X0
			taux = choice([20, 30, 40, 60]);
			if (choice([true, false])) {
				if (context.isHtml) {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix diminue de ${taux} \%.`;
				} else {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix diminue de ${taux}~\\%.`;
				}

				texteCorr = `$\\text{Diminution : }${texFraction(taux, 100)}\\times  ${tex_prix(prix)} = ${tex_prix(calcul(prix * taux))}\\div 100=${tex_prix(calcul(prix * taux / 100))}$ €`;
				texteCorr += `<br>`;
				texteCorr += `$\\text{Nouveau prix : }${tex_prix(prix)}-${tex_prix(calcul(prix * taux / 100))}=${tex_prix(calcul(prix - prix * taux / 100))}$ €`;
			} else {
				if (context.isHtml) {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix augmente de ${taux} \%.`;
				} else {
					texte = `Un article coûtait ${tex_prix(prix)} € et son prix augmente de ${taux}~\\%.`;

				}
				texteCorr = `$\\text{Augmentation : }${texFraction(taux, 100)}\\times  ${tex_prix(prix)}= ${tex_prix(calcul(prix * taux))}\\div 100=${tex_prix(calcul(prix * taux / 100))}$ €`;
				texteCorr += `<br>`;
				texteCorr += `$\\text{Nouveau prix : }${tex_prix(prix)}+${tex_prix(calcul(prix * taux / 100))}=${tex_prix(calcul(prix * (1 + taux / 100)))}$ €`;
			}

			if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
}
