function Light(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.lit = false;
}

// var myIn = ["turn on 887,9 through 959,629", "turn off 370,819 through 676,868", "toggle 831,394 through 904,860"];

// var myIn = ["turn on 0,0 through 0,0"];

var fs = require('fs');
var myIn = fs.readFileSync('d6input.txt').toString().split("\r\n");


var myClass = /(turn on |turn off |toggle | through )/;

var lArr = new Array(1000);

for (let i = 0; i < lArr.length; i++) {
    lArr[i] = new Array(1000);
    for (let j = 0; j < lArr[i].length; j++) {
        lArr[i][j] = new Light(i,j);       
    }
}

//instruction parser
var testl = new Light(0,0);
for (instr of myIn) {
    let instrArr = instr.split(myClass);
    let operation;

    //decide which operation to do
    switch (instrArr[1]) {
        case "turn on ":
            operation = function (l){ l.lit = true; }
            break;
        case "turn off ":
            operation = function (l){ l.lit = false; }  
            break;
        case "toggle ":
            operation = function (l){ l.lit = !l.lit; }
            break;
        default:
            operation = function (l){}
            break;
    }
    operation(testl);
    var [startX, startY] = instrArr[2].split(",").map(Number);
    var [stopX, stopY] = instrArr[4].split(",").map(Number);
    for (let xProg = startX; xProg <= stopX; xProg++) {
        for (let yProg = startY; yProg <= stopY; yProg++) {
            operation(lArr[xProg][yProg]);            
        }
    }
}
var litlights = 0;
for (let i = 0; i < lArr.length; i++) {
    for (let j = 0; j < lArr[i].length; j++) {
        if(lArr[i][j].lit){
            litlights++;
        }
    }
}

console.log(litlights);