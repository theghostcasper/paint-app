/* Basic app module, not the best, but can do*/
var app = (function(selector){
	let penColor = 'black';
	let penWidth = '20px';
	let xpos = 0;
	let ypos = 0;
	let penIsDown = false;

	function chanceColor(color,width){
		penColor = color;
		penWidth = width;
	}
	function penDown(){
		penIsDown = true;
	}
	function penUp(){
		penIsDown = false;
	}
	function erase(){
		penColor = 'white';
		penWidth = '20px';
	}
	function clear(){
		selector.innerHTML = ''
	}
	function mouseMoved(x,y){
		xpos = x;
		ypos = y;		
		if(penIsDown) {
			draw();
		}
	}
	function draw(){
		/* create a dummy paragraph element*/
		var bit = document.createElement("p");

		/* apply some styles */
		bit.style.width = penWidth;
		bit.style.height = penWidth;
		bit.style.borderRadius = '50%';
		bit.style.backgroundColor = penColor;
		bit.style.position = 'absolute';
		bit.style.left = xpos+'px';
		bit.style.top = ypos + 'px';
		bit.style.transform = "translate(-50%,-50%)";
		bit.style.zIndex = 10;

		/*  append to the dom 	*/
		selector.appendChild(bit);
	}
	return {
		penDown,
		erase,
		clear,
		mouseMoved,
		penUp,
		penWidth,
		chanceColor
	} 
})(document.getElementById('app'));





/* The main application */
(function main(){
	/* always get the mouse position */
	document.querySelector('.app').addEventListener('mousemove', function(e){
		app.mouseMoved(e.clientX, e.clientY);

	})

	/* when mouse is down, draw*/
	document.querySelector('.app').addEventListener('mousedown', function(e){
		app.penDown();
	})

	/* when mouse is up, stop*/
	document.querySelector('.app').addEventListener('mouseup', function(e){
		app.penUp();
	})

	/*  use the user's color */
	document.querySelector('.tool-box__colors').addEventListener('click',function(e){
		if(typeof e.target.title == 'string' && e.target.title) {
			app.chanceColor(e.target.title,'20px');
		}
	})

	/* erase or clear, might have to be updated..*/
	document.querySelector('.tool-box__buttons').addEventListener('click',function(e){
		if(e.target.innerText == 'Erase'){
			app.erase();
		}
		else if(e.target.innerText == 'clear'){
			app.clear();
		}
	})
})();
