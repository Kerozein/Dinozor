import * as THREE from 'three';

export default class Cactus extends THREE.Object3D {
    constructor() {
        super();
        let geom = new THREE.CylinderGeometry(5,5,100,8,1);
        let mat = new THREE.MeshLambertMaterial({color:0x234f1e,});
        let base = new THREE.Mesh(geom,mat);
        base.receiveShadow = true;
        let geom1 = new THREE.CylinderGeometry(3,3,20,8,1);
        let base1 = new THREE.Mesh(geom1,mat);
        base1.rotateZ(Math.PI/2)
        base1.translateY(10)
        base.add(base1)
        this.add(base);
        console.log(this)
    }
}