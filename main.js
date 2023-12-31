import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Position the camera
camera.position.z = 3;

let earth;
// load GLTF model
const loader = new GLTFLoader();
loader.load('./earth.glb', function (gltf) {
    // Scale down the model
    const scale = 0.0013; // Adjust this value as needed
    earth = gltf.scene;
    gltf.scene.scale.set(scale, scale, scale);

    // Calculate the new bounding box
    const bbox = new THREE.Box3().setFromObject(gltf.scene);
    const center = bbox.getCenter(new THREE.Vector3());

    // Center the model
    gltf.scene.position.x = -center.x;
    gltf.scene.position.y = -center.y;
    gltf.scene.position.z = -center.z;

    gltf.scene.rotation.y = Math.PI;
    scene.add(gltf.scene);

    // Add a soft white ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    // console log bbox
    console.log(bbox);

    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color : child.material.color,
                map: child.material.map,
            })
        }
    })

    console.log('Model loaded:', gltf);

}, undefined, function (error) {
    console.error(error);
});

loader.load('./ISS_stationary.glb', function (gltf) {
    // Scale down the model
    const scale = 0.001; // Adjust this value as needed
    const iss = gltf.scene;
    gltf.scene.scale.set(scale, scale, scale);

    // Calculate the new bounding box
    const bbox = new THREE.Box3().setFromObject(gltf.scene);
    const center = bbox.getCenter(new THREE.Vector3());

    // Center the model
    gltf.scene.position.x = 1;
    gltf.scene.position.y = 0.6;
    gltf.scene.position.z = 0;

    gltf.scene.rotation.y = Math.PI;
    scene.add(gltf.scene);

    // Add a soft white ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.001);
    scene.add(ambientLight);

    // console log bbox
    console.log("ISS : ",  bbox);

    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color : child.material.color,
                map: child.material.map,
            })
        }
    })

    console.log('Model loaded:', gltf);
})

var moon;

loader.load('./moon.glb', function (gltf) {
    // Scale down the model
    const scale = 0.0003; // Adjust this value as needed
    moon = gltf.scene;
    gltf.scene.scale.set(scale, scale, scale);

    // Calculate the new bounding box
    const bbox = new THREE.Box3().setFromObject(gltf.scene);
    const center = bbox.getCenter(new THREE.Vector3());

    // Center the model
    gltf.scene.position.x = 1;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;

    gltf.scene.rotation.y = Math.PI;
    scene.add(gltf.scene);

    // Add a soft white ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.001);
    scene.add(ambientLight);

    // console log bbox
    console.log("ISS : ",  bbox);

    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color : child.material.color,
                map: child.material.map,
            })
        }
    })

    console.log('Model loaded:', gltf);
})

// if I wheel the mouse, the camera will zoom in and out
document.addEventListener('wheel', (event) => {
    camera.position.z += event.deltaY * 0.01;
});

var stars = new THREE.Group();

for (let i = 0; i < 3000; i++) {
    const geometry = new THREE.SphereGeometry(0.33, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;
    sphere.position.z = Math.random() * 1000 - 500;
    stars.add(sphere);
}

scene.add(stars);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000, 1);
document.getElementById("header").appendChild(renderer.domElement);

let angle = 0;
let orbitSpeed = 0.01;
// Animate
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (earth) {
        earth.rotation.y += 0.01;
    }
    angle += orbitSpeed;
    moon.position.x = Math.cos(angle) * 1;
    moon.position.z = Math.sin(angle) * 1;
    moon.rotation.y += 0.01;
}

animate();
