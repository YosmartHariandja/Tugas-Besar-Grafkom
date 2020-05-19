var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

let start = new THREE.Vector3();
let motion = new Motion(start.x, start.y, sphere);
let edge = new THREE.Vector3(visibleWidthAtZDepth(true, cam), visibleHeightAtZDepth(true, cam), 0);

function draw() {
    requestAnimationFrame(draw);
    addEventListener('mousemove', onMouseMove, false);

    if(keyboard['d'])
    {
        let wind = new THREE.Vector3(1,0,0);
        motion.applyForce(wind);
    }
    if(keyboard['a'])
    {
        let wind = new THREE.Vector3(-1,0,0);
        motion.applyForce(wind);
    }
    let gravity = new THREE.Vector3(0,-1,0);
    motion.applyForce(gravity);

    motion.show();
    motion.update(mouse);
    motion.edges(edge);

    // KM/H Text
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
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
