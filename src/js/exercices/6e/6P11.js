import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,calcul,texNombrec,prenomF,prenomM,texteEnCouleur,tex_prix,texteEnCouleurEtGras,numAlpha} from '../../modules/outils.js';
export const titre = 'Résoudre des problèmes de proportionnalité en utilisant la linéarité simple'

/**
 * On donne une relation de proportionnalité du type n objets coûtent x€ et on demande le prix de y objets
 * et le nombre d'objets qu'on peut acheter avec z€.
 * @author Jean-Claude Lhote
 * référence 6P11
 * 03/2021 : ajout de situations de proportionnalité : CGrolleau
*/

// _____ Les fonctions suivantes renvoient un objet : {texte = ; texteCorr = ;} ______
// elles correspondent aux différentes situations problèmes 

function question_achat() { //questions d'origine du 6P11 : achat.
    let liste_de_lieux = [
      "dans un magasin de bricolage",
      "dans une animalerie",
      "au supermarché local",
      "à l'épicerie",
      "dans la boutique du musée"
    ];
    let liste_de_choses = [[]];
    let liste_de_prix_unit = [[]];
    liste_de_choses[0] = [
      "articles",
      "outils",
      "accessoires",
      "pièces d'outillage",
      "pinceaux",
      "ampoules",
      "tournevis",
      "spatules",
      "raccords de tuyaux"
    ];
    liste_de_choses[1] = [
      "poissons rouges",
      "cannetons",
      "perruches",
      "phasmes",
      "colliers anti-puces",
      "souris",
      "lapereaux",
      "paquets de graines"
    ];
    liste_de_choses[2] = [
      "sets de tables",
      "verres",
      "assiettes",
      "os à macher",
      "dosettes de café",
      "packs de lait",
      "paquets de pâtes"
    ];
    liste_de_choses[3] = [
      "mangues",
      "ananas",
      "fruits de la passion",
      "melons",
      "paquets de madeleines de Commercy",
      "bergamottes",
      "bredeles",
      "pots de cancoillotte"
    ];
    liste_de_choses[4] = [
      "cartes",
      "livres",
      "gravures",
      "puzzles",
      "maquettes",
      "roches",
      "jeux de société"
    ];
    liste_de_prix_unit[0] = [5, 4, 1.25, 3, 0.5, 1.5, 2, 6, 4.5];
    liste_de_prix_unit[1] = [1.5, 7, 20, 2.5, 25, 2, 15, 8];
    liste_de_prix_unit[2] = [1.25, 1.5, 2, 0.5, 5, 4.5, 3];
    liste_de_prix_unit[3] = [2, 2.5, 1.25, 1.5, 4, 7, 12, 3];
    liste_de_prix_unit[4] = [0.5, 5, 7, 13.5, 10, 15, 20];
    let index1 = randint(0, 4);
    let prenoms = [prenomF(), prenomM()];
    let index2 = randint(0, liste_de_choses[index1].length - 1);
    let objet = liste_de_choses[index1][index2];
    let pu = liste_de_prix_unit[index1][index2] * (1 + randint(1, 2) * 0.2 * randint(-1, 1));
    let n = randint(3, 6);
    let y = n * randint(2, 5);
    let x = calcul(n * pu, 2);
    let somme = calcul(y * pu, 2);
    let met = false;
    let p;
	while (met == false) {
        p = n * randint(2, 5);
        if (p != y) {
			met = true;
		}
    }
    let z = calcul(p * pu, 2);
    let texte = `${numAlpha(0)} ${prenoms[0]} a repéré ${liste_de_lieux[index1]} des ${objet} qui l\'intéressent.<br\> ` +
		`Elle lit que ${n} ${objet} coûtent ${tex_prix(x)} €. ` +
		`Elle veut en acheter ${y}.<br\> Combien va-t-elle dépenser ?<br\>`;
    let texteCorr = `${numAlpha(0)} ${y} ${objet}, c'est ${texteEnCouleur(
        texNombrec(y / n)
      )} fois ${texteEnCouleur(
        n,
        "blue"
      )} ${objet}.<br\> Si ${texteEnCouleur(
        n,
        "blue"
      )} ${objet} coûtent ${tex_prix(x)} €, alors ${texteEnCouleur(
        texNombrec(y / n)
      )} fois ${texteEnCouleur(
        n,
        "blue"
      )} ${objet} coutent ${texteEnCouleur(
        texNombrec(y / n)
      )} fois ${tex_prix(x)} €.<br\>` +
	  texteEnCouleurEtGras(`Donc ${prenoms[0]} dépensera ${texteEnCouleur(
        texNombrec(y / n)
      )} $\\times$ ${tex_prix(x)} € = ${tex_prix(somme)} €.`,"black") + "<br\><br\>";
    texte += `${numAlpha(1)} ${prenoms[1]
        } veut lui aussi acheter ces ${objet}. Il dispose de ${tex_prix(
          z
        )} €.<br\> Combien peut-il en acheter ?<br\>`;
    texteCorr += `${numAlpha(1)} ${tex_prix(z)} €, c'est ${texteEnCouleur(
        texNombrec(z / x)
      )} fois ${tex_prix(x)} €.<br\> Si avec ${tex_prix(
        x
      )} € on peut acheter ${texteEnCouleur(
        n,
        "blue"
      )} ${objet}, alors avec ${texteEnCouleur(
        texNombrec(z / x)
      )} fois ${tex_prix(x)} €, on peut acheter ${texteEnCouleur(
        texNombrec(z / x)
      )} fois ${texteEnCouleur(n, "blue")} ${objet}.<br\>`;
      texteCorr += texteEnCouleurEtGras(`Donc ${prenoms[1]} pourra acheter ${texteEnCouleur(
        texNombrec(z / x)
      )} $\\times$ ${texteEnCouleur(n, "blue")} = ${p} ${objet}.`,"black") + "<br\>";
	return {
		qtexte:texte,
		qtexteCorr:texteCorr
	};
}

