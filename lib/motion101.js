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

    edges(edge)
    {
        let bottom = -(edge.y / 2);
        let right =  edge.x / 2;
        let left = -(edge.x / 2);

        if(this.pos.y <= bottom)
        {
            this.pos.y = bottom;
            this.velo.y *= -1;
        }

        if(this.pos.x >= right)
        {
            this.pos.x = right;
            this.velo.x *= -1;
        }
        else if(this.pos.x <= left)
        {
            this.pos.x = left;
            this.velo.x *= -1;
        }
    }

    applyForce(force)
    {
        this.acc.add(force);
    }

    update(mouse)
    {
        // this.acc = ((new THREE.Vector3()).add(mouse)).sub(this.pos);
        // this.acc.setLength(0.1);

        this.velo.add(this.acc);
        this.pos.add(this.velo);
        this.acc = new THREE.Vector3();
    }
    show()
    {
        this.mesh.position.x = this.pos.x;
        this.mesh.position.y = this.pos.y;
        this.mesh.position.z = this.pos.z;
    }
}