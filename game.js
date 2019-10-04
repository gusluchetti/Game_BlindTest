var Squirrel;
var Hazelnut;
var Left;
var Right;
var Background;
var BGMusic

//initializing game (this includes canvas, listeners and constant updating of game area) and components
function startGame() {
	gameArea.start();
    BGMusic = new sound("");
    Squirrel = new component(64, 64, "resources/squirrel.png", gameArea.canvas.width / 2 - 32, gameArea.canvas.height - 64, "image");
    Hazelnut = new component(64, 64, "resources/hazelnut.png", 30, 30, "image");
    Background = new component(1366, gameArea.canvas.height, "resources/bg.jpg", 0, 0, "image");
    Left = new component(gameArea.canvas.width / 2, gameArea.canvas.height / 2, "rgba(255, 255, 255, 0.5)", 0, gameArea.canvas.height - (gameArea.canvas.height / 2));
    Right = new component(gameArea.canvas.width / 2, gameArea.canvas.height / 2, "rgba(255, 255, 255, 0.5)", gameArea.canvas.width - gameArea.canvas.width / 2, gameArea.canvas.height - (gameArea.canvas.height / 2));
}

var gameArea = {
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

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

    	} else {
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

}   

function updateGameArea() {
    gameArea.clear();

    if (gameArea.x && gameArea.y) {
	    if (Left.clicked()) {
	      Squirrel.x += -7;
	    }
	    if (Right.clicked()) {
	      Squirrel.x += 7;
	    }
 	}

 	Background.update();
    Left.update();
    Right.update();
    Hazelnut.update();
    Squirrel.update();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}