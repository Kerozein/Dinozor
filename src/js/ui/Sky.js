import * as THREE from 'three';
import Cloud from "./Cloud";

export default class Sky extends THREE.Object3D{
    clouds = [];
    constructor() {
        super();
        let numberOfClouds = 20;

        //angle to distribute clouds
        let stepAngle = Math.PI*2 / numberOfClouds;

        //create clouds
        for(let i=0; i<numberOfClouds; i++){
            let c = new Cloud();
            let a = stepAngle*i;
            let h = 750+ Math.random()*200;
            c.position.y = Math.sin(a)*h;
            c.position.x = Math.cos(a)*h;
            c.rotation.z = a + Math.PI/2;
            c.position.z = -400-Math.random()*400;

            let s = 1+Math.random()*2;
            c.scale.set(s,s,s);
            this.add(c);
            this.clouds.push(c);
        }
    }

    moveClouds(){
        this.clouds.forEach((c)=>{
            c.rotate();
        })
        this.rotation.z += 0.0001;
    }
}