function question_recette() { //questions avec des masses pour un nombre de personne dans des recettes correction : passage à l'unité
	let liste, nb_personne_init, nb_personne_final, alea1, alea2, alea3, alea4, prenoms, quantite, quantite_reponse, quantite_q2, texte, texteCorr;
	liste = [ //liste des ingrédients avec différentes recettes associées et masses
		{
		ingredient : 'farine',
		recettes : ['gateau au citron','gauffres','crepes','cake'],
		quantites_par_pers : [20,25,30,35,40,50] // A voir pour l'instant quantités "simples".
		},
		{
		ingredient : 'sucre',
		recettes : ['gateau','mousse au chocolat','pain perdu','riz au lait'],
		quantites_par_pers : [15,20,25,30,35]
		},
		{
		ingredient : 'chocolat',
		recettes : ['gateau','mousse au chocolat','flan','riz au lait'],
		quantites_par_pers : [10,15,20,25,30,35]
		},
		{
		ingredient : 'beurre',
		recettes : ['gateau','mousse au chocolat'],
		quantites_par_pers : [10,12,15,18]
		}
	];
	nb_personne_init = randint(2, 6); //nombre de personne indiqué dans la recette.
	nb_personne_final = randint(2, 12, [nb_personne_init]); //nombre de personne pour lequel on veut cuisiner
	alea1 = randint(0, 3); //pour le choix de l'ingredient
	alea2 = randint(0, liste[alea1].recettes.length-1); //pour le choix de la recette 
	alea3 = randint(0, liste[alea1].quantites_par_pers.length-1); //pour le choix de la quantité par personne.
	quantite = calcul(liste[alea1].quantites_par_pers[alea3] * nb_personne_init); //Calcul de la quantité dans la recette à partir de la qtt/personne et du nb de personne
	quantite_reponse = calcul(liste[alea1].quantites_par_pers[alea3] * nb_personne_final); //Pour la correction
	alea4 = randint(2, 12, [nb_personne_init,nb_personne_final]); //Pour la deuxième question (on évite une réponse identique à la 1ere et à la recette.)
	quantite_q2 = calcul(liste[alea1].quantites_par_pers[alea3] * alea4); 
	prenoms = [prenomF(), prenomM()]; //Choix de prénoms pour l'énoncé
	texte = `${numAlpha(0)} ${prenoms[0]} lit sur sa recette de ${liste[alea1].recettes[alea2]} pour ${nb_personne_init} personnes qu'il faut ${quantite} g de ${liste[alea1].ingredient}. <br\>` +
		`Elle veut adapter sa recette pour ${nb_personne_final} personnes.` +
		`<br\> Quelle masse de ${liste[alea1].ingredient} doit-elle prévoir ? <br\><br\>`;
    texteCorr = `${numAlpha(0)} Commençons par trouver la masse de ${liste[alea1].ingredient} pour une personne : <br\>` +
		` ${nb_personne_init} personnes, c'est ${texteEnCouleur(nb_personne_init)} fois 1 personne. ` +
		`il faut donc ${texteEnCouleur(nb_personne_init)} fois moins que ${quantite} g pour 1 personne.<br\>` +
		`${quantite} $\\div $ ${texteEnCouleur(nb_personne_init)} = ${liste[alea1].quantites_par_pers[alea3]}. <br\>` +
		texteEnCouleurEtGras(` Conclusion intermédiaire :`,"black") +
		` il faut ${liste[alea1].quantites_par_pers[alea3]} g de ${liste[alea1].ingredient} pour 1 personne. <br\>`+
        ` Cherchons maintenant la quantité nécessaire pour ${nb_personne_final} personnes : <br\>` +
		` ${nb_personne_final} personnes c'est ${texteEnCouleur(nb_personne_final)} fois 1 personne. <br\>` +
		`Donc il faut ${texteEnCouleur(nb_personne_final)} fois plus que ${liste[alea1].quantites_par_pers[alea3]} g de ${liste[alea1].ingredient} que pour 1 personne pour faire sa recette :` + 
		`<br\> ${liste[alea1].quantites_par_pers[alea3]} $\\times$ ${texteEnCouleur(nb_personne_final)} = ${quantite_reponse} <br\>` +
		texteEnCouleurEtGras(`Conclusion : ${prenoms[0]} doit utiliser ${quantite_reponse} g de ${liste[alea1].ingredient} pour ${nb_personne_final} personnes. `,"black") +
		` <br\><br\>`;	
    texte += `${numAlpha(1)} ${prenoms[1]} utilise la même recette de ${liste[alea1].recettes[alea2]}. Il dispose de ${quantite_q2} g de ${liste[alea1].ingredient}. <br\>`+
		` Pour combien de personnes au maximum peut-il cuisiner ? <br\>`;
    texteCorr += `${numAlpha(1)} ${prenoms[1]} utilise ${quantite_q2} g de ${liste[alea1].ingredient} cela représente ${texteEnCouleur(alea4,"blue")} fois plus que ${liste[alea1].quantites_par_pers[alea3]} g (quantité pour 1 personne).<br\>`+
	texteEnCouleurEtGras(`  Conclusion :  Il peut donc préparer sa recette pour ${texteEnCouleur(alea4,"blue")} personnes.`,"black"); 
    return {
		qtexte : texte,
		qtexteCorr : texteCorr
	}; 
}

