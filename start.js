var Start;
var StartButton;
var Background;
var BGMusic;

//title screen (title and start button)
function startTitle() {
    gameArea.start();
    Background = new component(gameArea.canvas.width, gameArea.canvas.height, "resources/bg.jpg", 0, 0, "image");
    StartButton = new component(200, 100, "#df7126", gameArea.canvas.width / 2 - 100, gameArea.canvas.height  / 2);
    Start = new component(gameArea.canvas.width / 3, 0, "", 0, 0);

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
            context.fillStyle = "#df7126";
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        //button label
        context.font = "44px Arial";
        context.textAlign = "center";
        context.fillStyle = "white";
        context.fillText("START!", gameArea.canvas.width / 2, gameArea.canvas.height  / 2 + 65); 
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

    Background.update();
    StartButton.update();

}