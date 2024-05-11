// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // FOV, Aspect Ratio, ...
const renderer = new THREE.WebGLRenderer();

// Set Size for 3d area
renderer.setSize(window.innerWidth, window.innerHeight);

// Adds renderer as an element to the body in HTML
document.body.appendChild(renderer.domElement);

// Camera Orbitting Variables
const orbitRadius = 90; // Radius of the orbit
const orbitSpeed = 0.0015; // Speed of orbit
let orbitAngle = 0; // Initial angle

// Create a torus geometry/shape
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({ color: 0xff6347}); 

// Creates a mesh (and combines geometry and material)
const donut = new THREE.Mesh(geometry, material);

// Adds shape to the scene
scene.add(donut);

// Directional Light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
directionalLight.position.set(0, 10, 0)
scene.add( directionalLight );

// Light Object
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15  );
scene.add(ambientLight)

// const lightHelper = new THREE.PointLightHelper(directionalLight);
// scene.add(lightHelper)

// Grid Helper
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)

// Gets dom events from mouse
    // const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff})
    const star = new THREE.Mesh( geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    
    star.position.set(x, y, z)
    scene.add(star)
}

new Array(300).fill().forEach(addStar)

// Create an animate function
function animate() {
    requestAnimationFrame(animate);
    // Initialize scene, camera, and renderer
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Update the camera's projection matrix
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Rotate the donut
    // donut.rotation.x += 0.01;
    // donut.rotation.y += 0.015;
    // donut.rotation.z += 0.005;

    // if (donut.rotation.z === 360){
    //     donut.rotation.z = 0
    // }

    // if (donut.rotation.y === 360){
    //     donut.rotation.y = 0
    // }

    // if (donut.rotation.x === 360){
    //     donut.rotation.x = 0
    // }


    // if (camera.position.z > 90){
    //     camera_moveZ = -0.1
    // }

    // if (camera.position.z < 30){
    //     camera_moveZ = 0.1
    // }


    // camera.position.x += 0.1
    // camera.rotation.y += 0.001

    // Update orbitAngle
    orbitAngle += orbitSpeed;

    // Calculate new position of the orbiting object relative to the center object
    const x = donut.position.x + Math.cos(orbitAngle) * orbitRadius;
    const z = donut.position.z + Math.sin(orbitAngle) * orbitRadius;
    camera.position.set(x, donut.position.y, z);

    // Rotate the orbiting object (optional)
    camera.lookAt(0, 0, 0)

    // Render the scene
    renderer.render(scene, camera);
}

// Call recursive "animate" function
animate();