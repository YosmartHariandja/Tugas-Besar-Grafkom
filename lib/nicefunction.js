function random(min, max) {
    return min + Math.random() * (max - min);
}

function randUnitVec2D() {
    let vec = new THREE.Vector3(random(-1,1), random(-1,1), 0);
    return vec.normalize();
}

// https://discourse.threejs.org/t/functions-to-calculate-the-visible-width-height-at-a-given-z-depth-from-a-perspective-camera/269
const visibleHeightAtZDepth = ( depth, camera ) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if ( depth < cameraOffset ) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180; 

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};

const visibleWidthAtZDepth = ( depth, camera ) => {
  const height = visibleHeightAtZDepth( depth, camera );
  return height * camera.aspect;
};

function onMouseMove(event) {
    mouse.x = ((event.clientX / window.innerWidth) * 2 - 1) * visibleWidthAtZDepth(true, cam) / 2;
    mouse.y = (- (event.clientY / window.innerHeight) * 2 + 1) * visibleHeightAtZDepth(true, cam) / 2;
}