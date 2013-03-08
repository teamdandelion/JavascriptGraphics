
var origin = 500, 500;


function Point(sym, x, y, id){
	this.x = x;
	this.y = y;
	this.id = id;
	document.write('<b id="' + id + '">' + sym +'</b>');
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

//function RotatingPoint(sym, x, y)