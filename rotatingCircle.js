// circle parameters
var symbol = '*'; // what character is used
var nPoints = 6; 
var radius = 100;
var speed = .01; // in radians per iteration

//useful globals
var xpos=0, ypos=0; // tracks mouse location
var circleX, circleY;     // center of the circle
var angularOffset = 0;	
var stepSize = Math.PI * 2 / nPoints;
var list_of_points = [];


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
	};
	this.move(x,y);
};

// from stackoverflow
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    xwindow = w.innerWidth || e.clientWidth || g.clientWidth,
    ywindow = w.innerHeight|| e.clientHeight|| g.clientHeight;


var myCircle = new Circle('*', 50, 50, 100, 6, 0, 'gold');





function draw_and_move()
{
	circleX = Math.max(radius, xpos);
	circleY = Math.max(radius, ypos);
	circleX = Math.min(xwindow-radius-20, circleX);
	circleY = Math.min(ywindow-radius-20, circleY);

	myCircle.move(circleX, circleY, angularOffset);
	angularOffset += speed;
}



function setRadius(r){
	radius = r;
}

function setSpeed(v){
	speed = v / 10000.0;
}

setInterval('draw_and_move()',1);