function BoardRenderer(context) {
    this._ctx = context;

    this._cols = model.getCols();
    this._rows = model.getRows();

    this._x = 0;
    this._y = 0;

    this._width = 0;
    this._height = 0;

    this._cellSize = 0;
}

_p = BoardRenderer.prototype;

_P.drawBG = function() {
    var ctx = this._ctx;

    var gradient = ctx.createLinearGradient(0, 0, 0, 0, this._height);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(1, "yellow");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this._width, this._height);

    var co = this._width/6;
    ctx.strokeStyle = "green";
    ctx.fillStyle = "darkgreen";

    ctx.beginPath();
    ctx.moveTo(co, this._height);
    ctx.bezierCurveTo(this._width + co * 3, -co, -co*3, -co, this._width - co, this._height);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(co, 0);
    ctx.bezierCurveTo(this._width + co * 3, this._height+co, -co*3, -co, this._height + co, this._width - co, 0);
    ctx.fill();
}