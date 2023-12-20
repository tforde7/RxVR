import * as BABYLON from '@babylonjs/core'

const canvas = document.getElementById('renderCanvas')

const engine = new BABYLON.Engine(canvas)

const createScene = function() {
  const scene = new BABYLON.Scene(engine)

  scene.createDefaultLight()

  const camera = createUniversalCamera(scene)



  // const worldBox = createWorldBox()
  const ground = createGround()

  return scene
}

const createWorldBox = function() {
  const boxName = 'worldBox'
  const boxOptions = {
    size: 0.5
  }

  const box = BABYLON.MeshBuilder.CreateBox(boxName, boxOptions)

  return box
}

const createGround = function() {
  const groundName = 'worldGround'
  const groundOptions = {
    height: 10,
    width: 10,
    subdivisions: 30
  }
  const ground = new BABYLON.MeshBuilder.CreateGround(groundName, groundOptions)

  ground.material =  new BABYLON.StandardMaterial()
  ground.material.wireframe = true

  return ground
}

const createUniversalCamera = function(scene) {
  const cameraName = 'universalCamera'
  const cameraPosition = new BABYLON.Vector3(0, 5, -10)
  const camera = new BABYLON.UniversalCamera(cameraName, cameraPosition, scene)
  camera.attachControl(true)
  return camera
}

const scene = createScene()

// Render loop function to continuously render the scene
engine.runRenderLoop(function() {
  scene.render()
})

// Event listener for window resize to handle canvas resizing
window.addEventListener('resize', function() {
  engine.resize()
})
