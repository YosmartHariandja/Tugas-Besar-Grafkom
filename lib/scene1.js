function draw() {
    requestAnimationFrame(draw);
    
    let v = randUnitVec2D();
    v.multiplyScalar(random(50, 100));

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