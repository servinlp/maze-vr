
if ( WEBVR.isAvailable() === false ) {
	document.body.appendChild( WEBVR.getMessage() );
}

var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}),
    light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 ),
    raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2(),
    camVec = new THREE.Vector3(),
    element = renderer.domElement,

    // effect = new THREE.StereoEffect(renderer),
    controls, effect, controller1, controller2, loader, rayLine, Line, vec,

    mousePos = [0, 0],
    p = document.querySelectorAll(".fps")[0],
    wallObjects, base, footing, geometry, material, box, WALL, subWALL, num, keyMap, fps = 0, lastRun, delta, map = {},
    velocity = 0, baseView, x, i, curPos, camBox, ray, collisionResults, collisionResultsMaze, collisionPosibilities = [], triggers = [false, false], newCamPos;

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xffffff);
document.body.appendChild(renderer.domElement);
scene.add(camera);

base = {
  container: new THREE.Object3D,
  obj: new THREE.Object3D,
  tile: [23, 19],
  total: function(){
    return this.tile[0] * this.tile[1];
  },
  block: function(){
    return {
      size: [1, 1, 1],
      color: 0xffffff,
    };
  },
  wallSize: function(){ return [1, 1, this.block().size[0]/3]; },
  mazeStart: [6, 20],
  maze:
        "| 1---------5---------2" +
        "| |         |         |" +
        "| | | 1---2 4-2 | 1-2 |" +
        "|   | |   |   | | | | |" +
        "8---6 | | 4-2 4-3 | | |" +
        "|   | | |   |     |   |" +
        "| | | 8-7-- 4-----6 --6" +
        "| |   |           |   |" +
        "| 8---3 --2 1---2 8-- |" +
        "| |       | |   | |   |" +
        "| | --5-- | | | 4-6 1-6" +
        "| |   |   | | |   | | |" +
        "| 4-2 | 1-7-6 4-2 | | |" +
        "|   | | |   |   | | | |" +
        "8-- | | | | 8-- | | | |" +
        "|   | | | | |   | | | |" +
        "| 1-3 | | | | --6 | | |" +
        "| |   |   |     |     |" +
        "4-7-- 4---7-----7-----3",
  render: function() {
    for (var i = 0; i < this.total(); i++) {
      this.wall(this.maze[i], i);
    }
    this.obj.translateX(-(this.tile[0]/2));
    this.obj.translateZ(-(this.tile[1]/2));
  },
  wall: function(str, i){
    if (str == "|") {
      this.straitWall(true, i);
    } else if( str == "-"){
      this.straitWall(false, i);
    } else if(str.match(/[5-8]/g)){
      this.teeWall(str, i);
    } else if (str.match(/[1-4]/g)) {
      this.cornerWall(str, i);
    }
  },
  straitWall: function(turn, i) {
    geometry = new THREE.BoxGeometry(this.wallSize()[0], (this.wallSize()[1]), this.wallSize()[2]);
    material = new THREE.MeshPhongMaterial({color: this.block().color, wireframe: false});
    WALL = new THREE.Mesh(geometry, material);

    WALL.translateX(i % this.tile[0]);
    WALL.translateZ(Math.floor(i / this.tile[0]));
    turn ? WALL.rotation.y = (Math.PI / 360) * 180 : "";
    this.obj.add(WALL);
    // collisionPosibilities.push(WALL);
  },
  teeWall: function(str, i) {
    num = parseInt(str);
    subWALL = new THREE.Object3D;

    geometry = new THREE.BoxGeometry((this.wallSize()[0]/3), (this.wallSize()[1]), this.wallSize()[2]);
    material = new THREE.MeshPhongMaterial({color: this.block().color, wireframe: false});
    WALL = new THREE.Mesh(geometry, material);
    WALL.rotation.y = (Math.PI / 360) * 180;
    WALL.translateX(-(this.block().size[0]/3));
    subWALL.add(WALL);
    // collisionPosibilities.push(WALL);

    geometry = new THREE.BoxGeometry(this.wallSize()[0], (this.wallSize()[1]), this.wallSize()[2]);
    WALL = new THREE.Mesh(geometry, material);
    WALL.rotation.y = (Math.PI / 360) * 0;
    subWALL.add(WALL);
    // collisionPosibilities.push(WALL);
    subWALL.translateX(i % this.tile[0]);
    subWALL.translateZ(Math.floor(i / this.tile[0]));
    subWALL.rotation.y = -(Math.PI / 2) * (num-5);
    this.obj.add(subWALL);
  },
  cornerWall: function(str, i) {
    num = parseInt(str);
    subWALL = new THREE.Object3D;

    geometry = new THREE.BoxGeometry((this.wallSize()[0]/3)*2, (this.wallSize()[1]), this.wallSize()[2]);
    material = new THREE.MeshPhongMaterial({color: this.block().color, wireframe: false, shading: THREE.SmoothShading});
    WALL = new THREE.Mesh(geometry, material);
    WALL.translateX(this.wallSize()[0]/6);
    subWALL.add(WALL);
    // collisionPosibilities.push(WALL);

    WALL = new THREE.Mesh(geometry, material);
    // WALL.translateX(this.wallSize()[0]/6);
    WALL.translateZ(this.wallSize()[0]/6);
    WALL.rotation.y = (Math.PI / 360) * 180;
    subWALL.add(WALL);
    // collisionPosibilities.push(WALL);

    subWALL.translateX(i % this.tile[0]);
    subWALL.translateZ(Math.floor(i / this.tile[0]));
    subWALL.rotation.y = -(Math.PI / 2) * (num-1);
    this.obj.add(subWALL);
  }
}

