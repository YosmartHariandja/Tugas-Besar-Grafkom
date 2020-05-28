var pointLight = new THREE.PointLight("white", 1, 0);
pointLight.position.set(-10, 30, 10);
scene.add(pointLight);

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

let pLight = new THREE.AmbientLight("white");
scene.add(pLight)

let controls = new THREE.OrbitControls(cam, renderer.domElement);

var xS = 400, yS = 400;
var terrainScene = THREE.Terrain({
    easing: THREE.Terrain.Linear,
    frequency: 2.5,
    heightmap: THREE.Terrain.DiamondSquare,
    material: new THREE.MeshBasicMaterial({

        map: new THREE.TextureLoader().load("texture/4.jpg"
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
    ySize: 2000,
    
});
terrainScene.position.y = -100;
scene.add(terrainScene);

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