function question_dillution() { //questions de mélange de volumes
	let liste, alea1, alea2, quantite, volume_final, quantite_reponse, volume_final_aff, unitesolvant_volume_final, texte, texteCorr;
	liste = [ 
		{
		solute : 'sirop',
		volume_unitaire : [12,15,18,20] ,
		unite_solute : 'cL',		
		unite_solvant : ['L','L'] //liste pour [0] singulier [1] pluriel
		},
		{
		solute : 'nettoyant pour sol',
		volume_unitaire : [5,8,10,12],
		unite_solute : 'cL',
		unite_solvant : ['L','L']
		},
		{
		solute : 'médicament',
		volume_unitaire : [3,3.5,4,4.5,5,7.5],
		unite_solute : 'mL',
		unite_solvant : ['dL','dL']
		},
		{
		solute : 'produit pour piscine',
		volume_unitaire : [1,1.2,0.8,1.5],
		unite_solute : 'L',
		unite_solvant : ["dizaine de mètres cubes", "dizaines de mètres cubes"]
		}
	];
	volume_final = randint(1, 5) + (randint(1, 5)) * 0.1 * randint(-1, 1,[0]); //volume d'eau pour la préparation
	alea1 = randint(0, 3); //pour le choix du soluté
	alea2 = randint(0, liste[alea1].volume_unitaire.length-1); //pour le choix du volume pour une unité de solvant 
	quantite = liste[alea1].volume_unitaire[alea2];
	quantite_reponse = calcul(volume_final * quantite); //Calcul du volume de soluté final (pour la correction.)
	if (volume_final < 2) {
		unitesolvant_volume_final = liste[alea1].unite_solvant[0];
	} else {
		unitesolvant_volume_final = liste[alea1].unite_solvant[1];
	}
	volume_final_aff = texNombrec(volume_final); //pour affichage avec bon séparateur.
	texte = `Il est indiqué sur la bouteille de ${liste[alea1].solute} qu'il faut  ` +
		` ${texNombrec(quantite)} ${liste[alea1].unite_solute} de  ${liste[alea1].solute} pour 1 ${liste[alea1].unite_solvant[0]} d'eau.<br\> ` +
		`On veut utiliser ${volume_final_aff} ${unitesolvant_volume_final} d'eau.` +
		`<br\> Quel volume de ${liste[alea1].solute} doit-on prévoir ? <br\>`;
    texteCorr = `Le volume de ${liste[alea1].solute} est proportionnel au volume d'eau <br\> ` +
		` ${texteEnCouleur(volume_final_aff)} ${unitesolvant_volume_final} d'eau, c'est ${texteEnCouleur(volume_final_aff)} fois 1 ${liste[alea1].unite_solvant[0]} d'eau. <br\> ` +
		`il faut donc ${texteEnCouleur(volume_final_aff)} fois plus que ${texteEnCouleur(texNombrec(quantite),"blue")} ${liste[alea1].unite_solute} de ${liste[alea1].solute}. <br\>` +
		`${texteEnCouleur(texNombrec(quantite),"blue")} ${liste[alea1].unite_solute} $\\times $ ${texteEnCouleur(volume_final_aff)} = ${texNombrec(quantite_reponse)}  ${liste[alea1].unite_solute}  <br\>  ` +
        texteEnCouleurEtGras(` Conclusion : Il faut donc prévoir ${texNombrec(quantite_reponse)} ${liste[alea1].unite_solute} de ${liste[alea1].solute}.`,"black") + ` <br\>`;	
    return {
		qtexte : texte,
		qtexteCorr : texteCorr
	};
}

