class ChooseAgeMenu {
    constructor() {
        this.headerRect = loadImage("assets/HeaderRect.png");
        this.chooseAgeTitle = loadImage("assets/ChooseAgeTitle.png");
        this.childButton = loadImage("assets/ChildButton.png");
        this.adultButton = loadImage("assets/AdultButton.png");
        this.oldButton = loadImage("assets/OldButton.png");
    }

    drawMenu() {
        background(255);
        image(this.headerRect, 0, 0);
        image(this.chooseAgeTitle, 150, 250);
        image(this.childButton, 780, 140, this.childButton.width * 0.7, this.childButton.height * 0.7);
        image(this.adultButton, 765, 295, this.adultButton.width * 0.7, this.adultButton.height * 0.7);
        image(this.oldButton, 780, 480, this.oldButton.width * 0.7, this.oldButton.height * 0.7);
    }

    mousePressed() {

    }
}