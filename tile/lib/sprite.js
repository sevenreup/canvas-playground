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