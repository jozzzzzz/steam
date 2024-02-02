import { Jeu } from "./class/Jeux.js";
import { Client } from "./class/Client.js";
import { creation } from "./Creation_data.js";
import { afficherConnection, status } from "./ClientPage.js";
import { afficherAjouterJeu } from "./AjoutJeux.js";
import { afficherSupprimerJeu } from "./SupprimerJeux.js";

//creation des jeux et des clients
creation();

afficherJeu();

function afficherJeu() {
    document.getElementById("div1").style.display = "block";
    document.getElementById("div2").style.display = "none";
    document.getElementById("div3").style.display = "none";
    document.getElementById("div4").style.display = "none";
        
    (status) ? document.getElementById("ajouterPanier").style.display = "block" : document.getElementById("ajouterPanier").style.display = "none";

    //Affichage des jeux
    //affichage du premier jeu
    afficherJeuSuivant(0);
}

function jeuSuivant(side, num) {
    num = Number(num);
    if (side == 0) {
        (num != 0) ? afficherJeuSuivant(num-1) : afficherJeuSuivant(Jeu.listeJeux.length-1);
    } else {
        (num != Jeu.listeJeux.length-1) ? afficherJeuSuivant(num+1) : afficherJeuSuivant(0);
    }
}
function afficherJeuSuivant(id) {
    console.log("affichage du jeu n°" + id);
    let jeu = Jeu.listeJeux[id];
    let prix = (jeu.prix == 0) ? "<p>Gratuit</p>" : "<p>" + jeu.prix + "€</p>";
    document.getElementById("imageJeu").src = jeu.image;
    document.getElementById("nomJeu").innerHTML = jeu.nom;
    document.getElementById("genreJeu").innerHTML = jeu.genre;
    document.getElementById("prixJeu").innerHTML = prix;
    document.getElementById("stockJeu").innerHTML = "Stock: " +jeu.stock;
    document.getElementById("num").setAttribute("name", id);

    
    afficherAchat(jeu);
}
function afficherAchat(jeu) {
    if (jeu.stock == 0) {
        document.getElementById("ajouterPanier").innerHTML = "Out of stock";
    } else {
        document.getElementById("ajouterPanier").innerHTML = "Ajouter au panier";
    }
    if (status) {
        console.log(Client.rechercherClient(status));
        Client.listeClients[Client.rechercherClient(status)].jeux.map((jeux) => {
        if(jeux == jeu.nom) {
            document.getElementById("ajouterPanier").innerHTML = "Vendre";
        }
    });
    }
};

//caroussel
document.getElementById("flecheDroite").addEventListener("click", () => {
    let id = document.getElementById("num").getAttribute("name");
    jeuSuivant(0, id)
});
document.getElementById("flecheGauche").addEventListener("click", () => {
    let id = document.getElementById("num").getAttribute("name");
    jeuSuivant(1, id)
});

//ajout au panier
document.getElementById("ajouterPanier").addEventListener("click", (e) => {

    
    let id = Client.rechercherClient(status);
    let jeux = Client.listeClients[id].jeux;
    let jeuNom = document.getElementById("nomJeu").innerHTML;
    let idPage = document.getElementById("num").getAttribute("name");

    if (e.target.innerHTML == "Ajouter au panier") {
    
        Client.ajouterJeuClient(id, jeuNom);
        Jeu.listeJeux[Jeu.rechercherIdJeu(jeuNom)].stock += -1;
    
        afficherAchat(Jeu.rechercherJeu(jeuNom)[0]);
        afficherJeuSuivant(idPage);

    } else if (e.target.innerHTML == "Vendre") {
    
        jeux.map((jeu, index) => (jeu == jeuNom) ? jeux.splice(index, 1) : null);
        Jeu.listeJeux[Jeu.rechercherIdJeu(jeuNom)].stock += 1;
    
        afficherAchat(Jeu.rechercherJeu(jeuNom)[0]);
        afficherJeuSuivant(idPage);
    }
});


document.getElementById("Jeu").addEventListener("click", afficherJeu)
document.getElementById("Connection").addEventListener("click", afficherConnection)
document.getElementById("AjouterJeu").addEventListener("click", afficherAjouterJeu)
document.getElementById("SupprimerJeu").addEventListener("click", afficherSupprimerJeu)

