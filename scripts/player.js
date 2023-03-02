import { canvas, context } from './canvas.js';
import { keyboard } from './input.js';

const PLAYER_HEIGHT = 10;

export const player = {
    x : canvas.width / 2,
    y : canvas.height - PLAYER_HEIGHT - 10,
    width : 75,
    height : PLAYER_HEIGHT,
    color : 'black',
    speed : 5
};

export function updatePlayer() {
    if (keyboard.left) { // Si on appuie sur gauche
        player.x -= player.speed;
    }
    if (keyboard.right) { // Si on appuie sur droite
        player.x += player.speed;
    }

    // Contrainte de déplacement
    if (player.x < 0) {
        player.x = 0;
    }
    else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

}

export function renderPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}