function yourFooting(){
  geometry = new THREE.BoxGeometry(base.tile[0]*2, 1, base.tile[1]*2);
  material = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false, shading: THREE.SmoothShading});
  footing = new THREE.Mesh(geometry, material);
  footing.translateX(-base.tile[0]);
  footing.translateZ(0);
  footing.translateY(-.8);
	footing.name = "footing";
  base.container.add(footing);

	footing = new THREE.Mesh(geometry, material);
  footing.translateX(base.tile[0]);
  footing.translateZ(0);
  footing.translateY(-.8);
	footing.name = "footing";
	base.container.add(footing);
}

init();

function init(){

  // var gridHelper = new THREE.GridHelper(20, 1);
  // geometry = new THREE.BoxGeometry(1, 1, 1);
  // material = new THREE.MeshPhongMaterial({wireframe: true});
  // camBox = new THREE.Mesh(geometry, material);
  // camBox.position.y = -1;
  // camBox.position.x = -base.mazeStart[0];
  // scene.add(camBox);

  base.render();

  base.container.translateY(.5);
  base.container.translateZ(-10);
  base.container.rotation.x = (Math.PI / 360) * 00;
  base.container.rotation.z = (Math.PI / 360) * 0;

  yourFooting();
  base.container.add(base.obj);


  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: true});
  box = new THREE.Mesh(geometry, material);
  box.position.set(0, 10, 0);
  scene.add(box);
  light.position.set(0, 10, 0);
  scene.add( light );

  setLight([-20, 20, -30], 0xffffff, 0.5, base.container, true);

  // var boundingBoxHelper = new THREE.BoundingBoxHelper(base.obj, 0xff0000);
  // boundingBoxHelper.update();
  // scene.add(boundingBoxHelper);

  // scene.add(gridHelper);
  scene.add(base.container);

	// base.container.position.z = 0;
	// base.container.position.x = 0;
	// base.container.position.y = 5;

	// geometry = new THREE.BoxGeometry(1, 1, 1);
	// material = new THREE.MeshPhongMaterial({color : 0xffff00, wireframe: true});
	// box = new THREE.Mesh(geometry, material);
	// box.position.z = -1;
	// box.position.y = 1;
	// scene.add(box);
  // VR
  controls = new THREE.VRControls(camera);
  controls.standing = true;
	console.log(controls);
	// console.log(camera);

  controller1 = new THREE.ViveController(0);
  controller2 = new THREE.ViveController(1);

  controller1.standingMatrix = controls.getStandingMatrix();
  controller2.standingMatrix = controls.getStandingMatrix();

	controller1.castShadow = true;
	controller2.castShadow = true;

  base.container.position.x = base.mazeStart[0] + .5;

  scene.add(controller1);
  scene.add(controller2);

  loader = new THREE.OBJLoader();
	loader.load( 'vr_controller_vive_1_5.obj', function ( object ) {

		var loader = new THREE.TextureLoader();

		var controller = object.children[0];
		controller.material.map = loader.load( 'onepointfive_texture.png' );
		controller.material.specularMap = loader.load( 'onepointfive_spec.png' );

		controller1.add( object.clone() );
		controller2.add( object.clone() );

    // console.log(controller1);
    // console.log(controller2);

		setRayLine(controller1);
		setRayLine(controller2);

		loop();
	} );


  effect = new THREE.VREffect(renderer);
  if (WEBVR.isAvailable() === true) {
    document.body.appendChild(WEBVR.getButton(effect));
  }

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	effect.setSize( window.innerWidth, window.innerHeight );

}

