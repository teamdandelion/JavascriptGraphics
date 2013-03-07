// circle parameters
// Dependency: Shapes2D.js -- BE SURE TO INCLUDE IN HTML
// <script src="Shapes2D.js" type="text/javascript"></script>
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