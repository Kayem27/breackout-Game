import { context, canvas } from './canvas.js';

export const blocks = [];

const BLOCK_COLS = 5;
const BLOCK_ROWS = 4;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 20;
const BLOCK_GAP = 10;

const X_SPACING = (canvas.width - (BLOCK_COLS * (BLOCK_WIDTH + BLOCK_GAP))) / 2;

export function createBlocks() {
    for (let i = 0; i < BLOCK_COLS; i++) {
        for (let j = 0; j < BLOCK_ROWS; j++) {
            blocks.push({
                x : X_SPACING + i * BLOCK_WIDTH + i * BLOCK_GAP,
                y : BLOCK_GAP + j * BLOCK_HEIGHT + j * BLOCK_GAP,
                width : BLOCK_WIDTH,
                height : BLOCK_HEIGHT,
                color: 'black',
            });
        }
    }
}

export function updateBlocks() {

}

export function renderBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        
        context.fillStyle = block.color;
        context.fillRect(block.x, block.y, block.width, block.height);
    }
}