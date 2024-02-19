function preload() {
    song = loadSound("music.mp3")
    song2 = loadSound("smoothcriminal.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded)
    poseNet.on('pose', gotposes)
}

function modelloaded() {
    console.log("the model has been loaded")
}

function draw() {
    image(video, 0, 0, 600, 500);
    circle(leftwristX, leftwristY, 20)
    circle(rightwristX, rightwristY, 20)
}

function play() {
    song.play()

}

function Stop() {
    song.pause()
    song2.pause()
}

leftwristX = ""
rightwristY = ""
leftwristY = ""
rightwristX = ""
on = ""
no = ""


function gotposes(results) {
    if (results.length > 0) {
        console.log(results)
        leftwristX = results[0].pose.leftWrist.x
        if(results[0].pose.keypoints[10].score > 0.2 && results[0].pose.keypoints[9].score > 0.2) {
            return;
        }
        if (results[0].pose.keypoints[10].score > 0.2) {
            rightwristY = results[0].pose.rightWrist.y
            rightwristX = results[0].pose.rightWrist.x
            rightwristYcal = Math.floor(rightwristY) / 500
            document.getElementById("volume").innerHTML = "song is " + song2
            song.pause()
            if (on != "on") {
                song2.play()
                on = "on"
            }
            
        }
        if (results[0].pose.keypoints[9].score > 0.2) {
            leftwristY = results[0].pose.leftWrist.y
            song2.pause()
            if (no != "no") {
                song.play()
                no = "no"
            }
            /*if (leftwristY > 0 && leftwristY <= 100) {
                song.rate(2.5)
                document.getElementById("speed").innerHTML = "Speed = 2.5x "
            }

            else if (leftwristY > 100 && leftwristY <= 200) {
                song.rate(2)
                document.getElementById("speed").innerHTML = "Speed = 2x "
            }

            else if (leftwristY > 200 && leftwristY <= 300) {
                song.rate(1.5)
                document.getElementById("speed").innerHTML = "Speed = 1.5x "
            }

            else if (leftwristY > 300 && leftwristY <= 400) {
                song.rate(1)
                document.getElementById("speed").innerHTML = "Speed = 1x "
            }

            else if (leftwristY > 400 && leftwristY <= 500) {
                song.rate(0.5)
                document.getElementById("speed").innerHTML = "Speed = 0.5x "
            }*/







        }
        console.log("my coordinates " + leftwristX + " " + leftwristY + " " + rightwristX + " " + rightwristY)
        console.log(results[0].pose.keypoints[10].score)
    }

}


