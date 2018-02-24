
const variables = () => {
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');	
	let x = canvas.width-200;
	let y = canvas.height-300;
	let dx = 2;
	let dy = 0;
	let ballRadius = 10;

	//paddle
	let paddleHeight = 10;
	let paddleWidth = 75;
	let paddleX = (canvas.width - paddleWidth)/2;
	
	//key controls
	let rightPressed = false;
	let leftPressed = false;

	document.addEventListener('keydown',keyDownHandler,false);
	document.addEventListener('keyup',keyUpHandler,false);
}












/*

		function keyDownHandler(e){
			const { keyCode } = e;
			if(keyCode == 39){
				rightPressed = true;
			}else if( keyCode == 37){
				leftPressed = true;
			}
		}

		function keyUpHandler(e){
			const { keyCode } = e;
			if(keyCode == 39){
				rightPressed = false;

			}else if (keyCode == 37) {
				leftPressed = false;
			}
		}

		const drawPaddle = () => {
			ctx.beginPath();
			ctx.rect(paddleX, canvas.height-paddleHeight,paddleWidth,paddleHeight);
			ctx.fillStyle = 'orange';
			ctx.fill();
			ctx.closePath();
		}
		
		const drawBall = (color) => {
			ctx.beginPath();
			
			//x and y coordinates of arc's center
			//arc radius
			//start angle and end angle
			//direction of drawing(false for closewise);
			ctx.arc(x,y,ballRadius,0,Math.PI*2,false);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();
		}
		
		const draw = () => {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			drawBall();
			drawPaddle();
			if ( x + dx > canvas.width-ballRadius || x + dx < ballRadius){
				dx = -dx;
			}
			
			if(y + dy > canvas.height-ballRadius || y + dy < ballRadius){
				dy = -dy;
			}
			
			if(rightPressed && paddleX < canvas.width - paddleWidth){
				paddleX += 7;

			}else if(leftPressed && paddleX > 0) {
				paddleX -= 7;

			}
			x += dx;
			y += dy;	
		}	
		setInterval(draw,15);	
*/