function question_distance() { //questions de distance parcourue à une vitesse moyenne donnée
	let liste, alea1, alea2, alea3, volume_final, duree, rapport, rapport_question2, distance, reponse_q1, texte, texteCorr;
	liste = [ //liste des "moyens de locomotion" et vitesses associées
		{
		locomotion : 'piéton',
		vitesse : [3,3.5,4,4.5] ,
		},
		{
		locomotion : 'cycliste',
		vitesse : [12,15,16,17,18,20,22],
		},
		{
		locomotion : 'camion',
		vitesse : [75,77.5,80,82.5,85],
		},
		{
		locomotion : 'train',
		vitesse : [125,150,175,185,195],
		}
	];
	alea1 = randint(0, 3); //pour le choix de locomotion
	duree = [{
		temps : '15 minutes',
		rapport : 0.25
		},
		{
		temps : '30 minutes',
		rapport : 0.5
		},
		{
		temps : '45 minutes',
		rapport : 0.75
		},
		{
		temps : '1 heure et demi',
		rapport : 1.5
		},
		{
		temps : '2 heures',
		rapport : 2
		},
		{
		temps : '2 heures et demi',
		rapport : 2.5
		},
		{
		temps : '3 heures',
		rapport : 3
		}];
	alea2 = randint(0, liste[alea1].vitesse.length-1); //pour le choix du temps passé 
	rapport_question2 = [0.25, 0.5, 0.75, 1.25, 1.5, 2];
	alea3 = randint(0, rapport_question2.length-1,[alea2]);
	reponse_q1 = calcul(duree[alea2].rapport*liste[alea1].vitesse[alea2]);
	distance = texNombrec(calcul(rapport_question2[alea3] * liste[alea1].vitesse[alea2])); // pour question 2
	texte = `${numAlpha(0)} Un ${liste[alea1].locomotion} parcourt en moyenne ${texNombrec(liste[alea1].vitesse[alea2])} km en une heure.<br\> Quelle distance va-t-il parcourir, à la même vitesse en ${duree[alea2].temps} ? <br\><br\> `;
    texteCorr = `${numAlpha(0)} ${duree[alea2].temps} c'est ${texteEnCouleur(texNombrec(duree[alea2].rapport))} fois une heure.<br\> ` +
		`En une heure le ${liste[alea1].locomotion} parcourt ${texteEnCouleur(texNombrec(liste[alea1].vitesse[alea2],"blue"))} km donc en ${duree[alea2].temps} il va parcourir ${texteEnCouleur(texNombrec(duree[alea2].rapport))} fois ${texteEnCouleur(texNombrec(liste[alea1].vitesse[alea2],"blue"))} km. <br\>` +
		`${texteEnCouleur(texNombrec(duree[alea2].rapport))} $\\times$ ${texteEnCouleur(texNombrec(liste[alea1].vitesse[alea2],"blue"))} km = ${texNombrec(reponse_q1)} km <br\>`  +
		texteEnCouleurEtGras(` Conclusion : Le ${liste[alea1].locomotion} va donc parcourir ${texNombrec(reponse_q1)} km.`,"black") + `<br\><br\>`	;	
	texte += `${numAlpha(1)} Combien de temps va-t-il mettre pour parcourir ${distance} km à cette même vitesse ? <br\> `;
    texteCorr += `${numAlpha(1)} ${distance} c'est ${texteEnCouleur(texNombrec(rapport_question2[alea3]))} fois ${texNombrec(liste[alea1].vitesse[alea2])} km.
		Il parcourt ${texNombrec(liste[alea1].vitesse[alea2])} km en une heure. <br\>` + 
	`Il va mettre donc ${texteEnCouleur(texNombrec(rapport_question2[alea3]))} fois une heure à parcourir ${distance} km <br\>` + 
	texteEnCouleurEtGras(`Conclusion : Il va donc mettre  ${texNombrec(rapport_question2[alea3])} heure(s) ( ${texNombrec(rapport_question2[alea3])} $\\times$ 1 ) à parcourir ${distance} km  ce qui fait ${calcul(rapport_question2[alea3]*60)} minutes.`,"black") + `<br\><br\>`;	
	return {
		qtexte : texte,
		qtexteCorr : texteCorr
	};
}

