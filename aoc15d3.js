var fs = require('fs');
var textByLine = fs.readFileSync('d3input.txt').toString();
// var textByLine = "<<<<>>>>>>";
// console.log(textByLine);


function HousePos(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.getPos = function () {
        return [this.xPos, this.yPos];
    }
}
var santaPos = [0, 0];
var roboPos = [0,0];
var realSanta = [0,0];
var turnIndexer = false; //false for santa, true for robosanta
var index = 1;
var posArray = ["0,0"];
for (dir of textByLine) {
    if(turnIndexer){//robosanta's turn
        santaPos = roboPos;
    } else{//real santa's turn
        santaPos = realSanta;
    }
    if( dir === "<"){
        santaPos = [santaPos[0]-1 , santaPos[1]];
    }
    if( dir === "^"){
        santaPos = [santaPos[0] , santaPos[1]+1];
    }
    if( dir === ">"){
        santaPos = [santaPos[0]+1 , santaPos[1]];
    }
    if( dir === "v"){
        santaPos = [santaPos[0] , santaPos[1]-1];
    }
    var santaPosStr = santaPos[0] + "," + santaPos[1]
    if(posArray.includes(santaPosStr)){

    }else{
        posArray[index] = santaPosStr;
        index++;
    }
    if(turnIndexer){
        turnIndexer = false;
        roboPos = santaPos;
    } else{
        turnIndexer = true;
        realSanta = santaPos;
    }
}
console.log(posArray);
console.log(index);