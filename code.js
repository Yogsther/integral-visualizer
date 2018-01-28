/*  Skriv ett program som beräknar integralen av funktionen x*sin(x) mellan två punkter som programmet läser in. Använd trapetsmetoden.
    August Möller && Olle Kaiser 28/01-18
*/

var output = document.getElementById("output");

function calculate() {
  output.innerHTML = "Working..."

  var res = Number(document.getElementById("res").value);
  if(res < 1){
    res = 1;
    document.getElementById("res").value = 1;
  }

  window.a = Number(document.getElementById("a").value);
  window.b = Number(document.getElementById("b").value);

  var area = [];

  for (var i = a; i < b; i += 1 / res) {
    var length = 1 / res;
    var pointA = getY(i);
    var pointB = getY(i + length);

    var partArea = length * (pointA + pointB);
    area.push(partArea);
  }

  var totalArea = 0;
  for (var i = 0; i < area.length; i++) {
    totalArea += area[i];
  }

  output.innerHTML = "Area: " + (totalArea).toFixed(3) + "!"
  draw();
}

function getY(x) {
  // This function will return the Y value of the function at an given X coordiante.
  return x * Math.sin(x);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var zoom = 3;

calculate();


function draw() {
  /* Draws the canvas */

  var drawnA = false;
  var drawnB = false;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(0, canvas.height/2, canvas.width, 0.5);
  for (var i = ((canvas.width / 2) * (-1)); i < (canvas.width / 2); i++) {
    if(Math.floor(i/zoom) == a && !drawnA){
      ctx.fillStyle = "#7f2f2f";
      ctx.fillRect(i + (canvas.width / 2), 0, 1, canvas.height);
      drawnA = true;
    }
    if(Math.floor(i/zoom) == b && !drawnB){
      ctx.fillStyle = "#7f2f2f";
      ctx.fillRect(i + (canvas.width / 2), 0, 1, canvas.height);
      drawnB = true;
    }
    ctx.lineTo(i + (canvas.width / 2), getY(i / zoom) + (canvas.width / 4.1));
    ctx.stroke();
    if((i/zoom) > a && (i/zoom) < b){
      ctx.fillStyle = "#f44242";
      ctx.fillRect(i + (canvas.width / 2), (canvas.height/2), 1, getY(i/zoom))
    }


  }
}

function zoomIn(value){
  if(value == "+"){
    if(zoom < 1){
      zoom += 0.1
    } else {
      zoom += 1
    }
  } else {
    if(!(zoom > 1)){
      zoom -= 0.1;
    } else {
      zoom -= 1;
    }
  }
  document.getElementById("zoomStatus").innerHTML = zoom.toFixed(1)+"x"
  draw();
}









//
