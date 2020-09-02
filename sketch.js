let menu;

function setup() {
	createCanvas(windowWidth, windowHeight);
	menu = new StartMenu();
}


function draw() {
	menu.drawMenu();
}

function mousePressed() {
	menu.mousePressed();
}

function changeMenu(newMenu) {
	clear();
	menu = newMenu;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	redraw();
}