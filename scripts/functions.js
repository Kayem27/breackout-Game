import { context } from './canvas.js';

export function drawCircle(x, y, rayon, couleur, fill) {
    context.beginPath();

    if (fill)  context.fillStyle = couleur;
    else       context.strokeStyle = couleur;
    
    // context[ fill ? 'fillStyle' : 'strokeStyle' ] = couleur;

    context.arc(
        x, // x du centre du cercle
        y, // y du centre du cercle
        rayon, // rayon du cercle
        0, // angle de départ de l'arc
        Math.PI * 2 // angle de fin de l'arc
    );

    if (fill)   context.fill();
    else        context.stroke();

    // context[ fill ? 'fill' : 'stroke' ]();

    context.closePath();
}

// return true if the rectangle and circle are colliding
export function circleCollideWithRectangle(circle, rect) {
    // Calcule la distance entre le centre du cercle et le centre du rectangle
    let distX = Math.abs(circle.x - rect.x - rect.width / 2);
    let distY = Math.abs(circle.y - rect.y - rect.height / 2);

    if (distX > (rect.width / 2 + circle.size)) return false; // Si la distance horizontale est > à la moitié de la largeur du rectangle + le rayon du cercle, on est forcément à l'extérieur, il n'y a donc pas collision
    if (distY > (rect.height / 2 + circle.size)) return false; // Si la distance verticale est > à la moitié de la hauteur du rectangle + le rayon du cercle, on est forcément à l'extérieur, il n'y a donc pas collision
    if (distX <= (rect.width / 2)) return true; // Si la distance horizontale est <= à la moitié de la largeur du rectangle + le rayon du cercle, on est forcément à l'intérieur, il y a donc collision
    if (distY <= (rect.height / 2)) return true; // Si la distance verticale est <= à la moitié de la hauteur du rectangle + le rayon du cercle, on est forcément à l'intérieur, il y a donc collision

    // Calcul des cas plus compliqués : les coins du rectangle
    let dx = distX - rect.width / 2;
    let dy = distY - rect.height / 2;

    // Pythagore
    return (dx * dx + dy * dy <= (circle.size * circle.size));
}