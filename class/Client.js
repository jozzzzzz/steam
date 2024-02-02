export class Client {
    static listeClients = [];
    static nombreClients = 0;

    nom = "";
    prenom = "";
    mail = "";
    pseudo = "";
    motDePasse = "";
    jeux = [];

    constructor(nom, prenom, mail, pseudo, motDePasse, jeux) {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.pseudo = pseudo;
        this.motDePasse = motDePasse;
        this.jeux = jeux;
        Client.nombreClients = Client.nombreClients + 1;
    }

    static ajouterClient(client) {
        this.listeClients.push(client);
    }
    static rechercherClient(clients) {
        let a = this.listeClients.map((client, index) => (client.pseudo == clients) ? index : "none");
        let idClient = a.filter((client) => client != "none");
        return idClient[0];
    }
    static supprimerClient(id) {
        this.listeClients.splice(id, 1);
    }
    static ajouterJeuClient(idClient, idJeu) {
        this.listeClients[idClient].jeux.push(idJeu);
    }
}