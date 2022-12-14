import './style.css'

import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const  renderer= new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry= new THREE.TorusGeometry( 10, 3, 16, 100 )
const material= new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus= new THREE.Mesh( geometry, material );

scene.add(torus)

const pointLight= new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight= new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);



function addstar(){
  const geometry= new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color : 0xffffff})
  const star = new THREE.Mesh(geometry, material);
  const[x, y, z] = Array(5).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star)

}
Array(500).fill().forEach(addstar)

const spaceTexture= new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const akshayTexture= new THREE.TextureLoader().load('akshay.jpg');

const akshay= new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshBasicMaterial({map: akshayTexture})
);
scene.add(akshay);

const planetTexture= new THREE.TextureLoader().load('moon.jpg');
const paternTexture= new THREE.TextureLoader().load('texture.jpg');
const planet= new THREE.Mesh(
  new THREE.SphereGeometry(4,50,50),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: paternTexture
  })
) ;
scene.add(planet);

planet.position.z=6;
planet.position.setX(-25);
planet.position.setY(-6);

function moveCamera(){
  const t= document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.025;
  planet.rotation.y += 0.025;
  planet.rotation.z += 0.025;

  akshay.rotation.x += 0.025
  akshay.rotation.y += 0.025;
  akshay.rotation.z += 0.025;

  camera.rotation.z = t* -0.01;
  camera.rotation.x = t* -0.0002;
  camera.rotation.y = t* -0.0002;

  star.rotation.x += 0.5;
  star.rotation.y += 0.5;
  star.rotation.z += 0.5;


}
document.body.onscroll = moveCamera


function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );
}
animate() 