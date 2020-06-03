let i = 0;
let angle = 0;
let landing = false;

function process_keyboard(keyboard) {
    if (keyboard['a']) {
        angle += 0.01;
    }
    if (keyboard['d']) {
        angle -= 0.01;
    }
}

function draw() {
    renderer.render(scene, cam);
    if (plane) {
        glidder.mesh = plane;

        process_keyboard(keyboard);
        
        let euler = new THREE.Euler(0, angle, 0, 'XYZ');
        let grav = new THREE.Vector3(0, -0.0000, 0);
        let wind = new THREE.Vector3(0, 0, -0.001);
        if (!landing) {
            let euler2 = new THREE.Euler(0, angle*1.2, 0, 'XYZ');
            wind.applyEuler(euler2);
            glidder.applyForce(wind);
        }
        glidder.applyForce(grav);
        landing = glidder.edges3d(edges3D);
        glidder.speedometer();
        let velo = glidder.update();
        let pos = glidder.show(euler);

        console.log(velo);

        let minorplus = new THREE.Vector3((velo.x < 0)? -1 : 1, (velo.y < 0)? -1 : 1, (velo.z < 0)? -1 : 1)

        pointLight.position.set(pos.x, pos.y + -(minorplus.y * 10), (pos.z + (minorplus.z * 10)));
        pointLight.lookAt(pos);
        cam.position.set(pos.x, pos.y + -(minorplus.y * 10), pos.z + (-minorplus.z * 30));
        cam.lookAt(pos.x + (velo.x * 10), pos.y + -(velo.y * 10), pos.z + (velo.z * 10));
    }

    i += 1;
    requestAnimationFrame(draw);
}
draw();