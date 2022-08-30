var ctx;

function init() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var WALL = "image/1.png";
    var angle = 0;

    var help = new Sprite(WALL, false);
    var pat = new Sprite(WALL, true);

    setInterval(function(){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 640, 320);
        help.draw(0,0,64,64);
        help.rotate(115, 160, (angle += 4.0));
        pat.draw(160, 160, 640, 320);
    }, 25);
}

var Sprite = function (filename, is_pattern) {
    this.image = null;
    this.pattern = null;
    this.TO_RADIANS = Math.PI / 180;
    if (filename != undefined && filename != "" && filename != null) {
        this.image = new Image();
        this.image.src = filename;
        if (is_pattern)
            this.pattern = ctx.createPattern(this.image, "repeat");
    } else {
        console.log("Unable to load image");
    }
    this.draw = function (x, y, w, h) {
        if (this.pattern != null) {
            ctx.fillStyle = this.pattern;
            ctx.fillRect(x, y, w, h);
        } else {
            if (w != undefined || h != undefined) {
                ctx.drawImage(this.image, x, y, this.image.width, this.image.height);
            } else {
                ctx.drawImage(this.image, x, y, w, h);
            }
        }
    }
    this.rotate = function(x, y, angle)
    {
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));

        ctx.restore();
    }
}

init();