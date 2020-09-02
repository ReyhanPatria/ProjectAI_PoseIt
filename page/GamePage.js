let headerRect;
let webcam;

let neuralNet;
let poseNet = {
    instance: null,
    poseObj: null,
    poseLabel: ""
};

let currentNeuralNetIdx = 0;
let currentPoseIdx = 0;
let currentPoseLabel = "";
let currentPoseScore = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    headerRect = {
        image: loadImage("assets/HeaderRect.png"),
        x: 0,
        y: 0,

        getWidth() {
            return this.image.width;
        },

        getHeight() {
            return this.image.height;
        },

        show() {
            image(this.image, this.x, this.y);
        }
    }

    webcam = {
        instance: createCapture(VIDEO),
        x: canvas.width / 2,
        y: 92,

        show() {
            push();

            translate(canvas.width, 0);
            scale(-1, 1);

            image(this.instance, this.x, this.y);

            pop();
        }
    }

    loadNeuralNet();
    loadPoseNet();
}

function draw() {
    drawBackground();

    checkCurrentPose();

    headerRect.show();
    webcam.show();
    drawPose();

    textSize(50);
    textAlign(CENTER);
    fill(0);
    text(currentPoseLabel, canvas.width / 2, 130);
    text(currentPoseScore, canvas.width / 2, 180)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	redraw();
}

function drawBackground() {
    fill(127);
    rect(0, 0, canvas.width / 2, canvas.height);

    fill(255);
    rect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
}





// Game Logic
function checkCurrentPose() {
    currentPoseLabel = neuralNet.poseLabel[currentPoseIdx];

    if(currentPoseScore >= 100) {
        currentPoseScore = 0;
        currentPoseIdx++;

        if((currentPoseIdx) % 2 == 0) {
            currentNeuralNetIdx++;
        }

        if(currentPoseIdx >= neuralNet.poseLabel.length || currentNeuralNetIdx >= neuralNet.model.length) {
            window.location.href = "index.html";
        }
    }

    if(currentPoseLabel == poseNet.poseLabel) {
        currentPoseScore++;
    }
}





// Load PoseNet
function loadPoseNet() {
	poseNet.instance = ml5.poseNet(webcam.instance, function() {
		console.log("PoseNet loaded");
	});
	poseNet.instance.on("pose", getPoses);
}

// Get pose from PoseNet
function getPoses(result) {
	if(result[0]) {
		poseNet.poseObj = result[0].pose;

		// Calls neuralNet.predict() when state is "classify"
		if(neuralNet) {
			let inputs = [];

			for (let i = 0; i < poseNet.poseObj.keypoints.length; i++) {
				let x = poseNet.poseObj.keypoints[i].position.x;
				let y = poseNet.poseObj.keypoints[i].position.y;
				inputs.push(x);
				inputs.push(y);
			}

			neuralNet.model[currentNeuralNetIdx].instance.predict(inputs, getOutput);
		}
	}
}

// Draw pose
function drawPose() {
	push();

	translate(canvas.width, 0);
	scale(-1, 1);

	if(poseNet.poseObj) {
		for(let i in poseNet.poseObj) {
			if(poseNet.poseObj[i].confidence > 0.80) {
				let x = poseNet.poseObj[i].x + webcam.x;
				let y = poseNet.poseObj[i].y + webcam.y;

				ellipse(x, y, 10);
			}
		}
	}

	pop();
}





// Load neural net
function loadNeuralNet() {
    let age = localStorage.getItem("age");
    switch(age) {
        case "young":
            neuralNet = new YoungNeuralNet();
            break;

        case "adult":
            neuralNet = new AdultNeuralNet();
            break;

        case "old":
            neuralNet = new OldNeuralNet();
            break;
    }
}

function getOutput(error, result) {
	if(error) {
		console.log(error);
		return;
	}

	console.log(result[0].label);
	poseNet.poseLabel = result[0].label;
}