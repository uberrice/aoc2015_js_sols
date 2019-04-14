function Distance(cityA,cityB,dist){
    this.cityA = cityA;
    this.cityB = cityB;
    this.dist = dist;
    this.getCities = function () {
        return [this.cityA, this.cityB];
    }
}

function inputParser(inArray, outArray) {
    outArray.push(new Distance(inArray[0],inArray[2],inArray[4]));
}

var fs = require('fs');
var myInputs = fs.readFileSync('d9input.txt').toString().split("\r\n");

var distArray = [];

for (line of myInputs) {
    inputParser(line.split(" "), distArray);
}

console.log(distArray[0].getCities());

var allCities = {};

for (dists of distArray) {
    if(!(allCities[dists.cityA])){
        allCities[dists.cityA] = true;
    }
    if(!(allCities[dists.cityB])){
        allCities[dists.cityB] = true;
    }
}

console.log(allCities);