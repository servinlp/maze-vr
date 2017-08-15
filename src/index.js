/* global THREE */

import { scene, camera, renderer, controls, loadScript } from './basics'
import { statsInit } from './stats'
import WEBVR from './WebVR'
import loadViveControllers from './loadViveControllers'
import base from './maze'
import animate from './render'

const light = new THREE.HemisphereLight( 0xe4e4e4, 0x080820, 1 )

let footing,
    geometry,
    material,
    box

scene.add( camera )

function yourFooting() {

    geometry = new THREE.BoxGeometry( base.tile[0] * 4, 1, base.tile[1] * 4 )
    material = new THREE.MeshPhongMaterial({ color: 0x6591b0, wireframe: false, shading: THREE.SmoothShading })
    footing = new THREE.Mesh( geometry, material )

    footing.translateX( 0 )
    footing.translateZ( 0 )
    footing.translateY( -0.5 )
    footing.name = 'footing'
    base.container.add( footing )

}

init()

function init() {

    base.render()

    // base.container.translateY( 0.5 )
    // base.container.translateZ( -10 )
    console.log( ( base.tile[0] / 2 ) - base.mazeStart[0] )
    base.container.translateX( Math.round( ( base.tile[0] / 2 ) - base.mazeStart[0] ) )
    base.container.translateZ( -( base.mazeStart[1] / 2 ) - 1 )
    base.container.rotation.x = ( Math.PI / 360 ) * 0
    base.container.rotation.z = ( Math.PI / 360 ) * 0

    yourFooting()
    base.container.add( base.obj )
    scene.add( base.container )


    geometry = new THREE.BoxGeometry( 1, 1, 1 )
    material = new THREE.MeshLambertMaterial({ color: 0x000000, wireframe: true })
    box = new THREE.Mesh( geometry, material )
    box.position.set( 0, 10, 0 )
    scene.add( box )
    light.position.set( 0, 10, 0 )
    scene.add( light )

    setLight( [-20, 20, -30], 0xffffff, 0.5, base.container, true )


    // VR
    WEBVR.checkAvailability()
        .then( () => {

            WEBVR.getVRDisplay( display => {

                console.log( display )

                renderer.vr.enabled = true
                renderer.vr.standing = true
                renderer.vr.setDevice( display )

                document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) )

                if ( display.displayName.includes( 'Vive' ) ) {

                    console.log( 'Vive' )

                    loadScript( 'ViveController.js' )
                        .then( () => {

                            console.log( 'ViveController.js loaded' )
                            loadViveControllers()

                        }).catch( () => {

                            console.log( 'Could not load the script' )

                        })

                } else {

                    animate()

                }

            })

        })
        .catch( message => {

            console.log( message )
            animate()

        })

    window.addEventListener( 'resize', onWindowResize, false )

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )

}

function setLight( pos, color, opacity, dest, targetBox ) {

    const currLight = new THREE.DirectionalLight( color, opacity )
    currLight.position.set( pos[0], pos[1], pos[2] )

    dest.add( currLight )

    if ( targetBox ) {

        geometry = new THREE.BoxGeometry( 1, 1, 1 )
        material = new THREE.MeshPhongMaterial({ color: 0x000000, wireframe: true })
        const lightBox = new THREE.Mesh( geometry, material )
        lightBox.position.set( pos[0], pos[1], pos[2] )
        dest.add( lightBox )

    }

}

statsInit()
