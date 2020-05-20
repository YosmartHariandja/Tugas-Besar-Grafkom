var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

let start = new THREE.Vector3(0, -100, 0);
let weight = 1;
let motion = new Motion(start.x, start.y, sphere, weight);
let edge = new THREE.Vector3(visibleWidthAtZDepth(true, cam), visibleHeightAtZDepth(true, cam), 0);
let dragC = 0.01;

let text2 = document.createElement('div');
function draw() {
    requestAnimationFrame(draw);
    addEventListener('mousemove', onMouseMove, false);

    let wind = new THREE.Vector3(1, 0, 0);
    motion.applyForce(wind);

    let gravity = new THREE.Vector3(0, -0.35, 0);
    gravity = ((new THREE.Vector3()).add(gravity)).multiplyScalar(weight);
    motion.applyForce(gravity);
    

    motion.drag(dragC);
    motion.friction(edge);
    motion.edges(edge);
    motion.update(mouse);
    motion.show();

    // KM/H Text
    text2.style.position = 'absolute';
    //text2.style.zIndex = 1;
    text2.style.width = 100;
    text2.style.height = 100;
    text2.style.backgroundColor = "white";
    text2.style.top = window.innerHeight - 50 + 'px';
    text2.style.left = window.innerWidth - 100 + 'px';
    text2.innerHTML = motion.speedometer();
    document.body.appendChild(text2);
    // KM/H Text

    renderer.render(scene, cam);
}
draw();
