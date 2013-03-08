function Circle3D(x, y, z, radius, nPoints, id, speed){
	// defaults to axis 0,0,1 (whole circle rotates at constant depth)
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = radius;
	this.nPoints = nPoints;
	this.id = id;
	this.points = [];
	this.stepSize = 2 * Math.PI / this.nPoints;

	this.basis1 = [0,1,0];
	this.basis2 = [0,0,1];

	this.speed = speed;
	this.angularOffset = 0;

	for (var i=0; i<nPoints; i++){
		var newid = this.id + '.' + i;
		var newPoint = new Point3D(0, 0, 0, newid);
		this.points.push(newPoint);
	}

	this.setNumPoints = function(nuPoints){
		if (this.nPoints < nuPoints){
			for (var i = this.nPoints; i < nuPoints; i++){
				var newid = this.id + '.' + i;
				var newPoint = new Point3D(0, 0, 0, newid);
				this.points.push(newPoint);
			}
		} else if (this.nPoints > nuPoints){
			while (this.nPoints > nuPoints){
				this.nPoints--;
				//this.points.pop().removeSelf();
			}
		}
		this.nPoints = nuPoints;
	}

	this.move = function(x, y, z){
		this.x = x;
		this.y = y;
		this.z = z;
	};

	this.relativeMove = function(xr, yr, zr){
		this.x += xr;
		this.y += yr;
		this.z += zr;
	};

	this.changeBasis = function(bases){
		// needs to be an orthonormal basis for things to work properly
		this.basis1 = bases[0];
		this.basis2 = bases[1];
	};

	this.rotate = function(){
		this.angularOffset += speed;
		this.angularOffset %= 2 * Math.PI;
	};

	// this.logPointLocations = function(){
	// 	for (var i=0; i<nPoints; i++){
	// 		this.points[i].logLocation();
	// 	}
	// };

	this.changeRadius = function(radius) {this.r = radius;};

	this.draw = function(){
		/* 
	recalculate the location of each point and then draw it...
	here is the general algorithm:
	the circle is rotating on a plane perpendicular to the axis that we've been given
	we first calculate the position of the point on this plane, using the the point's
	angular displacement (based on which # point it is) and the overall angular offset
	and the radius. we calculate its position on the plane in variables a,b which 
	are a 2d coordinate

	then we use the two basis vectors we computed earlier in this.changeaxis to map from 
	our 2d planar coordinates to the 3d coordinate. then we offset by the circle's origin

	simple eh?
	*/
		for (var i=0; i<this.nPoints; i++){
			var angle, a, b;
			angle = this.angularOffset + this.stepSize * i;
			a = Math.cos(angle) * this.r;
			b = Math.sin(angle) * this.r;
			px = this.x + this.basis1[0] * a + this.basis2[0] * b;
			py = this.y + this.basis1[1] * a + this.basis2[1] * b;
			pz = this.z + this.basis1[2] * a + this.basis2[2] * b;

			this.points[i].move(px, py, pz);
			this.points[i].draw();
		}
	};
};