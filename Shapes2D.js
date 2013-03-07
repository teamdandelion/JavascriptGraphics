function Circle(sym, x, y, radius, nPoints, id, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.nPoints = nPoints;
	this.id = id;
	this.color = color;
	this.points = [];
	this.stepSize = 2 * Math.PI / this.nPoints;

	for (var i=0; i<nPoints; i++){
		var newid = this.id + '.' + i;
		var newPoint = new Point(sym, 0, 0, newid, 'black');
		this.points.push(newPoint);
	}

	this.move = function(newx, newy, angle){
		this.x = newx;
		this.y = newy;
		this.drawPoints(angle);
	};

	this.drawPoints = function(angle){
		for (var i=0; i<nPoints; i++){
			var a, px, py;
			a = angle + stepSize * i;
			px = this.x + Math.cos(a) * radius;
			py = this.y + Math.sin(a) * radius;
			this.points[i].move(px, py);
		}
	};
};

function Point(sym, x, y, id, color){
	this.id = id;
	document.write('<b id="' + id + '">' + sym +'</b>');
	s = document.getElementById(this.id).style;
	s.color = color;


	this.move = function(newx, newy){
		this.x = newx;
		this.y = newy;
		this.draw();
	};
	this.draw = function(){
		s = document.getElementById(this.id).style;
		s.left = this.x;
		s.top = this.y;
		s.fontSize = '14px';
	};
	this.move(x,y);
};