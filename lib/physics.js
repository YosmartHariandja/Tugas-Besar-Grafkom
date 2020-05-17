class Physics{
    constructor(x, y, object)
    {
        this.pos = new THREE.Vector3(x, y, 0);
        this.velo = new THREE.Vector3(1,1,0);
        this.mesh = object;
    }

    update()
    {
        this.pos.add(this.velo);
    }
    show()
    {
        this.mesh.position.x = this.pos.x;
        this.mesh.position.y = this.pos.y;
        this.mesh.position.z = this.pos.z;
        
        scene.add(this.mesh);
    }
}