var defaultDepth = 700;
var sym = '.';
var baseSize = 15;
var pointArea = document.createElement("p");
pointArea.id = "Point area";
document.body.appendChild(pointArea);


function Point3D(id){
	console.log('point with id', id);
	this.element = document.createElement("p");
	this.element.id = id;
	pointArea.appendChild(this.element);
	text = document.createTextNode(".");
	this.element.appendChild(text);
	this.s = this.element.style;

	this.s.position = 'absolute';
	this.s.fontSize = 0 + 'px';

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

	this.draw = function(){
		// Set the point size based on the depth
		// Increasing point size tends to shift the character to the right and down so we
		// will introduce a corrective factor
		pSize = baseSize * defaultDepth / this.z;

		this.s.left = this.x - pSize * .165;
		this.s.top  = this.y - pSize * .850;
		this.s.fontSize = pSize + 'px';
		sf = Math.pow(defaultDepth / this.z, 3);

		o = ((-180.0)/360) * this.z + 280;


		if (o > 255) o = 255;
		if (o < 0  ) o = 0;
		o = Math.floor(o);
 
		this.s.color = 'rgb(' + o + ', ' + o + ', 0)';
		//console.log('fontSize set to ' + this.pSize + 'px');
		this.s.zIndex = Math.floor(700-this.z); 
	};

	this.removeSelf = function(){
		this.element.parentNode.removeChild(this.element);
	}

};