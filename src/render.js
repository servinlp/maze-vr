/* global THREE */

import WEBVR from './WebVR'
import { renderer, scene, camera } from './basics'
import { controller1, controller2 } from './loadViveControllers'
import { rayIntersects } from './teleporting'

function animate() {

    WEBVR.checkAvailability()
        .then( () => {

            renderer.animate( VRrenderer )

        }).catch( () => {

            renderer.animate( render )

        })

}

function VRrenderer() {

    controller1.update()
    controller2.update()

    rayIntersects( controller1 )
        .then( () => {

            controller1.children[1].material.color = new THREE.Color( 0x00ff85 )

        }).catch( () => {

            controller1.children[1].material.color = new THREE.Color( 0x0000ff )

        })

    rayIntersects( controller2 )
        .then( () => {

            controller2.children[1].material.color = new THREE.Color( 0x00ff85 )

        }).catch( () => {

            controller2.children[1].material.color = new THREE.Color( 0x0000ff )

        })

    renderer.render( scene, camera )

}

function render() {

    renderer.render( scene, camera )

}

export default animate
