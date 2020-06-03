let water = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(16384 + 1024, 16384 + 1024, 16, 16),
    new THREE.MeshLambertMaterial({ color: 0x006ba0, transparent: true, opacity: 0.6,map: new THREE.TextureLoader().load("texture/4.jpg"
    ) })
);
water.position.y = -120;
water.rotation.x = -0.5 * Math.PI;
scene.add(water);

var pointLight = new THREE.PointLight("white", 1, 0);
pointLight.position.set(-10, 30, 10);
scene.add(pointLight);


// let pLight = new THREE.AmbientLight("white");
// scene.add(pLight);

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
light.position.set(-10, 30, 10);
scene.add( light );

var xS = 400, yS = 400;
var terrainScene = THREE.Terrain({
    easing: THREE.Terrain.Linear,
    frequency: 2.5,
    heightmap: THREE.Terrain.DiamondSquare,
    material: new THREE.MeshBasicMaterial({

        map: new THREE.TextureLoader().load("texture/abstract-low-poly-background_1048-7729.jpg"
        ),
        // wireframe: true,
    }),
    maxHeight: 100,
    minHeight: -100,
    steps: 1,
    useBufferGeometry: false,
    xSegments: xS,
    xSize: 2000,
    ySegments: yS,
    ySize: 10000,

});
terrainScene.position.y = -100;
terrainScene.position.z = -5000;
scene.add(terrainScene);

let weight = 1;
let startV = new THREE.Vector3(0, 10, 0);
let edges3D = new THREE.Vector3(0, water.position.y, 0);

let plane;
let glidder = new Motion(startV, null, weight);

let loader = new THREE.GLTFLoader().load("3d/plane.gltf", function (result) {
    plane = result.scene;
    plane.scale.set(0.1, 0.1, 0.1);
    scene.add(plane);


});