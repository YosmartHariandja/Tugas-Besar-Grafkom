class Physics{
    constructor(x, y, object)
    {
        this.pos = new THREE.Vector3(x, y, 0);
        this.velo = randUnitVec2D();
        this.velo.multiplyScalar(random(0,20));

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
    }
}