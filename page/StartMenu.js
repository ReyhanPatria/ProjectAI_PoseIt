class StartMenu {
    constructor() {
        this.headerRect = {
            image: loadImage("assets/HeaderRect.png"),
            x: 0,
            y: 0,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.startTitle = {
            image: loadImage("assets/StartTitle.png"),
            x: 100,
            y: 140,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.startSubtitle = {
            image: loadImage("assets/StartSubtitle.png"),
            x: 100,
            y: 380,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.startButton = {
            image: loadImage("assets/StartButton.png"),
            x: 100,
            y: 500,

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
                        changeMenu(new ChooseAgeMenu());
                    }
                }
            }
        }
    }

    drawMenu() {
        background(255);
        cursor(ARROW);

        this.headerRect.show();
        this.startTitle.show();
        this.startSubtitle.show();
        this.startButton.show();
    }

    mousePressed() {
        this.startButton.mousePressed();
    }
}