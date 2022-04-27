import * as THREE from 'three';

export default class Desert extends THREE.Object3D{
    constructor() {
        super();
        let geom = new THREE.CylinderGeometry(600,600,800,40,10);
        geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        let mat = new THREE.MeshPhongMaterial({
            color:0xf7d9aa,
            transparent:false,
            opacity:.6,
            flatShading:true,
        });
        let base = new THREE.Mesh(geom,mat);
        base.receiveShadow = true;
        this.add(base);
    }
}