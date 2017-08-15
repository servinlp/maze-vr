/* global THREE */

// import { controller1, controller2 } from './loadViveControllers'
import { raycaster, numberToOppioite } from './basics'
import base from './maze'

function teleport() {

    const controller = this

    rayIntersects( controller )
        .then( intersectsWith => {

            base.container.translateX( numberToOppioite( intersectsWith[0].point.x ) )
            base.container.translateZ( numberToOppioite( intersectsWith[0].point.z ) )

        }).catch( () => {

        })

}

function rayIntersects( controller ) {

    const intersectPromise = new Promise( ( resolve, reject ) => {

        const tempMatrix = new THREE.Matrix4()

        tempMatrix.identity().extractRotation( controller.matrixWorld )
        raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld )
        raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix )

        const intersectsWithBase = raycaster.intersectObjects( base.allWalls ),
            intersectsWithFloor = raycaster.intersectObject( base.container.children[0] )

        if ( intersectsWithFloor.length > 0 && intersectsWithBase.length === 0 ) {

            resolve( intersectsWithFloor )

        } else {

            reject( intersectsWithBase )

        }

    })

    return intersectPromise

}

export { rayIntersects, teleport }
