import * as THREE from 'three';
import Desert from "./ui/Desert";
import Sky from "./ui/Sky";
import { GUI } from 'dat.gui'
import Player from "./ui/Player";
import {TWEEN} from "three/examples/jsm/libs/tween.module.min";

export default class Game{
    scene;
    camera;
    renderer;
    debug;
    sky;
    desert;

    constructor() {
        this.createScene();
        this.createLights();
        this.createDesert();
        this.createSky();
        this.createPlayer();
        //loop();
        requestAnimationFrame(()=>this.render());
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

        this.renderer = new THREE.WebGLRenderer({alpha:true, antialias: true});
        this.renderer.setSize(WIDTH, HEIGHT);
        this.renderer.shadowMap.enabled = true;

        let container = document.getElementById('world');
        container.appendChild(this.renderer.domElement);

        this.createDebugMenu();

        window.addEventListener('resize', this.handleWindowResize, false);
        window.addEventListener('keyup', (e)=>{ if(e.key === " ") this.player.jump()});
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
    }

    createDesert(){
        this.desert = new Desert();
        this.desert.position.y = -600;
        this.desert.addCactus();
        this.scene.add(this.desert);

    }

    createSky(){
        this.sky = new Sky();
        this.sky.position.y = -600;
        this.scene.add(this.sky);
    }

    createDebugMenu(){
        this.debug = new GUI();
        let cameraFolder = this.debug.addFolder('Camera');
        cameraFolder.add( this.camera.position, 'x', -100, 100, 0.01 ).name('X-axis');
        cameraFolder.add( this.camera.position, 'y', -100, 100, 0.01 ).name('Y-axis');
        cameraFolder.add( this.camera.position, 'z', -100, 100, 0.01 ).name('Z-axis');

    }

    render(){
        requestAnimationFrame(()=>this.render());
        this.sky.moveClouds();
        this.desert.animate();
        this.player.run();
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
    }

    createPlayer() {
        this.player = new Player();
        console.log(this.player)
        this.scene.add(this.player);
    }
}




