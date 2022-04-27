import * as THREE from 'three';

export default class Cloud extends THREE.Object3D{
    constructor() {
        super();
        let geom = new THREE.BoxGeometry(20,20,20);
        let mat = new THREE.MeshPhongMaterial({color:0xd8d0d1});

        //duplicate geo rdm number of time
        let nBlocs = 3+Math.floor(Math.random()*3);
        for (let i=0; i<nBlocs; i++ ){

            // create the mesh by cloning the geometry
            let m = new THREE.Mesh(geom, mat);

            // set the position and the rotation of each cube randomly
            m.position.x = i*15;
            m.position.y = Math.random()*10;
            m.position.z = Math.random()*10;
            m.rotation.z = Math.random()*Math.PI*2;
            m.rotation.y = Math.random()*Math.PI*2;

            // set the size of the cube randomly
            let s = .1 + Math.random()*.9;
            m.scale.set(s,s,s);

            // allow each cube to cast and to receive shadows
            m.castShadow = true;
            m.receiveShadow = true;

            // add the cube to the container we first created
            this.add(m);
        }

    }

    rotate(){
        this.children.forEach((m)=>{
            m.rotation.z+= Math.random()*.005;
            m.rotation.y+= Math.random()*.002;
        })
    }
}
