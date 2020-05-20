let weight = 1;
let startV = new THREE.Vector3(0, 10, 0);
let edges3D = new THREE.Vector3(0,3,0);

let plane;
let glidder = new Motion(startV, null, weight);

let loader = new THREE.GLTFLoader().load("3d/plane.gltf", function (result) {
    plane = result.scene;
    plane.scale.set(0.1, 0.1, 0.1);
    scene.add(plane);

    result.animations;
    result.scene;
    result.scenes;
    result.cameras;
    result.asset;
});

let i = 0;
let angle = 0.1;
let landing = false;
function draw() {
    renderer.render(scene, cam);
    if(plane)
    {
        glidder.mesh = plane;

        let grav = new THREE.Vector3(0, -0.0001, 0);
        let wind = new THREE.Vector3(0,0,-0.001);
        if(!landing)
        {
            wind.applyEuler(new THREE.Euler( 0, angle, 0, 'XYZ' ));
            glidder.applyForce(wind);
        }
        glidder.applyForce(grav);
        landing = glidder.edges3d(edges3D);
        glidder.speedometer();
        glidder.update();
        glidder.show();
        angle += 0.01;
    }
    
    i += 1;
    requestAnimationFrame(draw);
}
draw();