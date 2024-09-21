

class BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }
}

class BoundingBox3D {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;

    constructor(x: number, y: number, z: number, width: number, height: number, depth: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    contains(x: number, y: number, z: number): boolean {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height && z >= this.z && z <= this.z + this.depth;
    }
}

export { BoundingBox };