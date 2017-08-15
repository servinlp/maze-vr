/* global THREE */

import { scene, renderer } from './basics'
import animate from './render'
import { teleportLine, teleport } from './teleporting'

let controller1,
    controller2

function loadViveControllers() {

    controller1 = new THREE.ViveController( 0 )
    controller2 = new THREE.ViveController( 1 )

    controller1.standingMatrix = renderer.vr.getStandingMatrix()
    controller2.standingMatrix = renderer.vr.getStandingMatrix()

    scene.add( controller1 )
    scene.add( controller2 )

    const loader = new THREE.OBJLoader()
    loader.setPath( './controllerObject/' )
    loader.load( 'vr_controller_vive_1_5.obj', object => {

        const textureLoader = new THREE.TextureLoader()
        textureLoader.setPath( './controllerObject/' )

        const controller = object.children[0]
        controller.material.map = textureLoader.load( 'onepointfive_texture.png' )
        controller.material.specularMap = textureLoader.load( 'onepointfive_spec.png' )

        controller1.name = 'controller1'
        controller2.name = 'controller2'

        controller1.add( object.clone() )
        controller2.add( object.clone() )

        const lineGeometry1 = new THREE.Geometry(),
            lineGeometry2 = new THREE.Geometry(),
            material1 = new THREE.LineBasicMaterial({
                color: 0x0000ff
            }),
            material2 = new THREE.LineBasicMaterial({
                color: 0x0000ff
            })

        lineGeometry1.vertices.push( new THREE.Vector3( 0, 0, 0 ) )
        lineGeometry1.vertices.push( new THREE.Vector3( 0, 0, -1 ) )

        lineGeometry2.vertices.push( new THREE.Vector3( 0, 0, 0 ) )
        lineGeometry2.vertices.push( new THREE.Vector3( 0, 0, -1 ) )

        // material.transparent = true
        // material.opacity = 1

        const line1 = new THREE.Line( lineGeometry1, material1 ),
            line2 = new THREE.Line( lineGeometry2, material2 )

        line1.name = 'raycasterLine'
        line1.scale.z = 5

        line2.name = 'raycasterLine'
        line2.scale.z = 5

        controller1.add( line1.clone() )
        controller2.add( line2.clone() )

        controller1.addEventListener( 'triggerdown', teleport )
        controller2.addEventListener( 'triggerdown', teleport )

        animate()

    })

}

export default loadViveControllers
export { controller1, controller2 }
