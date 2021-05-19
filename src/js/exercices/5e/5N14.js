import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,enleveElement,choice,miseEnEvidence,obtenirListeFractionsIrreductibles,texFraction} from '../../modules/outils.js'


export const titre = 'Comparer des fractions (dénominateurs multiples)'

/**
* Comparer deux fractions dont les dénominateurs sont multiples (avec un coefficient paramétrable qui est par défaut inférieur à 11)
* @author Rémi Angot
* 5N14
*/
export default function Exercice_comparer_deux_fractions(max = 11) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max; // Correspond au facteur commun
	this.titre = titre;
	this.consigne = 'Comparer les fractions suivantes.';
	this.spacing = 2;
	this.spacingCorr = 2;
	this.nbQuestions = 5;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		let liste_fractions = obtenirListeFractionsIrreductibles();
		for (let i = 0, fraction, a, b, k, texte, texteCorr, signe, signe2; i < this.nbQuestions; i++) {
			fraction = choice(liste_fractions); //
			a = fraction[0];
			b = fraction[1];
			k = randint(2, this.sup);
			let ecart = choice([-4, -3, -2, -1, 1, 2, 3, 4]);
			if (k * a + ecart <= 0) {
				ecart = ecart * (-1);
			}
			if (ecart > 0) {
				signe = `<`;
				signe2 = `>`;
			} else {
				signe = `>`;
				signe2 = `<`;
			}
			enleveElement(liste_fractions, fraction); // Il n'y aura pas 2 fois la même réponse

			let ordre_des_fractions = randint(1, 2);
			if (ordre_des_fractions == 1) {
				texte = `$${texFraction(a, b)} \\quad$ et $\\quad ${texFraction(k * a + ecart, k * b)}$`;
			} else {
				texte = `$${texFraction(k * a + ecart, k * b)} \\quad$ et $\\quad ${texFraction(a, b)}$`;
			}
			if (!context.isHtml) {
				texte = texte.replace('\\quad$ et $\\quad', '\\ldots\\ldots\\ldots');
			}
			texteCorr = `$${texFraction(a, b)}=${texFraction(a + miseEnEvidence('\\times  ' + k), b + miseEnEvidence('\\times  ' + k))}=${texFraction(a * k, b * k)}\\quad$`;
			if (ordre_des_fractions == 1) {
				texteCorr += `  et   $\\quad${texFraction(a * k, b * k)} ${signe} ${texFraction(a * k + ecart, b * k)}\\quad$ donc $\\quad${texFraction(a, b)} ${signe} ${texFraction(a * k + ecart, b * k)}$ `;
			} else {
				texteCorr += `  et   $\\quad${texFraction(a * k + ecart, b * k)} ${signe2} ${texFraction(a * k, b * k)} \\quad$ donc $\\quad ${texFraction(a * k + ecart, b * k)} ${signe2} ${texFraction(a, b)} $ `;
			}
			this.listeQuestions.push(texte);
			this.listeCorrections.push(texteCorr);
		}
		listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoinFormulaireNumerique = ['Valeur maximale du coefficient multiplicateur', 99999];
}
