(function() {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// lights

	var light, materials;

	scene.add( new THREE.AmbientLight( 0x666666 ) );

	light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
	light.position.set( 50, 200, 100 );
	light.position.multiplyScalar( 1.3 );

	light.castShadow = true;
	//light.shadowCameraVisible = true;

	light.shadowMapWidth = 1024;
	light.shadowMapHeight = 1024;

	var d = 300;

	light.shadowCameraLeft = -d;
	light.shadowCameraRight = d;
	light.shadowCameraTop = d;
	light.shadowCameraBottom = -d;

	light.shadowCameraFar = 1000;
	light.shadowDarkness = 0.5;

	scene.add( light );

	// cube material

	var cubeTexture = THREE.ImageUtils.loadTexture( 'textures/patterns/circuit_pattern.png' );
	cubeTexture.wrapS = cubeTexture.wrapT = THREE.RepeatWrapping;
	cubeTexture.anisotropy = 16;

	var cubeMaterial = new THREE.MeshPhongMaterial( { alphaTest: 0.5, color: 0xffffff, specular: 0x030303, emissive: 0x111111, shiness: 10, map: cubeTexture, side: THREE.DoubleSide } );

	var uniforms = { texture:  { type: "t", value: cubeTexture } };
	var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;

	// cube mesh
	var cubeGeometry = new THREE.BoxGeometry( 2, 2, 2 );
	var cube = new THREE.Mesh( cubeGeometry, cubeMaterial);
	cube.position.set( 0, 0, 0 );
	cube.castShadow = true;
	cube.receiveShadow = true;
	scene.add( cube );

	cube.customDepthMaterial = new THREE.ShaderMaterial( { uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader } );

	function init(){
		// var objectAnimation = new THREE.Animation(cube, 'oscillateX');
	}

	init();

	camera.position.z = 5;

	var maxX = 1;
	var minX = -1;
	var direction = 1;
	var left = -1;
	var right = 1;

	function oscillateX() {
	  
	}

	function renderObject(time) {
	  cube.rotation.x += 0.01;
	  cube.rotation.y += 0.01;
	  cube.rotation.z += Math.sin(0.01);
	  oscillateX(time);
	}

	function render(time) {
		requestAnimationFrame( render );
	  
	  renderObject(time);
	  
		renderer.render( scene, camera );
	}
	render();

})();