let i = 0;
let angle = 0;
let angleUp = 0;
let up = false;
let landing = false;

function process_keyboard(keyboard) {
    if (keyboard['a']) {
        angle += 0.01;
    }
    if (keyboard['d']) {
        angle -= 0.01;
    }
    if (keyboard['w']) {
        angleUp += 0.003;
        up = true;
    }
    else if (!keyboard['w']) {
        angleUp -= 0.001;
        up = false;
    }
}

let text2 = document.createElement('div');
function draw() {
    renderer.render(scene, cam);
    if (plane) {
        glidder.mesh = plane;

        process_keyboard(keyboard);
        console.log(angleUp);

        angle = clamp(angle, -0.75, 0.75);
        angleUp = clamp(angleUp, -1, 0.4);
        let euler = new THREE.Euler(angleUp, 0, angle, 'XYZ');
        let grav = new THREE.Vector3(0, -0.001, 0);
        let wind = new THREE.Vector3(0, 0, -0.01);
        if (up) {
            let windUp = new THREE.Vector3(0, 0.004, 0);
            glidder.applyForce(windUp);
        }
        if (!landing) {
            let euler2 = new THREE.Euler(0, angle * 1.2, 0, 'XYZ');
            wind.applyEuler(euler2);
            glidder.applyForce(wind);


            let velo = glidder.velo;
            let pos = glidder.pos;

            let minorplus = new THREE.Vector3((velo.x < 0) ? -1 : 1, (velo.y < 0) ? -1 : 1, (velo.z < 0) ? -1 : 1)

            if (minorplus.y == -1)
                minorplus.y *= -1;
            if (minorplus.z == -1)
                minorplus.z *= -1;

            pointLight.position.set(pos.x, pos.y + (minorplus.y * 10), pos.z + (minorplus.z * 10));
            pointLight.lookAt(pos);
            light.position.set(pos.x, pos.y + (minorplus.y * 10), pos.z + (minorplus.z * 10));
            light.lookAt(pos);
            cam.position.set(pos.x, pos.y + (minorplus.y * 10), pos.z + (minorplus.z * 30));
            cam.lookAt(pos.x + (velo.x * 10), pos.y + (velo.y * 10), pos.z + (velo.z * 10));
        }
        glidder.applyForce(grav);
        landing = glidder.edges3d(edges3D);
        glidder.speedometer();
        glidder.update();
        glidder.show(euler);

        // KM/H Text
        text2.style.position = 'absolute';
        //text2.style.zIndex = 1;
        text2.style.width = 100;
        text2.style.height = 100;
        text2.style.backgroundColor = "white";
        text2.style.top = window.innerHeight - 50 + 'px';
        text2.style.left = window.innerWidth - 100 + 'px';
        text2.innerHTML = glidder.speedometer();
        document.body.appendChild(text2);
        // KM/H Text
    }

    i += 1;
    requestAnimationFrame(draw);
}
draw();