class StartMenu {
    constructor() {
        this.headerRect = loadImage("assets/HeaderRect.png");
        this.startButton = loadImage("assets/StartButton.png");
        this.startTitle = loadImage("assets/StartTitle.png");
        this.startSubtitle = loadImage("assets/StartSubtitle.png");
    }

    drawMenu() {
        background(255);
        this.drawCursor();
        
        image(this.headerRect, 0, 0);
        image(this.startTitle, 100, 140);
        image(this.startSubtitle, 100, 380);
        image(this.startButton, 100, 500);
    }

    mousePressed() {
        if(mouseX < 100 + this.startButton.width && mouseX > 100) {
            if(mouseY < 500 + this.startButton.height && mouseY > 500) {
                changeMenu(new ChooseAgeMenu());
                console.log("pressed");
            }
        }
    }

    drawCursor() {
        cursor(ARROW);

        if(mouseX < 100 + this.startButton.width && mouseX > 100) {
            if(mouseY < 500 + this.startButton.height && mouseY > 500) {
                cursor(HAND);
            }
        }
    }
}