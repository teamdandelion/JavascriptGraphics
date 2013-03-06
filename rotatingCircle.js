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

function Point(sym, x, y, z, id){
	this.x = x;
	this.y = y;
	this.z = z;
	this.id = id;
	document.write('<b id="' + id + '">' + sym +'</b>');
	console.log('<b id="' + id + '">' + sym +'</b>');
	s = document.getElementById(this.id).style;
	s.left = this.x;
	s.top = this.y;
	s.color = 'gold';

	this.move = function(newx, newy){
		this.x = newx;
		this.y = newy;
	};
	this.draw = function(){
		s = document.getElementById(this.id).style;
		s.left = this.x;
		s.top = this.y;
	};
};

// from stackoverflow
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    xwindow = w.innerWidth || e.clientWidth || g.clientWidth,
    ywindow = w.innerHeight|| e.clientHeight|| g.clientHeight;

for (var i=0; i<nPoints; i++){
	var newPoint = new Point('*', 0, 0, 0, i);
	list_of_points.push(newPoint);
}




function draw_and_move()
{
	for (var a = 0; a<nPoints; a++){
		var angle = a * stepSize + angularOffset;

		circleX = Math.max(radius, xpos);
		circleY = Math.max(radius, ypos);
		circleX = Math.min(xwindow-radius-20, circleX);
		circleY = Math.min(ywindow-radius-20, circleY);

		var x = circleX + Math.cos(angle) * radius;
		var y = circleY + Math.sin(angle) * radius;
		list_of_points[a].move(x,y);
		list_of_points[a].draw();
	}
	angularOffset += speed;

}

function addPoint() {
	nPoints++;
	stepSize = Math.PI * 2 / nPoints;
};

function removePoint(){
	nPoints--;
	s = document.getElementById('l' + nPoints).style;
	s.color = '#999999';
	stepSize = Math.PI * 2 / nPoints;
}


function setRadius(r){
	radius = r;
}

function setSpeed(v){
	speed = v / 10000.0;
}

setInterval('draw_and_move()',1);