function question_echelle() { //X cm sur une carte correspond à x km dans la réalité... 
	let rapport, distance_carte, distance_reel, distance_reel_q2, alea1, alea2, distance_carte_2, prenoms, texte, texteCorr;
	distance_carte = randint(1, 7); //Choix d'un nombre de cm sur la carte
	distance_reel = randint(3, 20, [distance_carte]); //Choix d'un nombre de km dans la réalité (on évite d'avoir 1cm pour 1km)
	rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5]; //rapport entre la référence et la question (rapports simples car niveau 6eme)
	alea1 = randint(0, rapport.length-1);
	alea2 = randint(0, rapport.length-1, [alea1]);
	distance_carte_2 = texNombrec(calcul(rapport[alea1] * distance_carte)); 
	distance_reel_q2 = texNombrec(calcul(rapport[alea2] * distance_reel)); 
	prenoms = [prenomF(), prenomM()];
	texte = `${numAlpha(0)} Sur une carte sur laquelle ${distance_carte} cm représente ${distance_reel} km dans la réalité, <br\>
		${prenoms[0]} mesure sont trajet, elle trouve une distance de ${distance_carte_2} cm. <br\>` +
		`A quelle distance cela correspond dans la réalité ? <br\><br\>`;
    texteCorr = `${numAlpha(0)} ${distance_carte_2} cm c'est ${texteEnCouleur(texNombrec(rapport[alea1]))} fois ${distance_carte} cm <br\>
		Dans la réalité, ${distance_carte} cm correspond à ${texteEnCouleur(distance_reel,"blue")} km donc <br\>`+
		`  ${distance_carte_2} cm va correspondre à ${texteEnCouleur(texNombrec(rapport[alea1]))} fois ${texteEnCouleur(distance_reel,"blue")} km  <br\>` +
		`${texteEnCouleur(texNombrec(rapport[alea1]))} $\\times$ ${texteEnCouleur(distance_reel,"blue")} km = ${texNombrec(calcul(rapport[alea1]*distance_reel))} km <br\>` +
		texteEnCouleurEtGras(`Conclusion : le trajet de ${prenoms[0]} est de ${texNombrec(calcul(rapport[alea1]*distance_reel))} km.`,"black") + `<br\><br\>` ;	
	texte += `${numAlpha(1)} Deux villes sont distantes de ${texNombrec(distance_reel_q2)} km. <br\>` +
	`Quelle distance va-t-on mesurer sur la carte entre ces deux villes ?`;
    texteCorr += `${numAlpha(1)} ${texNombrec(distance_reel_q2)} km c'est ${texteEnCouleur(texNombrec(rapport[alea2]))} fois ${distance_reel} km.
		Or ${distance_reel} km est représenté par ${texteEnCouleur(distance_carte,"blue")} cm sur la carte. <br\>` + 
		`Donc ${texNombrec(distance_reel_q2)} km est représenté par ${texteEnCouleur(texNombrec(rapport[alea2]))} fois ${texteEnCouleur(distance_carte,"blue")} cm sur la carte <br\>` +
		`${texteEnCouleur(texNombrec(rapport[alea2]))} $\\times$ ${texteEnCouleur(distance_carte,"blue")} cm = ${texNombrec(calcul(rapport[alea2]*distance_carte))} cm <br\>` +
		texteEnCouleurEtGras(`Conclusion : Les deux villes sont séparées de ${texNombrec(calcul(rapport[alea2]*distance_carte))} cm sur la carte.`,"black") + `<br\><br\>`;
	return {
		qtexte : texte,
		qtexteCorr : texteCorr
	};
}

