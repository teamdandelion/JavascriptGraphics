var defaultDepth = 700;
var sym = '.';
var baseSize = 14;

function Point3D(x, y, z, id){
	console.log('point with id', id);
	this.id = id;
	this.pSize = baseSize;
	document.writeln('<p id="' + id + '">' + sym +'</b>');
	s = document.getElementById(this.id).style;
	s.position = 'absolute';
	s.fontSize = 0 + 'px';

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
		e = document.getElementById(this.id);
		
		if (e == null){
			console.log('bad point id:', this.id);
			return;
		}

		s = e.style;

		pSize = baseSize * defaultDepth / this.z;

		s.left = this.x - pSize * .165;
		s.top  = this.y - pSize * .850;
		s.fontSize = pSize + 'px';
		sf = Math.pow(defaultDepth / this.z, 3);

		o = ((-180.0)/360) * this.z + 280;


		if (o > 255) o = 255;
		if (o < 0  ) o = 0;
		o = Math.floor(o);
 
		s.color = 'rgb(' + o + ', ' + o + ', 0)';
		//console.log('fontSize set to ' + this.pSize + 'px');
		s.zIndex = Math.floor(700-this.z); 
	};

	this.removeSelf = function(){
		//e = document.getElementById(this.id);
		//e.parentNode.removeChild(e);
	}

};