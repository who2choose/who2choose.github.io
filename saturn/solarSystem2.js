SolarSystemApp = function()
{
	Sim.App.call(this);
}

SolarSystemApp.prototype = new Sim.App();

SolarSystemApp.prototype.init = function(container)
{
	Sim.App.prototype.init.call(this, container);
	
	this.lastX = 0;
	this.lastY = 0;
	this.mouseDown = false;

    var saturn = new Saturn();
    saturn.init();
    this.addObject(saturn);
	
    this.camera.position.set(0, 0, 5);
    
    //add light source-------------------------------------
	var sun = new Sun();
    sun.init();
    this.addObject(sun);
}

SolarSystemApp.prototype.handleMouseMove = function(x, y)
{
	if (this.mouseDown)
	{
		var dx = x - this.lastX;
		if (Math.abs(dx) > SolarSystemApp.MOUSE_MOVE_TOLERANCE)
		{
			this.root.rotation.y -= (dx * 0.01);
		}
		this.lastX = x;
		
		return;
		
		var dy = y - this.lastY;
		if (Math.abs(dy) > SolarSystemApp.MOUSE_MOVE_TOLERANCE)
		{
			this.root.rotation.x += (dy * 0.01);
			
			if (this.root.rotation.x < 0)
				this.root.rotation.x = 0;
			
			if (this.root.rotation.x > SolarSystemApp.MAX_ROTATION_X)
				this.root.rotation.x = SolarSystemApp.MAX_ROTATION_X;
			
		}
		this.lastY = y;
		
	}	
}

SolarSystemApp.prototype.handleMouseDown = function(x, y)
{
	this.lastX = x;
	this.lastY = y;
	this.mouseDown = true;
}

SolarSystemApp.prototype.handleMouseUp = function(x, y)
{
	this.lastX = x;
	this.lastY = y;
	this.mouseDown = false;
}

SolarSystemApp.prototype.handleMouseScroll = function(delta)
{
	var dx = delta;

	this.camera.position.z -= dx;
	
	if (this.camera.position.z < SolarSystemApp.MIN_CAMERA_Z)
		this.camera.position.z = SolarSystemApp.MIN_CAMERA_Z;
	if (this.camera.position.z > SolarSystemApp.MAX_CAMERA_Z)
		this.camera.position.z = SolarSystemApp.MAX_CAMERA_Z;
}

SolarSystemApp.MOUSE_MOVE_TOLERANCE = 4;
SolarSystemApp.MAX_ROTATION_X = Math.PI / 2;
SolarSystemApp.MAX_CAMERA_Z = 5;
SolarSystemApp.MIN_CAMERA_Z = 1;

Sun = function()
{
	Sim.Object.call(this);
}

Sun.prototype = new Sim.Object();

Sun.prototype.init = function()
{
    var light = new THREE.PointLight( 0xffffff, 2, 100);
	light.position.set(-10, 0, 0);

    this.setObject3D(light);    
}