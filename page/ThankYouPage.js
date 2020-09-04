let headerRect;
let thankYouMessage;
let homeButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    headerRect = {
        image: loadImage("assets/HeaderRect.png"),
        x: 0,
        y: 0,

        show: function() {
            image(this.image, this.x, this.y);
        }
    }

    thankYouMessage = {
        string: "LATIHANMU TELAH SELESAI\nTerima Kasih Telah Menggunakan Aplikasi Ini",
        x: canvas.width / 2,
        y: canvas.height / 2,

        show: function() {
            push();

            textSize(50);
            textAlign(CENTER, CENTER);
            text(this.string, this.x, this.y);

            pop();
        }
    }

    homeButton = {
        image: loadImage("assets/StartAgainButton.png"),
        x: canvas.width / 2 - 143.5,
        y: canvas.height / 2 + 150,

        getWidth: function() {
            return this.image.width;
        },

        getHeight: function() {
            return this.image.height;
        },

        show: function() {
            image(this.image, this.x, this.y);
            this.mouseHover();
        },
        
        mouseHover: function() {
            if(mouseX < this.x + this.image.width && mouseX > this.x) {
                if(mouseY < this.y + this.image.height && mouseY > this.y) {
                    cursor(HAND);
                }
            }
        },

        mousePressed: function() {
            if(mouseX < this.x + this.image.width && mouseX > this.x) {
                if(mouseY < this.y + this.image.height && mouseY > this.y) {
                    window.location.href = "index.html";
                }
            }
        }
    }
}

function draw() {
    background(255);

    headerRect.show();
    thankYouMessage.show();
    homeButton.show();
}

function mousePressed() {
    homeButton.mousePressed();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
	redraw();
}