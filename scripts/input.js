export const keyboard = {
    left : false,
    right : false
};

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) keyboard.left = true; // flèche gauche
    if (event.keyCode === 39) keyboard.right = true; // flèche droite
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 37) keyboard.left = false; // flèche gauche
    if (event.keyCode === 39) keyboard.right = false; // flèche droite
});