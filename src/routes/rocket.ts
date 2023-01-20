import { AmbientLight, ArrowHelper, Color, DirectionalLight, Euler, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { wait } from "$lib/timing";

import { getWorker } from "$lib/conditional-worker";
import type { WorkerMessage, HostMessage } from "$lib/three-msg";

const liftoff_heigth = 20;
const liftoff_coefficient = 4e-3;
const camera_distance = 7.5;
const FOV = 75;
const rot = new Euler(Math.PI/3, Math.PI/4, Math.PI/16, 'YXZ');

const scene = new Scene();
function setSceneBg(dark: boolean) { scene.background = new Color(dark ? 0x121212 : 0xefefef); }


const camera = new PerspectiveCamera(FOV, 1, .1, 100);
camera.rotation.copy(rot);
camera.position.set(1, 0, liftoff_heigth + 7);
camera.position.add(new Vector3(0,0,camera_distance).applyEuler(rot));
// camera.position.z = 20;

const directional_light = new DirectionalLight(0xffffff, 4.5);
directional_light.position.set(2, .5, 1);
scene.add(directional_light);

const ambient_light = new AmbientLight(0xffffff, .25);
scene.add(ambient_light);

function randomDisplacement(w: number = 3e-3) { return (Math.random()-0.5)*w; }

let renderer: WebGLRenderer;
let yshift = 0

const { post } = getWorker<WorkerMessage, HostMessage>(msg => {
    switch(msg.type) {
        case "canvas": {
            const [ canvas, width, height, ratio ] = msg.data;
            //@ts-ignore
            if (!canvas.style) canvas.style = { width, height }
            renderer = new WebGLRenderer({canvas, antialias: true});
            setSizes(width, height);
            renderer.setPixelRatio(ratio);
            loadScene();
            break;
        }
        case "resize": {
            setSizes(msg.data[0], msg.data[1]);
            break;
        }
        case "scroll": {
            yshift = msg.data;
            break;
        }
        case "dark": {
            console.log("theme");
            setSceneBg(msg.data);
            break;
        }
    }
});

function setSizes(w: number, h: number) {
    renderer.setSize(w,h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
}

function startAnimation(obj: Object3D) {
    let height = 0;
    let req = requestAnimationFrame(animate);

    function animate(time: number) {
        obj.rotateY(2e-3);

        if(height < liftoff_heigth) {
            height += liftoff_coefficient*Math.pow(liftoff_heigth-height, 1.5);
            obj.position.z = height;
        }
        camera.position.set(1, 0, liftoff_heigth + 7);
        camera.position.add(new Vector3(0, yshift,camera_distance).applyEuler(rot));
        renderer.render(scene, camera);
        req = requestAnimationFrame(animate);
    }
}

function addAxisArrows(origin?: Vector3) {
    if(!origin) origin = new Vector3(0,0,0);
    scene.add(
        new ArrowHelper(new Vector3(1,0,0), origin, 1, 0xff0000, .2, .1),
        new ArrowHelper(new Vector3(0,1,0), origin, 1, 0x00ff00, .2, .1),
        new ArrowHelper(new Vector3(0,0,1), origin, 1, 0x0000ff, .2, .1)
    );
}

export async function loadScene() {
    await wait(200);
    try {
        // addAxisArrows();
        // addAxisArrows(new Vector3(0,0,liftoff_heigth));

        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync("/assets/Rocket.glb", e => post({type: "load", data: e.loaded/e.total}));
        const rocket = gltf.scene;
        rocket.scale.multiplyScalar(4);
        rocket.rotateX(Math.PI/2);
        scene.add(rocket);
        // console.dir(rocket);
        startAnimation(rocket);

        await wait(200);
        post({type: "done",data: null})
    } catch(e) {
        console.log("Couldn't load the rocket");
        console.dir(e);
    }
}
