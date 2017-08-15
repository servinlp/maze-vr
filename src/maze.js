/* global THREE */

const base = {
    container:  new THREE.Object3D(),
    obj:        new THREE.Object3D(),
    allWalls:   [],
    tile:       [23, 19],
    total() {

        return this.tile[0] * this.tile[1]

    },
    block() {

        return {
            size:  [1, 1, 1],
            color: 0xffffff
        }

    },
    wallSize() {

        return [1, 2, this.block().size[0] / 3]

    },
    mazeStart: [6, 20],
    maze:
        '| 1---------5---------2' +
        '| |         |         |' +
        '| | | 1---2 4-2 | 1-2 |' +
        '|   | |   |   | | | | |' +
        '8---6 | | 4-2 4-3 | | |' +
        '|   | | |   |     |   |' +
        '| | | 8-7-- 4-----6 --6' +
        '| |   |           |   |' +
        '| 8---3 --2 1---2 8-- |' +
        '| |       | |   | |   |' +
        '| | --5-- | | | 4-6 1-6' +
        '| |   |   | | |   | | |' +
        '| 4-2 | 1-7-6 4-2 | | |' +
        '|   | | |   |   | | | |' +
        '8-- | | | | 8-- | | | |' +
        '|   | | | | |   | | | |' +
        '| 1-3 | | | | --6 | | |' +
        '| |   |   |     |     |' +
        '4-7-- 4---7-----7-----3',
    render() {

        for ( let i = 0; i < this.total(); i++ ) {

            this.wall( this.maze[i], i )

        }

        this.obj.translateX( -( this.tile[0] / 2 ) )
        this.obj.translateY( ( this.wallSize()[1] / 2 ) )
        this.obj.translateZ( -( this.tile[1] / 2 ) )

    },
    wall( str, i ) {

        if ( str === '|' ) {

            this.straitWall( true, i )

        } else if ( str === '-' ) {

            this.straitWall( false, i )

        } else if ( str.match( /[5-8]/g ) ) {

            this.teeWall( str, i )

        } else if ( str.match( /[1-4]/g ) ) {

            this.cornerWall( str, i )

        }

    },
    straitWall( turn, i ) {

        const geometry = new THREE.BoxGeometry( this.wallSize()[0], ( this.wallSize()[1] ), this.wallSize()[2] ),
            material = new THREE.MeshPhongMaterial({ color: this.block().color, wireframe: false }),
            WALL = new THREE.Mesh( geometry, material )

        WALL.translateX( i % this.tile[0] )
        WALL.translateZ( Math.floor( i / this.tile[0] ) )

        if ( turn ) {

            WALL.rotation.y = ( Math.PI / 360 ) * 180

        }

        this.allWalls.push( WALL )
        this.obj.add( WALL )

    },
    teeWall( str, i ) {

        const num = parseInt( str ),
            subWALL = new THREE.Object3D(),
            material = new THREE.MeshPhongMaterial({ color: this.block().color, wireframe: false })

        let geometry = new THREE.BoxGeometry( ( this.wallSize()[0] / 3 ), ( this.wallSize()[1] ), this.wallSize()[2] ),
            WALL = new THREE.Mesh( geometry, material )

        WALL.rotation.y = ( Math.PI / 360 ) * 180
        WALL.translateX( -( this.block().size[0] / 3 ) )
        this.allWalls.push( WALL )
        subWALL.add( WALL )

        geometry = new THREE.BoxGeometry( this.wallSize()[0], this.wallSize()[1], this.wallSize()[2] )
        WALL = new THREE.Mesh( geometry, material )
        WALL.rotation.y = Math.PI / 360
        this.allWalls.push( WALL )
        subWALL.add( WALL )

        subWALL.translateX( i % this.tile[0] )
        subWALL.translateZ( Math.floor( i / this.tile[0] ) )
        subWALL.rotation.y = -( Math.PI / 2 ) * ( num - 5 )
        this.obj.add( subWALL )

    },
    cornerWall( str, i ) {

        const num = parseInt( str ),
            subWALL = new THREE.Object3D(),
            material = new THREE.MeshPhongMaterial({ color: this.block().color, wireframe: false, shading: THREE.SmoothShading }),
            geometry = new THREE.BoxGeometry( ( this.wallSize()[0] / 3 ) * 2, this.wallSize()[1], this.wallSize()[2] )

        let WALL = new THREE.Mesh( geometry, material )

        WALL.translateX( this.wallSize()[0] / 6 )
        this.allWalls.push( WALL )
        subWALL.add( WALL )

        WALL = new THREE.Mesh( geometry, material )
        WALL.translateZ( this.wallSize()[0] / 6 )
        WALL.rotation.y = ( Math.PI / 360 ) * 180
        this.allWalls.push( WALL )
        subWALL.add( WALL )

        subWALL.translateX( i % this.tile[0] )
        subWALL.translateZ( Math.floor( i / this.tile[0] ) )
        subWALL.rotation.y = -( Math.PI / 2 ) * ( num - 1 )
        this.obj.add( subWALL )

    }
}

export default base
