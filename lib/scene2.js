var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

let start = new THREE.Vector3();
let motion = new Motion(start.x, start.y, sphere);



function draw() {
    id = requestAnimationFrame(draw);

    motion.show();
    motion.update();
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

    renderer.render(scene, cam);
}
draw();