function loop() {
  effect.requestAnimationFrame(loop);
  render();
}

function render(){
  controller1.update();
	controller2.update();


	if (controller1.getButtonState("trigger")) {
		console.log(controller1);
		console.log(controller1.children[1]);
		// controller1.getGamepad().hapticActuators[0].pulse(controller1.getGamepad().buttons[1].value, 100);
		controller1.children[1].material.opacity = 1;
	} else {
		controller1.children[1].material.opacity = 0;
	}
	if (navigator.getGamepads()[0].buttons[0].touched) {
		console.log("werkt");
		console.log(controller1.getGamepad().buttons[0].touched);
	}
	if (controller1.getButtonState("thumbpad")) {
		controller1.getGamepad().hapticActuators[0].pulse(controller1.getGamepad().buttons[0].value, 100);
	}
	// if (controller1.getButtonState("grips")) {
	// 	controller1.getGamepad().hapticActuators[0].pulse(controller1.getGamepad().buttons[2].value, 100);
	// }
	// if (controller1.getButtonState("menu")) {
	// 	controller1.getGamepad().hapticActuators[0].pulse(controller1.getGamepad().buttons[3].value, 100);
	// }

	if (controller2.getButtonState("trigger")) {
		line = controller2.children[1];
		line.updateMatrixWorld();
		vec = [line.geometry.vertices[0].clone(), line.geometry.vertices[2].clone()];
		vec[0].applyMatrix4(line.matrixWorld);
		vec[1].applyMatrix4(line.matrixWorld);
		line.material.opacity = 1;

		console.log(box);
		console.log(box.geometry);

		raycaster.set( vec[0], vec[1] );
		collisionResults = raycaster.intersectObjects([base.container.children[0], base.container.children[1]], true);
		collisionResultsMaze = raycaster.intersectObjects(base.obj.children, true);
		console.log(raycaster);
		console.log(collisionResults);
		if (collisionResultsMaze.length > 0) {
			line.material.color.set(0xff0000);
		} else if (collisionResults.length > 0) {
			line.material.color.set(0x00ff00);
			triggers[1] = true;
			newCamPos = collisionResults[0].point;
    } else {
			line.material.color.set(0x0000ff);
			triggers[1] = false;
		}
	} else {
		if (triggers[1]) {
			console.log(newCamPos);
			base.container.position.x -= newCamPos.x;
			base.container.position.z -= newCamPos.z;
			triggers[1] = false;
		}
		controller2.children[1].material.opacity = 0;
	}
	controls.update();

  effect.render( scene, camera );
}

function setLight(pos, color, opacity, dest, box){
  var light = new THREE.DirectionalLight(color, opacity);
  light.position.set( pos[0], pos[1], pos[2] );

  dest.add(light);

  if (box) {
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: true});
    box = new THREE.Mesh(geometry, material);
    box.position.set( pos[0], pos[1], pos[2] );
    dest.add(box);
  }
}

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function animate() {

    stats.begin();

    // monitored code goes here

    stats.end();

    requestAnimationFrame( animate );

}

requestAnimationFrame( animate );

function setRayLine(controller){
	material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth :  1});
	material.transparent = true;
	material.opacity = 0;
	geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, -5),
		new THREE.Vector3(0, 0, -10)
	);
	rayLine = new THREE.Line(geometry, material);
	controller.add(rayLine);
}
