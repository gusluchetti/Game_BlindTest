//variables
var old;
var game = false;
var title = false;
var StartText;
var StartButton;
var TitleScreen;
var Squirrel;
var Hazelnut = [];
var Left;
var Right;
var Score;
var sco = 0;
var lives = 3;
var spawn = 90;
var bgmusic;
var Background;

//variable responsible for actual game canvas
var gameArea = {

    // recreating canvas since it was deleted
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.setAttribute("id", "game");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.canvas.width > 800) {
            this.canvas.width = 800;
        }
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvas, 20);
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
    
    stop: function() {
    	clearInterval(this.interval);
    },
    
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }} 

// variable responsible for menu screen canvas
var menuScreen = {
    // making canvas for the first time
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.setAttribute("id", "canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.canvas.width > 800) {
            this.canvas.width = 800;
        }
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvas, 20);

        // listening for mouse click
        window.addEventListener('mousedown', function (e) {
            menuScreen.x = e.pageX;
            menuScreen.y = e.pageY;
        })

        // listening for mouse release
        window.addEventListener('mouseup', function (e) {
            menuScreen.x = false;
            menuScreen.y = false;
        })

        // listening for screen touch
        window.addEventListener('touchstart', function (e) {
            menuScreen.x = e.pageX;
            menuScreen.y = e.pageY;
        })

        // listening for screen touch release
        window.addEventListener('touchend', function (e) {
            menuScreen.x = false;
            menuScreen.y = false;
        })
        
    },
    
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }}

//FUNCTIONS

// title screen (title and start button)
function startTitle() {
    title = true;
    menuScreen.start();
    var msW = menuScreen.canvas.width;
    var msH = menuScreen.canvas.height;
    Background = new component(msW, msH, "resources/bg.jpg", 0, 0, "image");
    TitleScreen = new component(msW, msH, "resources/title_screen.png", 0, 0, "image");
    StartButton = new component((msW / 2.5), msH / 7, "rgba(255, 255, 255, 0.5)", (msW / 2) - (msW / 5), msH / 1.7);
    StartText = new component(0, 0, "", 0, 0, "text");}

// start game and its components
function startGame() {
    game = true;
    bgmusic = new sound("resources/gourmet_race_8bit.mp3");
    bgmusic.play();
    gameArea.start();
    var gaW = gameArea.canvas.width;
    var gaH = gameArea.canvas.height;
    Background = new component(gaW, gaH, "resources/bg.jpg", 0, 0, "image");
    Squirrel = new component(64, 64, "resources/squirrel.png", gaW / 2 - 32, gaH - 64, "image");
    Left = new component(gaW / 2 + 50, gaH / 2, "rgba(255, 255, 255, 0.5)", 0, gaH - (gaH / 2), "button");
    Right = new component(gaW / 2 + 50, gaH / 2, "rgba(255, 255, 255, 0.5)", gaW - gaW / 2, gaH - (gaH / 2), "button");
    Score = new component("30px", "Consolas", "black", 200, 40, "score");}

// facilitates creation of objects in current canvas
function component(width, height, color, x, y, type) {
    var context = menuScreen.context;
    var msW = menuScreen.canvas.width;
    var msH = menuScreen.canvas.height;
    var gaW = gameArea.canvas.width;
    var gaH = gameArea.canvas.height;

    if (game) {
    var context = gameArea.context;
    }

    this.type = type;
    
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }

    if (type == "button") {
        context.fillStyle = "rgba(255, 255, 255, 0)";      
    }

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {

        if (type == "image") {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } 

        else if (type == "button") {
            context.fillStyle = "rgba(255, 255, 255, 0)";      
        }

        else if (type == "text") {
            context.font = "24px Arial";
            context.textAlign = "center";
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.fillText("COMEÇAR!", (msW / 2), msH / 1.5); 
        }

        else if (this.type == "score") {
	    context.font = "35px Consolas";
	    context.fillStyle = color;
	    context.textAlign = "center";
	    context.fillText(this.text, (msW / 2), (msH / 20) + 10);
        }

        else {
            context.fillStyle = "rgba(233, 141, 1, 1)";
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        

    }   

    // checking if any "button" was clicked
    this.clicked = function() {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var clicked = true;

    //click on menuScreen
    if ( (title) && ((mybottom < menuScreen.y) || (mytop > menuScreen.y) || (myright < menuScreen.x) || (myleft > menuScreen.x))) {
      clicked = false;
    }

    //click on gameArea
    else if ( (game) && ((mybottom < gameArea.y) || (mytop > gameArea.y) || (myright < gameArea.x) || (myleft > gameArea.x))) {
      clicked = false;
    }
        
        return clicked;
    }

    //collision detection
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
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        collected = false;
    }
        return collected;
    }}   

// updates canvas according to set interval (50fps in this case)
function updateCanvas() {
    
    //game over check
    if (lives <= 0 && game){
		gameArea.stop();
        game = false;
        bgmusic.stop();
	}
    
    // update depending on current canvas
    if (title) {
        menuScreen.clear();
    }
    else if (game){
        gameArea.clear();
        gameArea.frame += 1;
    }

    //game mechanics
    
    //hazelnut collect
    for(i = 0; i<Hazelnut.length; i += 1) {
		if (Squirrel.collect(Hazelnut[i])){
 			sco += 1;
			if (spawn >= 36){
				spawn -= 1;
			}
 			Hazelnut.splice(i, 1);
 			i--;
 		}
 	}
    
    //hazelnut out of bounds
    for(j = 0; j<Hazelnut.length; j += 1) {
 		if (Hazelnut[j].y > gameArea.canvas.height+64){
 			lives -= 1;
 			Hazelnut.splice(j, 1);
 			j--; 				
 		}	
 	}
    
    //hazelnut spawning
    if (gameArea.frame % spawn == 0) {
 		nuty = -50;
 		nutx = Math.random()*(gameArea.canvas.width - 32);
 		size = Math.random()*10 + 40;
 		Hazelnut.push(new component(size, size, "resources/hazelnut.png", nutx, nuty, "image"));
 	}
    
    //end of game mechanics
    
    // start game when start button is pressed
    if (menuScreen.x && menuScreen.y) {
        if (StartButton.clicked() && title) {
            // deleting old canvas so that new canvas can be created
            old = document.getElementById("canvas");
            old.remove();
            title = false;
            clicked = false;
            startGame();
        }
    }

    // squirrel movement
    if ((gameArea.x && gameArea.y) && (Left && Right)) {
        if (Left.clicked()) {
          Squirrel.x += -7;
        }
        if (Right.clicked()) {
          Squirrel.x += 7;
        }
    }

    // updates for gameArea
    if (game) {
        Background.update();

        //hazelnut movement (y-axis)
        for(i = 0; i<Hazelnut.length; i += 1){
            Hazelnut[i].y += 5;
            Hazelnut[i].update();
        }

        Squirrel.update();
        Left.update();
        Right.update();
        Score.text = "Pontos: " + sco + " Vidas: " + lives;
 	    Score.update();
    }

    // updates for titleScreen
    if (title) {
        Background.update();
        TitleScreen.update();
        StartButton.update();
        StartText.update();
    }}

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
