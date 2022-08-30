export default function sample() {
  var m = document.getElementById("life").getContext("2d");
  const draw = (x, y, c, s) => {
    m.fillStyle = c;
    m.fillRect(x, y, s, s);
  };
  var atoms = [];
  const atom = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
  };
  const random = () => {
    return Math.random() * 400 + 50;
  };
  const create = (number, color) => {
    const group = [];
    for (let i = 0; i < number; i++) {
      group.push(atom(random(), random(), color));
      atoms.push(group[i]);
    }
    return group;
  };
  const rule = (atoms1, atoms2, g) => {
    for (let i = 0; i < atoms1.length; i++) {
      var fx = 0;
      var fy = 0;
      for (let j = 0; j < atoms2.length; j++) {
        var a = atoms1[i];
        var b = atoms2[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0 && d < 80) {
          var F = (g * 1) / d;
          fx += F * dx;
          fy += F * dy;
        }
      }
      a.vx = (a.vx + fx) * 0.5;
      a.vy = (a.vy + fy) * 0.5;
      a.x += a.vx;
      a.y += a.vy;
      if (a.x <= 0 || a.x >= 500) {
        a.vx *= -1;
      }
      if (a.y <= 0 || a.y >= 500) {
        a.vy *= -1;
      }
    }
  };
  const yellow = create(400, "yellow");
  const red = create(100, "red");
  const green = create(200, "green");
  const update = () => {
    rule(green, green, -0.32);
    rule(green, red, -0.17);
    rule(green, yellow, 0.34);
    rule(red, red, -0.1);
    rule(red, green, -0.34);
    rule(yellow, yellow, 0.15);
    rule(yellow, green, -0.2);
    m.clearRect(0, 0, 500, 500);
    draw(0, 0, "black", 500);
    for (let i = 0; i < atoms.length; i++) {
      draw(atoms[i].x, atoms[i].y, atoms[i].color, 5);
    }
    requestAnimationFrame(update);
  };
  update();
}
