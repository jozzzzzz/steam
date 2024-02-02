export class Jeu {
    static listeJeux = [];
    static nombreJeux = 0;

    nom = "";
    genre = "";
    image = "";
    prix = 0;
    stock = 0;

    constructor(nom, genre, image, prix, stock) {
        this.nom = nom;
        this.genre = genre;
        this.image = image;
        this.prix = prix;
        this.stock = stock;
        Jeu.nombreVehicules = Jeu.nombreVehicules + 1;
    }
    
    acheter() {
        this.stock = this.stock - 1;
    }

    static ajouterJeu(jeu) {
        this.listeJeux.push(jeu);
    }
    static rechercherJeu(nom) {
        let listeDeJeux = this.listeJeux.filter((jeu) => jeu.nom.toLowerCase().includes(nom.toLowerCase()) );
        return listeDeJeux;
    }
    static rechercherIdJeu(jeux) {
        let a = this.listeJeux.map((jeu, index) => (jeu.nom.toLowerCase() == jeux.toLowerCase()) ?  index : "none");
        let idJeu = a.filter((id) => id != "none");
        return idJeu[0];
    }
    static supprimerJeu(idJeu) {
        this.listeJeux.splice(idJeu, 1);
    }
}
