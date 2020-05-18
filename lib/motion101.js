class Motion{
    constructor(x, y, object)
    {
        this.pos = new THREE.Vector3(x, y, 0);
        this.velo = randUnitVec2D();
        this.velo.multiplyScalar(random(0,3));
        this.acc = randUnitVec2D();
        this.acc.setLength(0.01);

        this.mesh = object;
    }

    speedometer()
    {
        return Math.floor(this.velo.length() * 3.6) + ' km/h';
    }

    update()
    {
        this.velo.add(this.acc);
        this.pos.add(this.velo);
    }
    show()
    {
        this.mesh.position.x = this.pos.x;
        this.mesh.position.y = this.pos.y;
        this.mesh.position.z = this.pos.z;
    }
}