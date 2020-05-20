let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    1000
);
let renderer= new THREE.WebGLRenderer();
cam.position.y =30;
cam.position.z =40;
cam.rotation.x =-0.5;
scene.background = new THREE.Color("black");
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

let gird = new THREE.GridHelper(100,100,0x483D8B,0x4B0082);
gird.position.set(0,-1,0);
scene.add(gird);

var pointLight = new THREE.PointLight( "white",2,0 );
pointLight.position.set( -10, 30, 10 );
scene.add( pointLight );

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

let pLight = new THREE.AmbientLight("white");
scene.add(pLight)

let controls = new THREE.OrbitControls(cam , renderer.domElement);

let cGeo = new THREE.BoxGeometry(100,0.1,100,200,200,200);
let tex=[
new THREE.MeshBasicMaterial({
    transparent:true,
            
}),
new THREE.MeshBasicMaterial({
    transparent:true,
            
}),
new THREE.MeshPhongMaterial({
    color:"white",
    // wireframe: true,
    map: new THREE.TextureLoader().load("texture/1.jpg"),
    displacementMap: new THREE.TextureLoader().load("texture/1.jpg"),
    displacementScale: 3,
}),
new THREE.MeshBasicMaterial({
    transparent:true,
            
}),
new THREE.MeshBasicMaterial({
    transparent:true,
            
}),
new THREE.MeshBasicMaterial({
    transparent:true,
            
}),

];
let cMesh = new THREE.Mesh(cGeo,tex);
scene.add(cMesh);



let plane;
let loader = new THREE.GLTFLoader().load("3d/plane.gltf",function(result){
    console.log(result);
    plane= result.scene;
    scene.add(plane);
    plane.position.y = 10;
    plane.scale.set(0.1,0.1,0.1);

    result.animations; 
    result.scene; 
    result.scenes; 
    result.cameras;
    result.asset; 
    
});


function draw(){
    renderer.render(scene,cam);
    requestAnimationFrame(draw);
}
draw();