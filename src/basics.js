/* global THREE */

const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff )

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.y = 2

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

const controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.enableZoom = true

const raycaster = new THREE.Raycaster()

function loadScript( src ) {

    console.log( src )
    return new Promise( ( resolve, reject ) => {

        const script = document.createElement( 'script' )
        script.setAttribute( 'src', src )

        document.body.appendChild( script )

        script.addEventListener( 'load', () => {

            resolve()

        })

        script.addEventListener( 'error', () => {

            reject()

        })

    })

}

function numberToOppioite( num ) {

    let newNum

    if ( num > 0 ) {

        newNum = -num

    } else {

        newNum = Math.abs( num )

    }

    return newNum

}


export {
    scene,
    camera,
    renderer,
    controls,
    loadScript,
    raycaster,
    numberToOppioite
}
