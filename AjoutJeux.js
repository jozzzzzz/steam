import { Jeu } from "./class/Jeux.js";
import { Client } from "./class/Client.js";

export function afficherAjouterJeu() {
    console.log("affichage de la page d'ajout de jeux");
    document.getElementById("div1").style.display = "none";
    document.getElementById("div2").style.display = "none";
    document.getElementById("div3").style.display = "block";
    document.getElementById("div4").style.display = "none";

    afficherJeux();

    document.forms.formAjouterJeux.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let nom = event.target.nomJeu2.value;
        let genre = event.target.genreJeu2.value;
        let prix = event.target.prixJeu2.value;
        let image = event.target.imageJeu2.value;
        let stock = event.target.stockJeu2.value;
        let exist = false;

        Jeu.listeJeux.map((jeu) => {
            if (nom.toLowerCase() == jeu.nom.toLowerCase()){
                exist = true;
            }
        });

        if (!exist) {
            let jeu = new Jeu(nom, genre, image, prix, stock);
            Jeu.ajouterJeu(jeu);

            afficherJeux();

            document.forms.formAjouterJeux.reset();
        } else {
            document.getElementById("nomJeu2").value = "";
            document.getElementById("nomJeu2").placeholder = "Jeu déjà existant";
        }
    });
}

function afficherJeux() {
    let html = "<tr><th>Nom</th><th>Genre</th><th>Prix</th><th>Stock</th></tr>"

    Jeu.listeJeux.map((jeu) => {
        html += "<tr><td>" + jeu.nom + "</td><td>" + jeu.genre + "</td><td>" + jeu.prix + "€</td><td>" + jeu.stock + "</td></tr>";
    });

    document.getElementById("tableauJeux2").innerHTML = html;
}