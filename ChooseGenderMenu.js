class ChooseGenderMenu {
    constructor() {
        this.headerRect = {
            image: loadImage("assets/HeaderRect.png"),
            x: 0,
            y: 0,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.chooseGenderTitle = {
            image: loadImage("assets/ChooseGenderTitle.png"),
            x: 150,
            y: 250,

            show: function() {
                image(this.image, this.x, this.y);
            }
        }

        this.maleButton = {
            image: loadImage("assets/MaleButton.png"),
            imageRatio: 0.8,
            x: 950,
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

        this.femaleButton = {
            image: loadImage("assets/FemaleButton.png"),
            imageRatio: 0.8,
            x: 950,
            y: 400,

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
        this.chooseGenderTitle.show();
        this.maleButton.show();
        this.femaleButton.show();
    }

    mousePressed() {
        this.maleButton.mousePressed();
        this.femaleButton.mousePressed();
    }
}