function question_recouvrir_surface() { //peinture, gazon, carrelage pour une surface donnée.
	let liste, alea1, alea2, alea3, alea4, alea5, alea6, quantite, qttaffichage, surface_finale, rapport, quantite2, surface_finale2, prenoms, texte, texteCorr;
	liste = [ 
		{
		matiere : 'de la peinture',
		unite : 'L',
		qtt_matiere_unitaire : [0.5,1,1.5,2], //quantité au m²
		qtt_surface : [10,25,15] //nombre de m² indiqués sur l'emballage
		},
		{
		matiere : 'du gazon',
		unite : 'kg',
		qtt_matiere_unitaire : [2.5,3,5,10], 
		qtt_surface : [200,175,150] 
		},
		{
		matiere : 'du carrelage',
		unite : 'carreaux',
		qtt_matiere_unitaire : [25,30,50,100], 
		qtt_surface : [10,20,5] 
		}
	];
	alea1 = randint(0, liste.length-1); 
	alea2 = randint(0, liste[alea1].qtt_matiere_unitaire.length-1);
	alea3 = randint(0, liste[alea1].qtt_surface.length-1);	
	rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5]; //choix parmi des rapports simples (en 6eme cela parrait suffisant)
	quantite = liste[alea1].qtt_matiere_unitaire[alea2]; 
	alea4 = randint(0, rapport.length-1);
	surface_finale = calcul(rapport[alea4]*liste[alea1].qtt_surface[alea3]); 
	alea5 = randint(0, rapport.length-1,[alea4]);
	quantite2 = calcul(rapport[alea5]*liste[alea1].qtt_matiere_unitaire[alea2]);
	alea6 = randint(-2, 2,[0]);
	surface_finale2 =  calcul(rapport[alea5]*liste[alea1].qtt_surface[alea3]+alea6);
	prenoms = [prenomF(), prenomM()];
	qttaffichage = texNombrec(quantite); //Pour affichage avec virgule en séparateur.
	texte = `${numAlpha(0)} ${prenoms[0]} doit acheter ${liste[alea1].matiere}. <br\>`+
	`Sur la notice il est indiqué de prévoir ${qttaffichage} ${liste[alea1].unite} pour ${liste[alea1].qtt_surface[alea3]} m$^2$ <br\> ` +
	`Combien doit-elle en acheter pour une surface de ${texNombrec(surface_finale)} m$^2$ ? <br\>`;
    texteCorr = `${numAlpha(0)} ${texNombrec(surface_finale)} $m^2$ c'est ${texteEnCouleur(texNombrec(rapport[alea4]))} fois ${liste[alea1].qtt_surface[alea3]} $m^2$ <br\>` +
		`Il va donc falloir ${texteEnCouleur(texNombrec(rapport[alea4]))} fois ${texteEnCouleur(qttaffichage,"blue")} ${liste[alea1].unite} pour ${texNombrec(surface_finale)} $m^2$ <br\>` +
		`${texteEnCouleur(texNombrec(rapport[alea4]))} $\\times$ ${texteEnCouleur(qttaffichage,"blue")} ${liste[alea1].unite} = ${texNombrec(calcul(rapport[alea4]*quantite))} ${liste[alea1].unite}<br\>` +
		texteEnCouleurEtGras(`Conclusion : elle doit en acheter ${texteEnCouleur(texNombrec(rapport[alea4]))} $\\times$ ${texteEnCouleur(qttaffichage,"blue")} ${liste[alea1].unite} = ${texNombrec(calcul(rapport[alea4]*quantite))} ${liste[alea1].unite}.`,"black")+ `<br\>  `;	
	texte += `<br\> ${numAlpha(1)} ${prenoms[1]} a acheté ${liste[alea1].matiere}. Il lui en reste ${texNombrec(quantite2)} ${liste[alea1].unite}. <br\> Sur la notice il est indiqué de prévoir ${qttaffichage} ${liste[alea1].unite} pour ${texNombrec(liste[alea1].qtt_surface[alea3])} m$^2$ <br\>`+
	`En a-t-il suffisament pour la surface de ${texNombrec(surface_finale2)} m$^2$ qu'il lui reste à faire ? <br\>`;
    texteCorr += `<br\> ${numAlpha(1)} ${texNombrec(quantite2)} ${liste[alea1].unite} c'est ${texteEnCouleur(texNombrec(rapport[alea5]))} fois ${qttaffichage} ${liste[alea1].unite}. <br\>` +
		`avec ${texNombrec(quantite2)} ${liste[alea1].unite} on peut donc traiter une surface de ${texteEnCouleur(texNombrec(rapport[alea5]))}
		fois ${texteEnCouleur(texNombrec(liste[alea1].qtt_surface[alea3]),"blue")} m$^2$ <br\>` +
		`${texteEnCouleur(texNombrec(rapport[alea5]))} $\\times$ ${texteEnCouleur(texNombrec(liste[alea1].qtt_surface[alea3]),"blue")} m$^2$ = ${texNombrec(calcul(rapport[alea5]*liste[alea1].qtt_surface[alea3]))} m$^2$. <br\>`;
	if (calcul(rapport[alea5]*liste[alea1].qtt_surface[alea3]) > surface_finale2) {
		texteCorr += texteEnCouleurEtGras(`Conclusion : ${texNombrec(calcul(rapport[alea5]*liste[alea1].qtt_surface[alea3]))} m$^2$ > ${texNombrec(surface_finale2)} $m^2$ donc il a suffisament pour ${surface_finale2} m$^2$.`,"black") +` <br\>`;
	} else {
		texteCorr += texteEnCouleurEtGras(`Conclusion : ${texNombrec(calcul(rapport[alea5]*liste[alea1].qtt_surface[alea3]))} m$^2$ < ${texNombrec(surface_finale2)} $m^2$ donc il n'a pas assez pour ${surface_finale2} m$^2$.`,"black") +` <br\>`;
	}
	return {
		qtexte : texte,
		qtexteCorr : texteCorr
	};
}

