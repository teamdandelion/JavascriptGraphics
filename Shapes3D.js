
var defaultDepth = 500;


function Point3D(sym, x, y, z, id, color){
	this.id = id;
	this.baseSize = 14;
	this.pSize = baseSize;
	document.write('<b id="' + id + '">' + sym +'</b>');
	s = document.getElementById(this.id).style;
	s.color = color;

	this.move = function(newx, newy, newz){
		this.x = newx;
		this.y = newy;
		this.z = newz;
		this.pSize = this.baseSize * defaultDepth / this.z;
	};
	this.draw = function(){
		s = document.getElementById(this.id).style;
		// TODO: resize it according to point size
		s.left = this.x;
		s.top = this.y;
		s.fontSize = this.pSize;
		// s.zIndex = this.z; TODO - implement this
	};
	this.move(x,y); // constructor moves it to its starting coordinate after its been made, which
	// initializes this.x and this.y as well as making inital drawing
};

function Circle3D(sym, x, y, z, radius, nPoints, id, color, speed){
	// defaults to axis 0,0,1 (whole circle rotates at constant depth)
	this.x = x;
	this.y = y;
	this.z = z;
	this.radius = radius;
	this.nPoints = nPoints;
	this.id = id;
	this.color = color;
	this.axis = axis;
	this.points = [];
	this.stepSize = 2 * Math.PI / this.nPoints;

	this.basis1 = [1,0,0];
	this.basis2 = [0,1,0];

	this.speed = speed;
	this.angularOffset = 0;

	for (var i=0; i<nPoints; i++){
		var newid = this.id + '.' + i;
		var newPoint = new Point3D(sym, 0, 0, 0, newid, color);
		this.points.push(newPoint);
	}

	this.move = function(newx, newy, newz){
		this.x = newx;
		this.y = newy;
		this.z = newz;
	};

	this.changeAxis = function(a, b, c){
		if (a == 0 && b == 0){
			// Catch the corner case where my algorithm won't work
			// and also default to no-depth solution when given invalid 0,0,0 input
			this.basis1 = [1, 0, 0];
			this.basis2 = [0, 1, 0];
		} else {
			// we define two orthogonal vectors according to the following algorithm:
			// where axis is (a,b,c)
			// o1 = (b, -a, 0)
			// o2 = axis x o1 = (ca, cb, -a^2 - b^2)
			var ortho1, ortho2, n1, n2;
			var a2 = a^2;
			var b2 = b^2;
			var c2 = c^2;
			n1 = Math.sqrt(a2 + b2);
			this.basis1 = [axisY/n1, -axisX/n1, 0];
			n2 = Math.sqrt(c2 (a2 + b2) + a2^2 + b2 ^2 + 2*a2*b2);
			this.basis2 = [c * a / n2, c * b / n2, -(a2 + b2) / n2]
		}
	};

	this.rotate = function(){
		this.angularOffset += speed;
		this.angularOffset %= 2 * Math.PI;
	}

	this.drawPoints = function(){
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

	*/

		for (var i=0; i<nPoints; i++){
			var a, px, py;
			a = this.angularOffset + stepSize * i;
			px = this.x + Math.cos(a) * radius;
			py = this.y + Math.sin(a) * radius;
			this.points[i].move(px, py, pz);
			this.points[i].draw();
		}
	};
};