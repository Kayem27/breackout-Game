import { canvas, context } from './canvas.js'
import { updatePlayer, renderPlayer } from './player.js';
import { ball, updateBall, renderBall } from './ball.js';
import { createBlocks, updateBlocks, renderBlocks } from './blocks.js';

createBlocks();

function update() {
    updatePlayer();
    updateBall();
    updateBlocks();

    if (ball.y - ball.size > canvas.height) {
        // cancelAnimationFrame(frame); // Arrête la boucle ~60fps
        alert('Game Over!');
        window.location.reload();
    }
}
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderPlayer();
    renderBall();
    renderBlocks();
}

function run() {
    frame = requestAnimationFrame(run);
    update();
    render();
}

let frame;
if (confirm('Êtes-vous prêt ?')) {
    frame = requestAnimationFrame(run); // 1er call à la function 'run'
}
