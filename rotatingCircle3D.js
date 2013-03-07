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


var myCircle = new Circle('*', 50, 50, 0, 100, 6, 0, 'gold', .0001);



setInterval('myCircle.rotate()',1);