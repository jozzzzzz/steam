import { Client } from "./class/Client.js";
import { Jeu } from "./class/Jeux.js";

export function creation() {
    creationJeux();
    creationClients();
}

function creationJeux() {
    let a = new Jeu("Cyberpunk 2077", "RPG", "https://imgr.gameblog.fr/img/news/460966_64fec43b353e0.jpg?imgeng=/cmpr_10/w_1320/m_letterbox&ver=1", 59.99, 10);
    let b = new Jeu("League of Legends", "MOBA", "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-2935d0a3e332decb8e727fe56789b6ab", 0, 100);
    let c = new Jeu("Among Us", "Party Game", "https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075", 4.99, 20);
    let d = new Jeu("Minecraft", "Sandbox", "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_Minecraft.jpg", 23.99, 1);
    let e = new Jeu("Elden ring", "RPG", "https://static.bandainamcoent.eu/high/elden-ring/elden-ring/00-page-setup/elden-ring-new-header-mobile.jpg", 39.99 ,0)

    Jeu.ajouterJeu(a);
    Jeu.ajouterJeu(b);
    Jeu.ajouterJeu(c);
    Jeu.ajouterJeu(d);
    Jeu.ajouterJeu(e);
}

function creationClients() {
    let a = new Client("Bissor", "Melvin", "melvin.bissor@intervenants.efrei.net", "MelvinLaCastagne", "1234",["League of Legends", "Minecraft"]);
    let b = new Client("Lam", "Hugo", "lam.hugo@gmail.com", "Impostor", "0000",["Among Us", "Cyberpunk 2077"]);
    let c = new Client("Doe", "John", "john.doe@outlook.fr", "pnj", "absent", []);
    let d = new Client("Fayard", "Lucas", "lucas.fayard@gmail.com", "Saken", "1111", ["League of Legends"]);

    Client.ajouterClient(a);
    Client.ajouterClient(b);
    Client.ajouterClient(c);
    Client.ajouterClient(d);
}
