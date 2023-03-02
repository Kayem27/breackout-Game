import { canvas, context } from './canvas.js';
import { drawCircle, circleCollideWithRectangle } from './functions.js';
import { player } from './player.js';
import { blocks } from './blocks.js';
import { sounds } from './sounds.js';

export const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    size : 10,
    color : 'black',
    speed : 5,
    speedX : 2,
    speedY : -2
}

export function updateBall() {
    // Déplacement de la balle
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Vérifier que la balle ne sorte pas de l'écran (sauf en bas)
    if (ball.x + ball.size > canvas.width) {
        ball.speedX *= -1;
        sounds.bounce.play();
    }
    if (ball.y - ball.size < 0) {
        ball.speedY *= -1;
        sounds.bounce.play();
    }
    if (ball.x - ball.size < 0) {
        ball.speedX *= -1;
        sounds.bounce.play();
    }

    // Est-ce que la balle touche la raquette ?
    if (ball.x > player.x && ball.x < player.x + player.width && ball.y + ball.size > player.y && ball.y + ball.size < player.y + ball.speedY + 1) {
        ball.speedY *= -1;
        sounds.bounce.play();

        // Calcul de l'angle de rebond de la balle
        let d = (ball.x - player.x) / player.width; // une valeur normalisée entre 0 et 1 de la balle sur la raquette
        let d2 = (d - 0.5) * 2; // valeur normalisée entre -1 et 1
        ball.speedX = d2 * ball.speed;
    }

    // Est-ce que la balle touche un block ?
    // Parcourir tous les blocks pour les comparer avec la position de la balle
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];

        // Est-ce qu'on détecte une collision ?
        if (circleCollideWithRectangle(ball, block)) {
            let blockTop = block.y;
            let blockLeft = block.x;
            let blockRight = block.x + block.width;
            let blockBottom = block.y + block.height;
    
            let ballMovesUp = ball.speedY < 0;
            let ballMovesDown = ball.speedY > 0;

            // Vérifie où se trouve la balle par rapport au block au moment de la collision
            if (ball.x < blockLeft && ball.y > blockTop && ball.y < blockBottom)        ball.speedX *= -1 // gauche
            else if (ball.x > blockRight && ball.y > blockTop && ball.y < blockBottom)  ball.speedX *= -1; // droite
            else if (ball.y < blockTop && ball.x > blockLeft && ball.x < blockRight)    ball.speedY *= -1; // haut
            else if (ball.y > blockBottom && ball.x > blockLeft && ball.x < blockRight) ball.speedY *= -1; // base
            // Si on arrive ici, c'est que on a une collision sur un coin
            else if (
                ball.x > blockRight && ball.y > blockBottom || // coin bas droite
                ball.x < blockLeft && ball.y > blockBottom || // coin bas gauche
                ball.x > blockLeft && ball.y < blockTop || // coin haut gauche
                ball.x > blockRight && ball.y < blockTop // coin haut droite
            ) {
                if (ballMovesDown) ball.speedY *= -1;
                if (ballMovesUp)   ball.speedX *= -1;
            }

            blocks.splice(i, 1);
            i--;
            sounds.break.play();
        }
        
    }
}

export function renderBall() {
    drawCircle(ball.x, ball.y, ball.size, ball.color, true);
}