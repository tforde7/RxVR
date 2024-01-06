import * as BABYLON from '@babylonjs/core'
import { Inspector } from '@babylonjs/inspector'

const canvas = document.getElementById('renderCanvas')

const engine = new BABYLON.Engine(canvas)

var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
light.diffuse = new BABYLON.Color3(1, 0, 0);

// Skybox
var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:785}, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;			
    
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

Inspector.Show(scene, {})
