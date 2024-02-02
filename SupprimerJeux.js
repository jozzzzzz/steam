import{ Jeu } from "./class/Jeux.js";
import{ Client } from "./class/Client.js";

export function afficherSupprimerJeu() {
    console.log("affichage de la page supprimer jeu");
    document.getElementById("div1").style.display = "none";
    document.getElementById("div2").style.display = "none";
    document.getElementById("div3").style.display = "none";
    document.getElementById("div4").style.display = "block";

    //Affichage des jeux
    afficherTableauJeux(Jeu.listeJeux);

    document.forms.formSupprimerJeux.addEventListener("submit", (e) => {
        e.preventDefault();

        let jeu = document.getElementById("nomJeu3").value;
        let idJeu = Jeu.rechercherIdJeu(jeu);
        Jeu.supprimerJeu(idJeu);
        afficherTableauJeux(Jeu.listeJeux);
    });

    document.getElementById("nomJeu3").addEventListener("input", (e) => {
        let nom = Jeu.rechercherJeu(e.target.value);
        console.log(nom);
        afficherTableauJeux(nom);
    });
}

function afficherTableauJeux(jeux) {
    resetTableau();
    if (jeux[0]) {
        jeux.map((jeu, index) => {
            let id = "tableId" + index;
            let prix = (jeu.prix == 0) ? "Gratuit" : jeu.prix + "€";

            document.getElementById(id).getElementsByTagName("td")[0].innerHTML = jeu.nom;
            document.getElementById(id).getElementsByTagName("td")[1].innerHTML = jeu.genre;
            document.getElementById(id).getElementsByTagName("td")[2].innerHTML = prix;
            document.getElementById(id).getElementsByTagName("td")[3].innerHTML = jeu.stock;

            document.getElementById(id).addEventListener("click", (e) => {
                let nom = e.target.parentNode.childNodes[1].innerHTML;
                document.getElementById("nomJeu3").value = nom;
            });
        });
    } else {
        document.getElementById("tableId0").getElementsByTagName("td")[0].innerHTML = "Aucun jeu";
    }

}

function resetTableau() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("tableId"+i).getElementsByTagName("td")[0].innerHTML = ""; 
        document.getElementById("tableId"+i).getElementsByTagName("td")[1].innerHTML = "";
        document.getElementById("tableId"+i).getElementsByTagName("td")[2].innerHTML = "";
        document.getElementById("tableId"+i).getElementsByTagName("td")[3].innerHTML = "";       
    }
}