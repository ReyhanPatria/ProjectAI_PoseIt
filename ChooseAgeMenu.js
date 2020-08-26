class ChooseAgeMenu {
    constructor() {
        this.headerRect = {
            image: loadImage("assets/HeaderRect.png"),
            x: 0,
            y: 0,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.chooseAgeTitle = {
            image: loadImage("assets/ChooseAgeTitle.png"),
            x: 150,
            y: 250,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.childButton = {
            image: loadImage("assets/ChildButton.png"),
            imageRatio: 0.7,
            x: 780,
            y: 140,

            getWidth: function() {
                return this.image.width * this.imageRatio;
            },

            getHeight: function() {
                return this.image.height * this.imageRatio;
            },

            show: function() {
                image(this.image, this.x, this.y, this.getWidth(), this.getHeight());
                this.mouseHover();
            },
            
            mouseHover: function() {
                if(mouseX < this.x + this.getWidth() && mouseX > this.x) {
                    if(mouseY < this.y + this.getHeight() && mouseY > this.y) {
                        cursor(HAND);
                    }
                }
            },

            mousePressed: function() {
                if(mouseX < this.x + this.getWidth() && mouseX > this.x) {
                    if(mouseY < this.getHeight() && mouseY > this.y) {

                    }
                }
            }
        }

        this.adultButton = {
            image: loadImage("assets/AdultButton.png"),
            imageRatio: 0.7,
            x: 765,
            y: 300,

            getWidth: function() {
                return this.image.width * this.imageRatio;
            },

            getHeight: function() {
                return this.image.height * this.imageRatio;
            },

            show: function() {
                image(this.image, this.x, this.y, this.getWidth(), this.getHeight());
                this.mouseHover();
            },
            
            mouseHover: function() {
                if(mouseX < this.x + this.getWidth() && mouseX > this.x) {
                    if(mouseY < this.y + this.getHeight() && mouseY > this.y) {
                        cursor(HAND);
                    }
                }
            },

            mousePressed: function() {
                if(mouseX < this.x + this.getWidth() && mouseX > this.x) {
                    if(mouseY < this.getHeight() && mouseY > this.y) {

                    }
                }
            }
        }

        this.oldButton = {
            image: loadImage("assets/OldButton.png"),
            imageRatio: 0.7,
            x: 780,
            y: 480,

            getWidth: function() {
                return this.image.width * this.imageRatio;
            },

            getHeight: function() {
                return this.image.height * this.imageRatio;
            },

            show: function() {
                image(this.image, this.x, this.y, this.getWidth(), this.getHeight());
                this.mouseHover();
            },
            
            mouseHover: function() {
                if(mouseX < this.x + this.getWidth() && mouseX > this.x) {
                    if(mouseY < this.y + this.getHeight() && mouseY > this.y) {
                        cursor(HAND);
                    }
                }
            },

            mousePressed: function() {
                if(mouseX < this.x + this.getWidth() && mouseX > this.x) {
                    if(mouseY < this.getHeight() && mouseY > this.y) {

                    }
                }
            }
        }
    }

    drawMenu() {
        background(255);
        cursor(ARROW);

        this.headerRect.show();
        this.chooseAgeTitle.show();
        this.childButton.show();
        this.adultButton.show();
        this.oldButton.show();
    }

    mousePressed() {
        this.childButton.mousePressed();
        this.adultButton.mousePressed();
        this.oldButton.mousePressed();
    }
}