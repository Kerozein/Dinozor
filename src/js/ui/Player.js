import * as THREE from 'three';
import {TWEEN} from "three/examples/jsm/libs/tween.module.min";
export default class Player extends THREE.Object3D{
    #offset = {x:0,y:10,z:-250};
    constructor() {
        super();
        let geom = new THREE.BoxGeometry(20,40,20,8,1);
        let mat = new THREE.MeshLambertMaterial({color:0x000000});
        let base = new THREE.Mesh(geom,mat);
        base.translateZ(this.#offset.z);
        base.receiveShadow = true;
        this.add(base);
        this.position.y = this.#offset.y;
    }

    run(){

    }

    jump(){
        let jump = new TWEEN.Tween(this.position).to({y:this.#offset.y+100}, 200);
        let fall = new TWEEN.Tween(this.position).to({y:this.#offset.y }, 200);
        fall.delay(150)
        jump.chain(fall);
        jump.start();
    }

}
