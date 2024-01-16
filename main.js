import * as BABYLON from '@babylonjs/core'
import { Inspector } from '@babylonjs/inspector'

const canvas = document.getElementById('renderCanvas')
const ANTI_ALIASING = true
const engine = new BABYLON.Engine(canvas, ANTI_ALIASING)
const CAMERA_START_POSITION = new BABYLON.Vector3(215, 66, 463)

const createSkyBox = (scene) => {
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 4000}, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
  skybox.checkCollisions = true;
  return skybox
}

const createCUH = (scene, skyBox) => {
  console.log(skyBox)
  BABYLON.SceneLoader.ImportMesh("", "assets/models/", "cuh-2.glb", scene, (newMeshes) => {
    newMeshes.forEach((mesh) => { 
      console.log(mesh.name) 
      mesh.checkCollisions = true

      const mainEntrance = newMeshes.find(mesh => mesh.name === "Main Entrance")
      var glassMtl = new BABYLON.PBRMaterial("glassMtl", scene);
      glassMtl.metallic = 0;
      glassMtl.transparencyMode = BABYLON.PBRMaterial.MATERIAL_ALPHABLEND;
      glassMtl.alpha = 0.1;
      glassMtl.roughness = 0.01;
      glassMtl.subSurface.isRefractionEnabled = true;
      mainEntrance.material = glassMtl;
    })
    }
  )

}

const createVictoria = (scene) => {
  BABYLON.SceneLoader.ImportMesh("", "assets/models/", "victoria.glb", scene, (newMeshes) => {
    
    const root = newMeshes[0]
    root.position = new BABYLON.Vector3(153, 64, 476)
    root.scaling = new BABYLON.Vector3(8, 8, 8)
    root.setPivotMatrix(BABYLON.Matrix.Identity());




    root.rotation.y = Math.PI / 2
    // root.rotation.y = Math.PI / 2

    root.checkCollisions = true
    root.applyGravity = true
    newMeshes.forEach((mesh) => { 
      mesh.checkCollisions = true
    })
    }
  )
}

var createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // PHYSICS
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

  // CAMERA

  const camera = new BABYLON.UniversalCamera("camera", CAMERA_START_POSITION, scene);
  camera.attachControl(canvas, true);
  camera.ellipsoid = new BABYLON.Vector3(4, 4, 4);
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.setTarget(new BABYLON.Vector3(133, 64, 446));
  camera.minZ = 0.5

    // Log position every frame
  // scene.registerBeforeRender(() => {
  //   console.log(camera.position); 
  // });


    // LIGHT
    // const light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(3.29, 1.50, -12.93), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
    // light.diffuse = new BABYLON.Color3(1, 0.8, 0.2588);
    // light.intensity = 10;

    // const light02 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(126.02, 3, 50), new BABYLON.Vector3(0, -1, 0), 6.283, 2, scene);
    // light02.diffuse = new BABYLON.Color3(0.3, 0.63, 1);
    // light02.intensity = 10;

    const light3 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    // GROUND
    // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1000, height: 1000, subdivisions: 50}, scene);
    // const groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
    // groundMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/ground/ground_pavement_concretecobble_04.png", scene);
    // ground.material = groundMaterial;
    // ground.checkCollisions = true;
  
    const skyBox = createSkyBox(scene);
    console.log(skyBox)
    const cuh = createCUH(scene, skyBox);
    const victoria = createVictoria(scene);
    
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
