!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function r(e){return console.log(e),new Promise(function(t,n){var r=document.createElement("script");r.setAttribute("src",e),document.body.appendChild(r),r.addEventListener("load",function(){t()}),r.addEventListener("error",function(){n()})})}function a(e){return e>0?-e:Math.abs(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=new THREE.Scene;o.background=new THREE.Color(16777215);var i=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3);i.position.y=2;var l=new THREE.WebGLRenderer({alpha:!0,antialias:!0});l.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(l.domElement);var s=new THREE.OrbitControls(i,l.domElement);s.enableZoom=!0;var c=new THREE.Raycaster;t.scene=o,t.camera=i,t.renderer=l,t.controls=s,t.loadScript=r,t.raycaster=c,t.numberToOppioite=a},function(e,t,n){"use strict";function r(){t.controller1=s=new THREE.ViveController(0),t.controller2=c=new THREE.ViveController(1),s.standingMatrix=a.renderer.vr.getStandingMatrix(),c.standingMatrix=a.renderer.vr.getStandingMatrix(),a.scene.add(s),a.scene.add(c);var e=new THREE.OBJLoader;e.setPath("./controllerObject/"),e.load("vr_controller_vive_1_5.obj",function(e){var t=new THREE.TextureLoader;t.setPath("./controllerObject/");var n=e.children[0];n.material.map=t.load("onepointfive_texture.png"),n.material.specularMap=t.load("onepointfive_spec.png"),s.name="controller1",c.name="controller2",s.add(e.clone()),c.add(e.clone());var r=new THREE.Geometry,a=new THREE.Geometry,o=new THREE.LineBasicMaterial({color:255}),d=new THREE.LineBasicMaterial({color:255});r.vertices.push(new THREE.Vector3(0,0,0)),r.vertices.push(new THREE.Vector3(0,0,-1)),a.vertices.push(new THREE.Vector3(0,0,0)),a.vertices.push(new THREE.Vector3(0,0,-1));var u=new THREE.Line(r,o),f=new THREE.Line(a,d);u.name="raycasterLine",u.scale.z=5,f.name="raycasterLine",f.scale.z=5,s.add(u.clone()),c.add(f.clone()),s.addEventListener("triggerdown",l.teleport),c.addEventListener("triggerdown",l.teleport),(0,i.default)()})}Object.defineProperty(t,"__esModule",{value:!0}),t.controller2=t.controller1=void 0;var a=n(0),o=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(o),l=n(7),s=void 0,c=void 0;t.default=r,t.controller1=s,t.controller2=c},function(e,t,n){"use strict";function r(){l.default.checkAvailability().then(function(){s.renderer.animate(a)}).catch(function(){s.renderer.animate(o)})}function a(){c.controller1.update(),c.controller2.update(),(0,d.rayIntersects)(c.controller1).then(function(){c.controller1.children[1].material.color=new THREE.Color(65413)}).catch(function(){c.controller1.children[1].material.color=new THREE.Color(255)}),(0,d.rayIntersects)(c.controller2).then(function(){c.controller2.children[1].material.color=new THREE.Color(65413)}).catch(function(){c.controller2.children[1].material.color=new THREE.Color(255)}),s.renderer.render(s.scene,s.camera)}function o(){s.renderer.render(s.scene,s.camera)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),l=function(e){return e&&e.__esModule?e:{default:e}}(i),s=n(0),c=n(1),d=n(7);t.default=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(){v=new THREE.BoxGeometry(4*p.default.tile[0],1,4*p.default.tile[1]),g=new THREE.MeshPhongMaterial({color:6656432,wireframe:!1,shading:THREE.SmoothShading}),m=new THREE.Mesh(v,g),m.translateX(0),m.translateZ(0),m.translateY(-.5),m.name="footing",p.default.container.add(m)}function o(){l.camera.aspect=window.innerWidth/window.innerHeight,l.camera.updateProjectionMatrix(),l.renderer.setSize(window.innerWidth,window.innerHeight)}function i(e,t,n,r,a){var o=new THREE.DirectionalLight(t,n);if(o.position.set(e[0],e[1],e[2]),r.add(o),a){v=new THREE.BoxGeometry(1,1,1),g=new THREE.MeshPhongMaterial({color:0,wireframe:!0});var i=new THREE.Mesh(v,g);i.position.set(e[0],e[1],e[2]),r.add(i)}}var l=n(0),s=n(4),c=n(5),d=r(c),u=n(1),f=r(u),h=n(6),p=r(h),E=n(2),y=r(E),w=new THREE.HemisphereLight(15000804,526368,1),m=void 0,v=void 0,g=void 0,R=void 0;l.scene.add(l.camera),function(){p.default.render(),console.log(p.default.tile[0]/2-p.default.mazeStart[0]),p.default.container.translateX(Math.round(p.default.tile[0]/2-p.default.mazeStart[0])),p.default.container.translateZ(-p.default.mazeStart[1]/2-1),p.default.container.rotation.x=Math.PI/360*0,p.default.container.rotation.z=Math.PI/360*0,a(),p.default.container.add(p.default.obj),l.scene.add(p.default.container),v=new THREE.BoxGeometry(1,1,1),g=new THREE.MeshLambertMaterial({color:0,wireframe:!0}),R=new THREE.Mesh(v,g),R.position.set(0,10,0),l.scene.add(R),w.position.set(0,10,0),l.scene.add(w),i([-20,20,-30],16777215,.5,p.default.container,!0),d.default.checkAvailability().then(function(){d.default.getVRDisplay(function(e){console.log(e),l.renderer.vr.enabled=!0,l.renderer.vr.standing=!0,l.renderer.vr.setDevice(e),document.body.appendChild(d.default.getButton(e,l.renderer.domElement)),e.displayName.includes("Vive")?(console.log("Vive"),(0,l.loadScript)("ViveController.js").then(function(){console.log("ViveController.js loaded"),(0,f.default)()}).catch(function(){console.log("Could not load the script")})):(0,y.default)()})}).catch(function(e){console.log(e),(0,y.default)()}),window.addEventListener("resize",o,!1)}(),(0,s.statsInit)()},function(e,t,n){"use strict";function r(){function e(){t.begin(),t.end(),requestAnimationFrame(e)}var t=new a;t.showPanel(0),document.body.appendChild(t.dom),requestAnimationFrame(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.statsInit=r;var a=function e(){function t(e){return a.appendChild(e.dom),e}function n(e){for(var t=0;t<a.children.length;t++)a.children[t].style.display=t===e?"block":"none";r=e}var r=0,a=document.createElement("div");a.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",a.addEventListener("click",function(e){e.preventDefault(),n(++r%a.children.length)},!1);var o=(performance||Date).now(),i=o,l=0,s=t(new e.Panel("FPS","#0ff","#002")),c=t(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=t(new e.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:a,addPanel:t,showPanel:n,begin:function(){o=(performance||Date).now()},end:function(){l++;var e=(performance||Date).now();if(c.update(e-o,200),e>i+1e3&&(s.update(1e3*l/(e-i),100),i=e,l=0,d)){var t=performance.memory;d.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:a,setMode:n}};a.Panel=function(e,t,n){var r=1/0,a=0,o=Math.round,i=o(window.devicePixelRatio||1),l=80*i,s=48*i,c=3*i,d=2*i,u=3*i,f=15*i,h=74*i,p=30*i,E=document.createElement("canvas");E.width=l,E.height=s,E.style.cssText="width:80px;height:48px";var y=E.getContext("2d");return y.font="bold "+9*i+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=n,y.fillRect(0,0,l,s),y.fillStyle=t,y.fillText(e,c,d),y.fillRect(u,f,h,p),y.fillStyle=n,y.globalAlpha=.9,y.fillRect(u,f,h,p),{dom:E,update:function(s,w){r=Math.min(r,s),a=Math.max(a,s),y.fillStyle=n,y.globalAlpha=1,y.fillRect(0,0,l,f),y.fillStyle=t,y.fillText(o(s)+" "+e+" ("+o(r)+"-"+o(a)+")",c,d),y.drawImage(E,u+i,f,h-i,p,u,f,h-i,p),y.fillRect(u+h-i,f,i,p),y.fillStyle=n,y.globalAlpha=.9,y.fillRect(u+h-i,f,i,o((1-s/w)*p))}}},t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={isAvailable:function(){return console.warn("WEBVR: isAvailable() is being deprecated. Use .checkAvailability() instead."),void 0!==navigator.getVRDisplays},checkAvailability:function(){return new Promise(function(e,t){void 0!==navigator.getVRDisplays?navigator.getVRDisplays().then(function(n){0===n.length?t("WebVR supported, but no VRDisplays found."):e()}):t('Your browser does not support WebVR. See <a href="https://webvr.info">webvr.info</a> for assistance.')})},getVRDisplay:function(e){"getVRDisplays"in navigator&&navigator.getVRDisplays().then(function(t){e(t[0])})},getMessage:function(){console.warn("WEBVR: getMessage() is being deprecated. Use .getMessageContainer( message ) instead.");var e=void 0;if(navigator.getVRDisplays?navigator.getVRDisplays().then(function(t){0===t.length&&(e="WebVR supported, but no VRDisplays found.")}):e='Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.',void 0!==e){var t=document.createElement("div");t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.right="0",t.style.zIndex="999",t.align="center";var n=document.createElement("div");return n.style.fontFamily="sans-serif",n.style.fontSize="16px",n.style.fontStyle="normal",n.style.lineHeight="26px",n.style.backgroundColor="#fff",n.style.color="#000",n.style.padding="10px 20px",n.style.margin="50px",n.style.display="inline-block",n.innerHTML=e,t.appendChild(n),t}return"no message"},getMessageContainer:function(e){var t=document.createElement("div");t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.right="0",t.style.zIndex="999",t.align="center";var n=document.createElement("div");return n.style.fontFamily="sans-serif",n.style.fontSize="16px",n.style.fontStyle="normal",n.style.lineHeight="26px",n.style.backgroundColor="#fff",n.style.color="#000",n.style.padding="10px 20px",n.style.margin="50px",n.style.display="inline-block",n.innerHTML=e,t.appendChild(n),t},getButton:function(e,t){if("VREffect"in THREE&&e instanceof THREE.VREffect)return console.error("WebVR.getButton() now expects a VRDisplay."),document.createElement("button");var n=document.createElement("button");return n.style.position="absolute",n.style.left="calc(50% - 50px)",n.style.bottom="20px",n.style.width="100px",n.style.border="0",n.style.padding="8px",n.style.cursor="pointer",n.style.backgroundColor="#000",n.style.color="#fff",n.style.fontFamily="sans-serif",n.style.fontSize="13px",n.style.fontStyle="normal",n.style.textAlign="center",n.style.zIndex="999",e?(n.textContent="ENTER VR",n.onclick=function(){e.isPresenting?e.exitPresent():e.requestPresent([{source:t}])},window.addEventListener("vrdisplaypresentchange",function(){n.textContent=e.isPresenting?"EXIT VR":"ENTER VR"},!1)):n.textContent="NO VR DISPLAY",n}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={container:new THREE.Object3D,obj:new THREE.Object3D,allWalls:[],tile:[23,19],total:function(){return this.tile[0]*this.tile[1]},block:function(){return{size:[1,1,1],color:16777215}},wallSize:function(){return[1,2,this.block().size[0]/3]},mazeStart:[6,20],maze:"| 1---------5---------2| |         |         || | | 1---2 4-2 | 1-2 ||   | |   |   | | | | |8---6 | | 4-2 4-3 | | ||   | | |   |     |   || | | 8-7-- 4-----6 --6| |   |           |   || 8---3 --2 1---2 8-- || |       | |   | |   || | --5-- | | | 4-6 1-6| |   |   | | |   | | || 4-2 | 1-7-6 4-2 | | ||   | | |   |   | | | |8-- | | | | 8-- | | | ||   | | | | |   | | | || 1-3 | | | | --6 | | || |   |   |     |     |4-7-- 4---7-----7-----3",render:function(){for(var e=0;e<this.total();e++)this.wall(this.maze[e],e);this.obj.translateX(-this.tile[0]/2),this.obj.translateY(this.wallSize()[1]/2),this.obj.translateZ(-this.tile[1]/2)},wall:function(e,t){"|"===e?this.straitWall(!0,t):"-"===e?this.straitWall(!1,t):e.match(/[5-8]/g)?this.teeWall(e,t):e.match(/[1-4]/g)&&this.cornerWall(e,t)},straitWall:function(e,t){var n=new THREE.BoxGeometry(this.wallSize()[0],this.wallSize()[1],this.wallSize()[2]),r=new THREE.MeshPhongMaterial({color:this.block().color,wireframe:!1}),a=new THREE.Mesh(n,r);a.translateX(t%this.tile[0]),a.translateZ(Math.floor(t/this.tile[0])),e&&(a.rotation.y=Math.PI/360*180),this.allWalls.push(a),this.obj.add(a)},teeWall:function(e,t){var n=parseInt(e),r=new THREE.Object3D,a=new THREE.MeshPhongMaterial({color:this.block().color,wireframe:!1}),o=new THREE.BoxGeometry(this.wallSize()[0]/3,this.wallSize()[1],this.wallSize()[2]),i=new THREE.Mesh(o,a);i.rotation.y=Math.PI/360*180,i.translateX(-this.block().size[0]/3),this.allWalls.push(i),r.add(i),o=new THREE.BoxGeometry(this.wallSize()[0],this.wallSize()[1],this.wallSize()[2]),i=new THREE.Mesh(o,a),i.rotation.y=Math.PI/360,this.allWalls.push(i),r.add(i),r.translateX(t%this.tile[0]),r.translateZ(Math.floor(t/this.tile[0])),r.rotation.y=-Math.PI/2*(n-5),this.obj.add(r)},cornerWall:function(e,t){var n=parseInt(e),r=new THREE.Object3D,a=new THREE.MeshPhongMaterial({color:this.block().color,wireframe:!1,shading:THREE.SmoothShading}),o=new THREE.BoxGeometry(this.wallSize()[0]/3*2,this.wallSize()[1],this.wallSize()[2]),i=new THREE.Mesh(o,a);i.translateX(this.wallSize()[0]/6),this.allWalls.push(i),r.add(i),i=new THREE.Mesh(o,a),i.translateZ(this.wallSize()[0]/6),i.rotation.y=Math.PI/360*180,this.allWalls.push(i),r.add(i),r.translateX(t%this.tile[0]),r.translateZ(Math.floor(t/this.tile[0])),r.rotation.y=-Math.PI/2*(n-1),this.obj.add(r)}};t.default=r},function(e,t,n){"use strict";function r(){a(this).then(function(e){l.default.container.translateX((0,o.numberToOppioite)(e[0].point.x)),l.default.container.translateZ((0,o.numberToOppioite)(e[0].point.z))}).catch(function(){})}function a(e){return new Promise(function(t,n){var r=new THREE.Matrix4;r.identity().extractRotation(e.matrixWorld),o.raycaster.ray.origin.setFromMatrixPosition(e.matrixWorld),o.raycaster.ray.direction.set(0,0,-1).applyMatrix4(r);var a=o.raycaster.intersectObjects(l.default.allWalls),i=o.raycaster.intersectObject(l.default.container.children[0]);i.length>0&&0===a.length?t(i):n(a)})}Object.defineProperty(t,"__esModule",{value:!0}),t.teleport=t.rayIntersects=void 0;var o=n(0),i=n(6),l=function(e){return e&&e.__esModule?e:{default:e}}(i);t.rayIntersects=a,t.teleport=r}]);
//# sourceMappingURL=script.js.map