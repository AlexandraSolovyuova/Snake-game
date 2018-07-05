var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var keyUp = document.getElementById('keyUp');
var keyDown = document.getElementById('keyDown');
var keyLeft = document.getElementById('keyLeft');
var keyRight = document.getElementById('keyRight');

var snake =[{x:10, y:10}];
var fruit = {};
var score = 0;
var dir = "";
var accessKeyboard = true;
var timer = 300;



createFruite();
game();




function addSnake(){
	var x = snake[0].x;
	var y = snake[0].y;
	if (dir=="left") x-=1;
	if (dir=="right") x+=1;
	if (dir=="up") y-=1;
	if (dir=="down") y+=1;
	var obj = [];
	obj.x = x;
	obj.y = y;
	snake.unshift(obj);
	createFruite();
	score++;
}

function testCollision(){
	var x = snake[0].x;
	var y = snake[0].y;
	if (dir=="left") x-=1;
	if (dir=="right") x+=1;
	if (dir=="up") y-=1;
	if (dir=="down") y+=1;
	if (fruit.x==x && fruit.y==y) {
		addSnake();
		return;
	}
	stepSnake();
}

function drawScore(){
	var board = document.getElementById('score');
	board.innerHTML = 'Очки: ' + score;
}

function game(){
	accessKeyboard = true;
	ctx.clearRect(0,0,632,632);
	drawSnake();
	drawFruite();
	drawScore();
	testCollision();
	setTimeout('game()',timer);
	aboutCollision();

}

function stepSnake(){
	var x = 0;
	var y = 0;
	var obj = {};
	obj.x = snake[0].x;
	obj.y = snake[0].y;
	if(dir=='left') x-=1;
	if(dir=='right') x+=1;
	if(dir=='up') y-=1;
	if(dir=='down') y+=1;
	obj.x = meetWall(obj.x + x);
	obj.y = meetWall(obj.y + y);
	if (dir) {
		snake.pop();
		snake.unshift(obj);

	}

}

function meetWall(value){
	if(value<0) value = 20;
	if(value>20) value = 0;
	return value;
}

document.onkeydown = function(event){
	if (accessKeyboard){
	if(event.keyCode==37 || event.keyCode==65  && dir!="right") dir='left';
	if(event.keyCode==38 || event.keyCode==87  && dir!="down") dir='up';
	if(event.keyCode==39 || event.keyCode==68  && dir!="left") dir='right';
	if(event.keyCode==40 || event.keyCode==83  && dir!="up") dir='down';
	accessKeyboard = false;
}
}

function drawFruite(){
	var x = fruit.x*30+2;
	var y = fruit.y*30+2;
	ctx.fillStyle = 'orange';
	ctx.fillRect(x, y, 28, 28); 
}

function createFruite(){
		var x = Math.floor(Math.random()*21);
		var y = Math.floor(Math.random()*21);
		for (var i=0; i<snake.length; i++) {
			if(x==snake[i].x && y==snake[i].y) {
				createFruite();
				return;
			}	
		}
		fruit.x = x;
		fruit.y = y;
}

function drawSnake(){
	ctx.fillStyle = "red";
	for (var i=0; i<snake.length; i++) {
		var x = snake[i].x*30+2;
		var y = snake[i].y*30+2;
		ctx.fillRect(x, y, 28, 28);
	}
}

 
function aboutCollision() {
	if(snake.length>4) {
		var x=snake[0].x;
		var y=snake[0].y;
		for(var i=4; i<snake.length; i++) {
			if(x==snake[i].x && y==snake[i].y) {
				dir='';
				snake = [{x:10, y:10}];
				score=0;
				createFruit();
				

			}
		}
	}
}

keyUp.ontouchend = function() {
	if (accessKeyboard && dir!=down){
		dir = "up";
		accessKeyboard=false;

	}
}
keyUp.onclick = function() {
	if (accessKeyboard){
		dir = "up";
		accessKeyboard=false;

	}
}
keyDown.ontouchend = function() {
	if (accessKeyboard && dir!=up){
		dir = "down";
		accessKeyboard=false;

	}
}
keyDown.onclick= function() {
	if (accessKeyboard){
		dir = "down";
		accessKeyboard=false;

	}
}
keyLeft.ontouchend = function() {
	if (accessKeyboard && dir!=right){
		dir = "left";
		accessKeyboard=false;

	}
}
keyLeft.onclick = function() {
	console.log('2');
	if (accessKeyboard){
		dir = "left";
		accessKeyboard=false;

	}
}
keyRight.ontouchend = function() {
	if (accessKeyboard && dir!=left){
		dir = "right";
		accessKeyboard=false;

	}
}
keyRight.onclick = function() {
	if (accessKeyboard){
		dir = "right";
		accessKeyboard=false;

	}
}