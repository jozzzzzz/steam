import { Jeu } from "./class/Jeux.js";
import { Client } from "./class/Client.js";

export let status = ""
export function afficherConnection() {
    console.log("affichage de la page de connection");
    document.getElementById("div1").style.display = "none";
    document.getElementById("div2").style.display = "block";
    document.getElementById("div3").style.display = "none";
    document.getElementById("div4").style.display = "none";
    document.getElementById("creerCompte").style.display = "none";

    if (status == "") {
        document.getElementById("profil").style.display = "none";
    } else {
        afficherTableauJeux(Client.listeClients[Client.rechercherClient(status)].jeux);
        document.getElementById("profil").style.display = "block";
        document.getElementById("tableauJeux").style.display = "table";
    }

    document.forms.formConnexion.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let client = Client.rechercherClient(event.target.pseudo.value);
        if (client != undefined) {
            if (event.target.mdp.value.toString() == Client.listeClients[client].motDePasse.toString()) {

                document.getElementById("Status").innerHTML = "Connecté: " + Client.listeClients[client].pseudo;
                status = Client.listeClients[client].pseudo;

                afficherClient(Client.listeClients[client]);
                afficherTableauJeux(Client.listeClients[client].jeux);

                document.getElementById("profil").style.display = "block";
                document.forms.formConnexion.reset();
            } else {

                document.getElementById("mdp").placeholder = "Mot de passe incorrect";

            }
        } else {

            document.getElementById("pseudo").placeholder = "Pseudo incorrect";

        }
    });

    document.getElementById("nouveauCompte").addEventListener("click", () => {
        console.log("affichage de la page de creation de compte");
        Jeu.listeJeux.map((jeu) => {
            document.getElementById("choixJeux").innerHTML += "<label for='" + jeu.nom + "'>" + jeu.nom + "</label>" +
                "<input type='checkbox' name='" + jeu.nom + "' id='" + jeu.nom + "'><br>";
        });

        document.getElementById("form").style.display = "none";
        document.getElementById("creerCompte").style.display = "block";

        nouveauCompte();
    });

    document.getElementById("supprimerCompte").addEventListener("click", () => {
        console.log("suppression du compte");
        Client.supprimerClient(Client.rechercherClient(status));
        status = "";
        document.getElementById("Status").innerHTML = "Non connecté";
        document.getElementById("profil").style.display = "none";
        document.getElementById("tableauJeux").style.display = "none";
        document.getElementById("form").style.display = "block";
        document.getElementById("creerCompte").style.display = "none";
        console.log(Client.listeClients);
    });

    document.getElementById("deconnexion").addEventListener("click", () => {
        console.log("deconnexion");
        status = "";
        document.getElementById("Status").innerHTML = "Non connecté";
        document.getElementById("profil").style.display = "none";
        document.getElementById("tableauJeux").style.display = "none";
        document.getElementById("form").style.display = "block";
        document.getElementById("creerCompte").style.display = "none";
    });
}

function afficherClient(client) {
    document.getElementById("clientProfil").innerHTML = 
        "<img src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' alt='profil' width='100px' height='auto'>" +
        "<p>Nom: " + client.nom + "</p>" + 
        "<p>Prénom: " + client.prenom + "</p>" +
        "<p>Mail: " + client.mail + "</p>" +
        "<p>Pseudo: " + client.pseudo + "</p>" +
        "<h3>Mes jeux</h3>";
}

function afficherTableauJeux(nomJeu) {
    console.log(nomJeu);
    let clientJeux = [];
    nomJeu.map((jeu, index) => {
        let id = Jeu.rechercherIdJeu(jeu);
        console.log(id + " " + index + " " + jeu);
        clientJeux[index] = Jeu.listeJeux[id];
    });

    let html = "<tr><th>Nom</th><th>Genre</th><th>Prix</th><th>Stock</th></tr>"
    if (clientJeux[0]) {
        clientJeux.map((jeu) => {

            html += "<tr><td>" + jeu.nom + "</td><td>" + jeu.genre + "</td><td>" + jeu.prix + "€</td><td>" + jeu.stock + "</td></tr>";
        });
    } else {
        html += "<tr><td>Aucun jeu</td></tr>";
    }

    document.getElementById("tableauJeux").innerHTML = html;
    document.getElementById("form").style.display = "none";
    document.getElementById("tableauJeux").style.display = "table";
}

function nouveauCompte() {
    console.log("creation de compte");
    document.forms.formCreerCompte.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let full = verifyForm(event);
        console.log(event);

        if (full) {
            console.log("compte créé");
            let jeux = [];
            Jeu.listeJeux.map((jeu) => {
                if (event.target[jeu.nom].checked) {
                    jeux.push(jeu.nom);
                }
            });

            let client = new Client(event.target.nom.value, event.target.prenom.value, event.target.email.value, event.target.pseudo2.value, event.target.mdp2.value, jeux);
            Client.ajouterClient(client);

            document.getElementById("Status").innerHTML = "Connecté: " + client.pseudo;
            status = client.pseudo;

            afficherClient(client);
            afficherTableauJeux(client.jeux);
            document.getElementById("creerCompte").style.display = "none";
            document.getElementById("profil").style.display = "block";
            document.forms.formCreerCompte.reset();
        } else {
            return false;
        }
    });
}

function verifyForm(e) {
    let full = true;
    Client.listeClients.map((client) => {
        if (client.pseudo == e.target.pseudo2.value) {
            document.getElementById("pseudo2").value = "";
            document.getElementById("pseudo2").placeholder = "Pseudo déjà utilisé";
            full = false;
        } else if (client.mail == e.target.email.value) {
            document.getElementById("email").value = "";
            document.getElementById("email").placeholder = "Mail déjà utilisé";
            full = false;
        }
    });
    if (!e.target.nom.value) {
        full = false;
    } else if (!e.target.prenom.value) {
        full = false;
    } else if (!e.target.email.value) {
        full = true;
    } else if (!e.target.pseudo2.value) {
        full = false;
    } else if (!e.target.mdp2.value) {
        full = false;
    }
    return full;
}