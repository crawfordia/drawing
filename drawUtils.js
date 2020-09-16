export const drawCircle = (ctx, x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill();
}

export const drawPath = (ctx, x1, y1, x2, y2, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

export const clearCanvas = (ctx, color='#FFFFFF') => {
    const { canvas } = ctx;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
