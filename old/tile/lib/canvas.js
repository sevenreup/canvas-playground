var ctx;

$(document).ready(function(){
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
});

$(window).load(function(){
    var purp = new Sprite("image/2.png", false);
    var blue = new Sprite("image/1.png", false);
    ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 640, 320);
    purp.draw(0, 0, 64, 64);
    blue.draw(32, 32, 64, 64);
});