// _______ Fin des fonctions correspondants aux situations problèmes _____


export default function Proportionnalite_par_linearite() {
  "use strict";
  let question;
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Répondre aux questions posées en justifiant";
  sortieHtml ? (this.spacing = 2) : (this.spacing = 1);
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1);
  this.nbQuestions = 5;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let situationtypes = [];
	let liste_index_situations_disponible = [0, 1, 2, 3, 4, 5]; 
	let liste_index_situations = combinaisonListes(
		liste_index_situations_disponible,
		this.nbQuestions
	); //permet de ne pas avoir 2 fois la même situation si - de questions que de situations
	//boucle pour le nombre de question. 
	//A chaque question on vérifie qu'elle n'existe pas déjà pour en refaire une. Sécurité : on ajoute un compteur pour eviter trop d'essais...
	let cpt = 0;
	for (let i=0; i<this.nbQuestions && cpt<50;) {
		switch(liste_index_situations[i]) {
			case 0:
				question = question_achat();
				break;
			case 1:
				question = question_recette();
				break;
			case 2:
				question = question_dillution();
				break;
			case 3:
				question = question_distance();
				break;
			case 4:
				question = question_echelle();
				break;
			case 5:
				question = question_recouvrir_surface();
				break;
		}
		if (this.listeQuestions.indexOf(question.qtexte) == -1) { // Si la question n'a jamais été posée, on la garde.
			this.listeQuestions.push(question.qtexte);
			this.listeCorrections.push(question.qtexteCorr);
			i++;
		}
		cpt++;
	}
    listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
  };
}