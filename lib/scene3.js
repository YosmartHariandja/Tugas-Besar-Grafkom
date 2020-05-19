function draw() {
    requestAnimationFrame(draw);
    console.log(mouse);
    addEventListener('mousemove', onMouseMove, false);

    let pos = new THREE.Vector3();
    let v = pos.add(mouse);

    let mat = new THREE.LineBasicMaterial(0xFFFFFF);

    let points = [];
    points.push(new THREE.Vector3());
    points.push(v);

    let geo = new THREE.BufferGeometry().setFromPoints(points);

    let line = new THREE.Line(geo, mat);
    scene.add(line);

    renderer.render(scene, cam);
}

draw();