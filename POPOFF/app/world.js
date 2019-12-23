var ctx;
var canvas;

$(document).ready(function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas(canvas);
    window.addEventListener("resize", function () {
        resizeCanvas(canvas);
    });
    console.log("here 1")
});

$(window).load(function () {
    console.log("here 2")

    repaint();
});

function resizeCanvas(cv) {
    cv.width = document.width || document.body.clientWidth;
    cv.height = document.height || document.body.clientHeight;
    repaint();
}

function repaint() {
    if(!ctx) return;

    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reorient();
    ctx.fillStyle = "grey";
    ctx.fillRect(100,10,250,80)
}

function reorient(){
    var angle = window.orientation;
    if(angle) {
        var rot = Math.PI*(angle/180);
        ctx.translate(angle == -90 ? canvas.width : 0, angle == 90 ? canvas.height : 0);
        ctx.rotate(rot);
    }
}