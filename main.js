import * as BABYLON from '@babylonjs/core'

const canvas = document.getElementById('renderCanvas')

const engine = new BABYLON.Engine(canvas)

const createScene = function() {
  const scene = new BABYLON.Scene(engine)

  scene.createDefaultCameraOrLight(true, false, true)

  const worldBox = createWorldBox()

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

const scene = createScene()

// Render loop function to continuously render the scene
engine.runRenderLoop(function() {
  scene.render()
})

// Event listener for window resize to handle canvas resizing
window.addEventListener('resize', function() {
  engine.resize()
})
