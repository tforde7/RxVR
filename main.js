import * as BABYLON from '@babylonjs/core'
import { Inspector } from '@babylonjs/inspector'

const canvas = document.getElementById('renderCanvas')
const ANTI_ALIASING = true
const engine = new BABYLON.Engine(canvas, ANTI_ALIASING)

const createSkyBox = (scene) => {
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 1000}, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
}

const createCUH = (scene) => {
  BABYLON.SceneLoader.ImportMesh("", "assets/models/", "cuh.glb", scene, (newMeshes) => {
    newMeshes.forEach((mesh) => { console.log(mesh.name) })
    }
  )
}

var createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // PHYSICS
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

  // CAMERA

  const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1, -5), scene);
  camera.attachControl(canvas, true);
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  camera.applyGravity = true;
  camera.checkCollisions = true;

    // LIGHT
    // const light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(3.29, 1.50, -12.93), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
    // light.diffuse = new BABYLON.Color3(1, 0.8, 0.2588);
    // light.intensity = 10;

    // const light02 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(126.02, 3, 50), new BABYLON.Vector3(0, -1, 0), 6.283, 2, scene);
    // light02.diffuse = new BABYLON.Color3(0.3, 0.63, 1);
    // light02.intensity = 10;

    const light3 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    // GROUND
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1000, height: 1000, subdivisions: 50}, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/ground/ground_pavement_concretecobble_04.png", scene);
    ground.material = groundMaterial;
    ground.checkCollisions = true;
  
    const skyBox = createSkyBox(scene);
    const cuh = createCUH(scene);
    
  return scene;

};

const scene = createScene()

// Render loop function to continuously render the scene
engine.runRenderLoop(function() {
  scene.render()
})

// Event listener for window resize to handle canvas resizing
window.addEventListener('resize', function() {
  engine.resize()
})

// Inspector.Show(scene, {})
