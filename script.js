import {
    drawCircle,
    drawPath,
    clearCanvas
} from '/drawUtils.js';

import Brush from '/Brush.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

clearCanvas(ctx);

const brush = new Brush();
let drawing = false;
let onCanvas = false;
let mouseHeld = false;

const updateDrawing = () => {
    const wasDrawing = drawing;

    if (mouseHeld && onCanvas) {
        drawing = true;

        if (!wasDrawing) {
            brush.move(event.offsetX, event.offsetY);
        
            brush.apply(ctx);
            drawCircle(ctx, brush.x, brush.y, brush.radius);
        }
    } else {
        drawing = false;
    }
}

// Painting
document.addEventListener('mousedown', (event) => {
    if (event.button == 0) {
        mouseHeld = true;
        updateDrawing();
    }
});

canvas.addEventListener('mouseenter', () => {
    onCanvas = true;
    updateDrawing();
});

canvas.addEventListener('mousemove', (event) => {
    if (drawing) {
        const { 
            offsetX: x, 
            offsetY: y
        } = event;

        brush.apply(ctx);
    
        drawCircle(ctx, brush.x, brush.y, brush.radius);
        drawPath(ctx, brush.x, brush.y, x, y, brush.radius * 2);
        drawCircle(ctx, x, y, brush.radius);

        brush.move(x, y);
    }
});

document.addEventListener('mouseup', (event) => {
    if (event.button == 0) {
        mouseHeld = false;
        updateDrawing();
    }
});

canvas.addEventListener('mouseleave', () => {
    onCanvas = false;
    updateDrawing();
});

// brush radius
const radiusInput = document.querySelector('input[name=brush-radius]');

radiusInput.addEventListener('change', (event) => {
    const radius = parseInt(event.target.value, 10);

    if (isNaN(radius) || radius <= 0) {
        event.target.value = brush.radius
    } else {
        brush.radius = radius;
    }
});

// Color selection
const primaryColor = document.querySelector('input[name=primary]');
primaryColor.addEventListener('change', (event) => {
    brush.color = event.target.value;
});

// Update tools when brush changes
const updateTools = () => {
    primaryColor.value = brush.color;
    radiusInput.value = brush.radius;
}

updateTools();
brush.onChange = updateTools;

// Keyboard shortcuts
document.addEventListener('keypress', (event) => {
    switch (event.key) {
        case '[':
            brush.decreaseRadius();
            break;
        case ']':
            brush.increaseRadius();
            break;
    }
});