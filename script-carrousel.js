// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {

    // Sélectionne le conteneur du carrousel (qui va être déplacé horizontalement)
    const carrousel = document.querySelector('.carrousel__contenu');

    // Sélection des boutons de navigation (haut et bas)
    const boutonHaut = document.querySelector('.carrousel__bouton--haut');
    const boutonBas = document.querySelector('.carrousel__bouton--bas');

    // Index de la diapositive actuellement affichée
    let indice = 0;

    // Récupère toutes les diapositives du carrousel
    const diapositives = document.querySelectorAll('.carrousel__diapositive');

    // Nombre total de diapositives dans le carrousel
    const totalDiapositives = diapositives.length;

    // Récupère toutes les poupées gigognes (chacune a un haut et un bas)
    const poupees = document.querySelectorAll('.poupee_gigogne__1, .poupee_gigogne__2, .poupee_gigogne__3, .poupee_gigogne__4, .poupee_gigogne__5');

    // Met à jour le positionnement du carrousel en fonction de l'index actuel
    function miseAJourCarrousel() {
        const largeurDiapositive = diapositives[0].offsetWidth; // Largeur d'une diapo
        carrousel.style.transform = `translateX(-${indice * largeurDiapositive}px)`; // Déplacement horizontal
    }

    // Fonction pour forcer une animation CSS en la retirant et en la réappliquant
    function ForcerAnimation(element, NomDeClasse) {
        element.classList.remove(NomDeClasse); // Retire la classe pour "réinitialiser" l'animation
        requestAnimationFrame(() => {
            element.classList.add(NomDeClasse); // La rajoute juste après
        });
    }

    // Fonction pour ouvrir la poupée à l'indice donné
    function ouvrirPoupee(indice) {
        const poupeeHaut = poupees[indice].querySelector('.poupee_gigogne--haut');
        const poupeeBas = poupees[indice].querySelector('.poupee_gigogne--bas');

        // Retire les classes de fermeture si elles sont présentes
        poupeeHaut.classList.remove('fermer--haut');
        poupeeBas.classList.remove('fermer--bas');

        // Force les animations d’ouverture
        ForcerAnimation(poupeeHaut, 'ouvrir--haut');
        ForcerAnimation(poupeeBas, 'ouvrir--bas');
    }

    // Fonction pour fermer la poupée à l’indice donné
    function fermerPoupee(indice) {
        const poupeeHaut = poupees[indice].querySelector('.poupee_gigogne--haut');
        const poupeeBas = poupees[indice].querySelector('.poupee_gigogne--bas');

        // Retire les classes d’ouverture si elles sont présentes
        poupeeHaut.classList.remove('ouvrir--haut');
        poupeeBas.classList.remove('ouvrir--bas');

        // Force les animations de fermeture
        ForcerAnimation(poupeeHaut, 'fermer--haut');
        ForcerAnimation(poupeeBas, 'fermer--bas');
    }

    // Gère le clic sur la flèche vers le bas : ouvrir poupée courante, passer à la suivante
    boutonBas.addEventListener('click', function () {
        if (indice < totalDiapositives - 1) { // Vérifie qu’on n’est pas à la dernière diapo
            ouvrirPoupee(indice); // Ouvre la poupée actuelle
            indice++; // Incrémente l’index pour aller à la suivante
            miseAJourCarrousel(); // Met à jour le carrousel
        }
    });

    // Gère le clic sur la flèche vers le haut : revenir à la diapo précédente et fermer sa poupée
    boutonHaut.addEventListener('click', function () {
        fermerPoupee(indice - 1); // Ferme la poupée précédente
        indice--; // Décrémente l’index pour revenir en arrière
        miseAJourCarrousel(); // Met à jour le carrousel
    });
});
