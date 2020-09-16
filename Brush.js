export default class {
    constructor() {
        this.x = undefined;
        this.y = undefined;

        this._radius = 1;
        this._color = '#000000';

        this.onChange;
    }

    get radius() {
        return this._radius;
    }

    set radius(newRadius) {
        this._radius = Math.max(newRadius, 1);
        this.onChange();
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;
        this.onChange();
    }

    increaseRadius() {
        this.radius++;
    }

    decreaseRadius() {
        this.radius--;
    }

    apply(ctx) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}