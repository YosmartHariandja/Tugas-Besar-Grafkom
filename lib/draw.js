let start = new THREE.Vector3();

var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );

let physics = new Physics(start.x, start.y,sphere);

function draw() {
    requestAnimationFrame(draw);

    physics.show();
    physics.update();

    renderer.render( scene, cam );
}
draw();