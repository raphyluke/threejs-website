import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Position the camera
camera.position.z = 5;

// Create a black sphere
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(geometry, material);
// Add the sphere to the scene
scene.add(sphere);

// add lightning around the sphere
const light = new THREE.PointLight(0xffffff, 100, 1000);
light.position.set(0, 0, 0);
scene.add(light);

// if I wheel the mouse, the camera will zoom in and out
document.addEventListener('wheel', (event) => {
    camera.position.z += event.deltaY * 0.01;
});


for (let i = 0; i < 1000; i++) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;
    sphere.position.z = Math.random() * 1000 - 500;
    scene.add(sphere);
}

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere for a bit of animation
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate(); // Start the animation loop
