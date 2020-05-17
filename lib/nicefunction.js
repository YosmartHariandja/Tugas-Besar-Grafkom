function random(min, max) {
    return min + Math.random() * (max - min);
}

function randUnitVec2D() {
    let vec = new THREE.Vector3(random(-1,1), random(-1,1), 0);
    return vec.normalize();
}