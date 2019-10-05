var Squirrel;
var Hazelnut =[];
var Left;
var Right;
var Background;
var BGMusic;
//TUGA
var Score;
var sco = 0;
var lives = 3;

//initializing game (this includes canvas, listeners and constant updating of game area) and components
function startGame() {
    gameArea.start();
    Background = new component(gameArea.canvas.width, gameArea.canvas.height, "resources/bg.jpg", 0, 0, "image");
    Squirrel = new component(64, 64, "resources/squirrel.png", gameArea.canvas.width / 2 - 32, gameArea.canvas.height - 64, "image");
    Left = new component(gameArea.canvas.width / 2, gameArea.canvas.height / 2, "rgba(255, 255, 255, 0.5)", 0, gameArea.canvas.height - (gameArea.canvas.height / 2));
    Right = new component(gameArea.canvas.width / 2, gameArea.canvas.height / 2, "rgba(255, 255, 255, 0.5)", gameArea.canvas.width - gameArea.canvas.width / 2, gameArea.canvas.height - (gameArea.canvas.height / 2));
    //TUGA
    Score = new component("30px", "Consolas", "black", 200, 40, "text");
}



var gameArea = {
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        //tuga
        this.frame = 0;

        //listening for mouse click
		window.addEventListener('mousedown', function (e) {
            gameArea.x = e.pageX;
            gameArea.y = e.pageY;
        })

        //listening for mouse release
        window.addEventListener('mouseup', function (e) {
            gameArea.x = false;
            gameArea.y = false;
        })

        //listening for screen touch
        window.addEventListener('touchstart', function (e) {
			gameArea.x = e.pageX;
			gameArea.y = e.pageY;
    	})

        //listening for screen touch release
	    window.addEventListener('touchend', function (e) {
			gameArea.x = false;
			gameArea.y = false;
	    })
        
    },
    
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    
    if (type == "image") {
	    this.image = new Image();
	    this.image.src = color;
  	}
  	
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function(){
        context = gameArea.context;

		if (type == "image") {
      	context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
      	//tuga
  		else if (this.type == "text") {
      		context.font = this.width + " " + this.height;
      		context.fillStyle = color;
      		context.fillText(this.text, this.x, this.y);
    	}
    
    	else {
	        context.fillStyle = "rgba(255, 255, 255, 0)";
	        context.fillRect(this.x, this.y, this.width, this.height);
    	}

    }   

    // checking if "buttons" were clicked
    this.clicked = function() {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var clicked = true;
	    if ((myright < gameArea.x) || (myleft > gameArea.x)) {
	      clicked = false;
	    }
		return clicked;
  	}

  	// TUGA
  	

  	this.collect = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var collected = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      collected = false;
    }
    
    return collected;
  }

}   

function updateGameArea() {
    gameArea.clear();
    gameArea.frame += 1;

    if (gameArea.x && gameArea.y) {
	    if (Left.clicked()) {
	      Squirrel.x += -7;
	    }
	    if (Right.clicked()) {
	      Squirrel.x += 7;
	    }
 	}
 	for(i = 0; i<Hazelnut.length; i += 1){
		if (Squirrel.collect(Hazelnut[i])){
 			sco += 1;
 			Hazelnut.splice(i);
 		}
 		if (Hazelnut[i].y > gameArea.canvas.height+64){
 			Hazelnut.splice(i);
 			lives -= 1;
 		}
 	}
 	if (gameArea.frame % 50 == 0 || gameArea.frame % 72 == 0 || gameArea.frame % 123 == 0){
 		nuty = -50;
 		nutx = Math.random()*(gameArea.canvas.width);
 		size = Math.random()*10 + 40;
 		Hazelnut.push(new component(size, size, "resources/hazelnut.png", nutx, nuty, "image"));
 	}
 	Background.update();
    Left.update();
    Right.update();
    for(i = 0; i<Hazelnut.length; i += 1){
    	Hazelnut[i].y += 5;
    	Hazelnut[i].update();
    }       
    Squirrel.update();
    Score.text = "Pontos: " + sco + " Vidas: " + lives;
 	Score.update();
}