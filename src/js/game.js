import * as THREE from 'three';
import Sea from "./ui/Sea";
import Sky from "./ui/Sky";

export default class Game{
    scene;
    camera;
    renderer;

    constructor() {
        this.createScene();
        this.createLights();
        //createPlane();
        this.createSea();
        this.createSky();
        //loop();
        console.log(this.scene)
        console.log(this.camera)
    }


    createScene(){
        let HEIGHT = window.innerHeight;
        let WIDTH = window.innerWidth;

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xf7d9aa,100,950);

        let aspectRatio = WIDTH / HEIGHT;
        let fieldOfView = 60;
        let nearPlane = 1;
        let farPlane = 10000;

        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );


        this.camera.position.x = 0;
        this.camera.position.z = 200;
        this.camera.position.y = 100;
        this.camera.lookAt(new THREE.Vector3(0, 400, 0));

        this.renderer = new THREE.WebGLRenderer({alpha:true, antialias: true});
        this.renderer.setSize(WIDTH, HEIGHT);
        this.renderer.shadowMap.enabled = true;

        let container = document.getElementById('world');
        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.handleWindowResize, false);
    }

    handleWindowResize() {
        let HEIGHT = window.innerHeight;
        let WIDTH = window.innerWidth;
        this.renderer.setSize(WIDTH, HEIGHT);
        this.camera.aspect = WIDTH / HEIGHT;
        this.camera.updateProjectionMatrix();
    }

    createLights(){
        let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

        let shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
        shadowLight.position.set(150, 350, 350);

        shadowLight.castShadow = true;
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;

        //Resolution shadows
        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;

        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);

        let ch = new THREE.CameraHelper(shadowLight.shadow.camera);

        this.scene.add(ch);
    }

    createSea(){
        let sea = new Sea();
        sea.position.y = -600;
        this.scene.add(sea);
    }

    createSky(){
        let sky = new Sky();
        sky.position.y = -600;
        this.scene.add(sky);
    }
}




