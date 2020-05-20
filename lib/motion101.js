class Motion {
    constructor(starPos, object, weight) {
        this.pos = new THREE.Vector3(starPos.x, starPos.y, starPos.z);
        this.velo = new THREE.Vector3();
        this.acc = new THREE.Vector3();
        this.mass = weight;

        this.mesh = object;
    }

    speedometer() {
        return Math.floor(this.velo.length() * 3.6) + ' km/h';
    }
    edges3d(edge)
    {
        let bottom = edge.y;
        if(this.pos.y <= bottom)
        {
            this.pos.y = bottom;
            this.drag(1);

            return true;
        }
    }

    edges(edge) {
        let bottom = -(edge.y / 2);
        let right = edge.x / 2;
        let left = -(edge.x / 2);

        if (this.pos.y <= bottom) {
            this.pos.y = bottom;
            this.velo.y *= -1;
        }

        if (this.pos.x >= right) {
            this.pos.x = right;
            this.velo.x *= -1;
        }
        else if (this.pos.x <= left) {
            this.pos.x = left;
            this.velo.x *= -1;
        }
    }

    friction(edge) {
        let diff = -(edge.y / 2) - this.pos.y;
        if (diff > 0) {
            let friction = this.velo.clone();
            friction.normalize();
            friction.multiplyScalar(-1);

            let mu = 0.1;
            let normal = this.mass;
            friction.setLength(mu * normal);

            this.applyForce(friction);
        }
    }

    drag(dragC) {
        let drag = this.velo.clone();
        drag.normalize();
        drag.multiplyScalar(-1);

        let c = dragC;
        let speedSq = this.velo.lengthSq();
        drag.setLength(c * speedSq);

        this.applyForce(drag);
    }

    applyForce(force) {
        let f = ((new THREE.Vector3()).add(force)).divideScalar(this.mass);
        this.acc.add(f);
    }

    update() {
        this.velo.add(this.acc);
        this.pos.add(this.velo);
        this.acc = new THREE.Vector3();
    }
    show() {
        this.mesh.position.x = this.pos.x;
        this.mesh.position.y = this.pos.y;
        this.mesh.position.z = this.pos.z;
    }
}