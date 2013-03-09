function Sphere(id){
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.r = 0;
	this.nPoints = 0;
	this.nCircles = 0;
	this.circles = [];
	this.depths  = [];
	this.speed = 0;
	this.axis = [1, 0, 0];
	this.angularOffset = 0;

	this.init = function (){ 
		this.topPoint = new Point3D(this.id + '.top');
		this.botPoint = new Point3D(this.id + '.bot');

		//var circleSpacing = Math.PI / (nCircles+1);
		// for (var i=0; i<nCircles; i++){
		// 	var newId = this.id + '.Circle' + i;
		// 	this.addCircle(newId, nPoints);
		// }
		// this.shapeSphere();
		// this.changeAxis(this.axis);
	};

	this.setSpeed = function(speed){this.speed = speed;};

	this.shapeSphere = function(){
		circleSpacing = Math.PI / (this.nCircles+1);
		//console.log('spacing:', circleSpacing);
		for (var i=0; i<this.nCircles; i++){
			angle = circleSpacing * (i+1);
			cirRadius = Math.sin(angle) * this.r;
			cirDepth = Math.cos(angle) * this.r;
			this.circles[i].changeRadius(cirRadius);
			this.circles[i].setNumPoints(this.nPoints);
			this.depths[i] = cirDepth;
		//	console.log('angle, depth: ', angle, cirDepth);
		}
		this.changeAxis(this.axis);
	}

	this.addCircle = function(){
		var newid = this.id + '.Circle' + this.nCircles;
		var newCircle = new Circle3D(newid);
		this.circles.push(newCircle);
		//this.depths.push(0);
		this.nCircles++;
		console.log('made a circle');
	};

	this.removeCircle = function(){
		this.circles.pop().removeSelf();
		this.depths.pop();
		this.nCircles--;
	}

	this.setNumCircles = function(newNumCircles){
		while (this.nCircles < newNumCircles){
			this.addCircle();
		}
		while (this.nCircles > newNumCircles){
			this.removeCircle();
		}
		this.shapeSphere();
	};

	this.changeAxis = function(abc){
		this.axis = abc;
		var a = abc[0];
		var b = abc[1];
		var c = abc[2];
		var norm = Math.sqrt(a*a + b*b + c*c);
		a /= norm;
		b /= norm;
		c /= norm;
		var r = this.r; // saves some space, this.r is kinda long
		//console.log('a,b,c,n: ',a,b,c,norm);
		var ar = a *r, br = b*r, cr = c*r;

		console.log('top xyz:', this.x + ar, this.y + br, this.z + cr);
		console.log('bot xyz:', this.x - ar, this.y - br, this.z - cr);

		this.topPoint.move(this.x + a * r, this.y + b * r, this.z + c * r);
		this.botPoint.move(this.x - a * r, this.y - b * r, this.z - c * r);

		bases = generateBasis(a,b,c);

//		var n = nCircles/2;
		for (var i=0; i < this.nCircles; i++){
			var depth = this.depths[i];
			this.circles[i].move(this.x + a*depth, this.y + b*depth, this.z + c*depth);
			this.circles[i].changeBasis(bases);
		}
	};

	this.move = function(x, y, z){
		var relativeX = x - this.x;
		var relativeY = y - this.y;
		var relativeZ = z - this.z;
		// use relative move so we don't need to do any axis recalculation
		this.x = x;
		this.y = y;
		this.z = z;
		this.topPoint.relativeMove(relativeX, relativeY, relativeZ);
		this.botPoint.relativeMove(relativeX, relativeY, relativeZ);
		for (var i=0; i<this.nCircles; i++){
			this.circles[i].relativeMove(relativeX, relativeY, relativeZ);
		}
	};

	this.rotate = function(){
		this.angularOffset += this.speed;
		this.angularOffset %= 2 * Math.PI;
		for (var i=0; i<this.nCircles; i++){
			this.circles[i].setAngularOffset(this.angularOffset);
		}
	};

	this.draw = function(){
		this.topPoint.draw();
		this.botPoint.draw();
		for (var i=0; i<this.nCircles; i++){
			this.circles[i].draw();
		}
	};

	this.setRadius = function(radius){
		this.r = radius;
		// var circleSpacing = Math.PI / (this.nCircles+1);
		// for (var i=0; i<this.nCircles; i++){
		// 	var angle = circleSpacing * (i+1);
		// 	// z^2 + cR^2 = r^2
		// 	// cR = sqrt(r^2 + z^2)
		// 	var cirRadius = Math.sin(angle) * this.r;
		// 	var cirDepth = Math.cos(angle) * this.r;
		// 	//console.log('cRadius', cRadius, 'cirRadius', cirRadius);
		// 	this.circles[i].changeRadius(cirRadius);
		// 	this.depths[i] = cirDepth;
		this.shapeSphere();
		
	};

	this.setNumPoints = function(nPoints){
		this.nPoints = nPoints;
		for (var i=0; i<this.nCircles; i++){
			this.circles[i].setNumPoints(nPoints);
		}
	};

	this.init();
};


generateBasis = function(a, b, c){
	if (a == 0 && b == 0){
		// Catch the corner case where my algorithm won't work
		// and also default to no-depth solution when given invalid 0,0,0 input
		basis1 = [1, 0, 0];
		basis2 = [0, 1, 0];
	} else {
		// we define two orthogonal vectors according to the following algorithm:
		// where axis is (a,b,c)
		// o1 = (b, -a, 0)
		// o2 = axis x o1 = (ca, cb, -a^2 - b^2)
		var ortho1, ortho2, n1, n2;
		var a2 = Math.pow(a,2);
		var b2 = Math.pow(b,2);
		var c2 = Math.pow(c,2);
		n1 = Math.sqrt(a2 + b2);
		basis1 = [b / n1, -a / n1, 0];
		n2 = Math.sqrt(c2 * (a2 + b2) + Math.pow(a2,2) + Math.pow(b2,2) + 2*a2*b2);
		basis2 = [c * a / n2, c * b / n2, -(a2 + b2) / n2]
	}
	return [basis1, basis2]
};
