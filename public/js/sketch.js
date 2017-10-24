var xPos = [];
var yPos = [];
var xNoise = [];
var colState = [];
var boxes = []; 

var space = 6;

var currentMillis = 0;
var previousMillis = 0;
var interval;


function setup() {
  var canvas = createCanvas(displayWidth, displayHeight);
  background(255);
  
  canvas.parent('sketch-holder');

  for (var i = 0; i < width / space; i++) {
    xPos[i] = i * space;
    yPos[i] = 0;
    xNoise[i] = random(1);
    colState[i] = 1;
  }
  
  for(var j = 0; j < 10; j++){
  }

  fill(0);
  interval = int(random(50));
}




function draw() {
  currentMillis = millis();

  for (var j = 0; j < yPos.length; j++) {
    if (yPos[j] > height) {
      yPos[j] = 0; 
      colState[j]++;
    }
  }
  
  if (currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;
    interval = int(random(50));
    noStroke();

    var noiseFactor = random(1);
    var numX = int(random(300));

    for (var i = 0; i < numX; i++) {
      // print("noise: " + noise(noiseFactor)*xPos.length-1);

      var index = int(random(xPos.length - 1));
      var x = xPos[index];
      var y = yPos[index];

      ranFactor = map(y, 0, height, 1, 0.5);
      

      if(colState[index] % 2 === 0){
        fill(255);
        var ran = random(2);
      }
     
      else{
        fill(0);
        var ran = random(ranFactor);
      }
      

      if (ran > xNoise[index]) {
        textSize(space*2);
        text("~", x, y);
      } else {
        //nothing
      }

      yPos[index] += space;
      noiseFactor += 0.1;
    }
   // print(xNoise[45]);
  }
}


function windowResized() {
  centerCanvas();
}