import * as THREE from 'three';
import Cactus from "./Cactus";

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

    addCactus(){
        let numberOfCactus = 7;
        let stepAngle = Math.PI*2 / numberOfCactus;
        for(let i=0; i<numberOfCactus; i++){
            let c = new Cactus();
            let a = stepAngle*i;
            let h = 620;
            c.position.y = Math.sin(a)*h;
            c.position.x = Math.cos(a)*h;
            c.rotation.z = a + Math.PI/2;
            c.position.z = -250-Math.random()*100;

            let s = 1+Math.random()*2;
            c.scale.set(s,s,s);
            this.add(c);
        }
    }

    animate(){
        this.rotation.z += 0.002;
    }
}