let x=100;
let y = 100;
let poseNet;
let pose;

function setup() {
	createCanvas(windowWidth, windowHeight);
	webcam = createCapture(VIDEO);
	webcam.hide();
	poseNet = ml5.poseNet(webcam, function ()
	{
		console.log(poseNet);
		console.log("model loaded");
	}
	);
	poseNet.on("pose",getPoses);
}


function draw() {
	background(255, 0, 0)
	
	image(webcam, 0, 0);

	if(pose)
	{
		for(i in pose.pose)
		{
			if(pose.pose[i].confidence > 0.90)
			{
				ellipse(pose.pose[i].x,pose.pose[i].y,25);
			}				
		}	
	}
}

function getPoses(results)
{
	pose = results[0];
	console.log(pose);
}