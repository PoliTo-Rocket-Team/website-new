import { AmbientLight, ArrowHelper, Box3, Color, DirectionalLight, Euler, Group, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { wait } from "$lib/timing";

import { getCanvasWorker } from "$lib/conditional-worker";
import type { HostMessageMap, WorkerMessageMap } from "./worker-msg";

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

const directional_light = new DirectionalLight(0xffffff, 1.5);
directional_light.position.set(2, .5, 1);
scene.add(directional_light);

const ambient_light = new AmbientLight(0xffffff, .2);
scene.add(ambient_light);

function randomDisplacement(w: number = 3e-3) { return (Math.random()-0.5)*w; }

let renderer: WebGLRenderer;
let yshift = 0

const post = getCanvasWorker<WorkerMessageMap,HostMessageMap>(data => {
    renderer = new WebGLRenderer({canvas: data.canvas, antialias: true});
    setSizes(data.width, data.height);
    renderer.setPixelRatio(data.pixelRatio);
    loadScene();
}, {
    resize(data) {
        setSizes(data[0], data[1]);
        renderer.setPixelRatio(data[2]);
    },
    scroll(data) { yshift = data; },
    dark: setSceneBg
});

function setSizes(w: number, h: number) {
    renderer.setSize(w,h,false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
}

function startAnimation(obj: Object3D) {
    let height = 0;
    let req = requestAnimationFrame(animate);

    function animate(time: number) {
        obj.rotateZ(2e-3);

        if(height < liftoff_heigth) {
            height += liftoff_coefficient*Math.pow(liftoff_heigth-height, 1.5);
            obj.position.z = height;
        }
        camera.position.set(1, 0, liftoff_heigth + 6);
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

/** 
 * @see {@link https://stackoverflow.com/questions/46164308/how-to-center-a-three-group-based-on-the-width-of-its-children} 
 * @see {@link https://stackoverflow.com/questions/28848863/threejs-how-to-rotate-around-objects-own-center-instead-of-world-center}
 * - create axis-aligned bounding box of object
 * - get the center
 * - translate it
 * - wraps it into a group so that local rotation are normal
 */
function placeAtCenter(obj: Object3D) {
    const center = new Vector3(0,0,0);
    const box = new Box3().setFromObject(obj);
    box.getCenter(center);
    obj.position.setX(-center.x);
    obj.position.setY(-center.y);
    const pivot = new Group();
    pivot.add(obj);
    return pivot;
}

export async function loadScene() {
    await wait(100);
    try {
        // addAxisArrows();
        // addAxisArrows(new Vector3(0,0,liftoff_heigth));

        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync("/assets/Rocket.glb", e => post("load", e.loaded/e.total));
        const rocket = gltf.scene;
        rocket.scale.multiplyScalar(0.5);
        rocket.rotateX(Math.PI/2);
        const pivot = placeAtCenter(rocket)
        scene.add(pivot);
        startAnimation(pivot);

        await wait(100);
        post("done", void 0);
    } catch(e) {
        console.log("Couldn't load the rocket");
        console.dir(e);
    }
}
