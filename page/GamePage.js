let headerRect;
let webcam;

let neuralNet;
let poseNet = {
    instance: null,
    poseObj: null,
    poseLabel: ""
};

let poseAssets;

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

    poseAssets = new PoseAssets();

    loadNeuralNet();
    loadPoseNet();
}

function draw() {
    drawBackground();

    checkCurrentPose();

    headerRect.show();
    webcam.show();
    drawPose();
    drawPoseImage();
    drawPoseLabelAndScore();

    push();

    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("Pastikan Seluruh Tuhuh Dapat Terlihat!", canvas.width / 2, canvas.height - 20);

    pop();
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

function drawPoseImage() {
    let poseImage = poseAssets.images[currentPoseLabel];

    if(poseImage) {
        let imageRatio = 5;
        let width = poseImage.width;
        let height = poseImage.height;
        if(width >= canvas.width / 2) {
            imageRatio =  canvas.width / (2 * width);
        }

        let x = canvas.width * 3 / 4 - width * imageRatio / 2;
        let y = 100;

        image(poseImage, x, y, width * imageRatio, height * imageRatio);
    }
}



// Game Logic
function checkCurrentPose() {
    if(localStorage.getItem("loaded") >= neuralNet.model.length) {
        let expectedPoses = neuralNet.model[currentNeuralNetIdx].instance.data.meta.outputs.output0.uniqueValues;

        if(expectedPoses[currentPoseIdx] == "neutral") {
            currentPoseIdx++;
        }

        if(currentPoseIdx >= expectedPoses.length) {
            currentPoseIdx = 0;
            currentNeuralNetIdx++;

            if(currentNeuralNetIdx >= neuralNet.model.length) {
                window.location.href = "thankYouPage.html";
            }
        }

        currentPoseLabel = expectedPoses[currentPoseIdx];

        if(currentPoseLabel == poseNet.poseLabel) {
            currentPoseScore++;

            if(currentPoseScore >= 100) {
                currentPoseScore = 0;
                currentPoseIdx++;
            }
        }
    }
}

function drawPoseLabelAndScore() {
    push();

    textSize(50);
    textAlign(CENTER);
    fill(0);
    text(currentPoseLabel, canvas.width / 2, 130);
    text(currentPoseScore, canvas.width / 2, 180);

    pop();
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