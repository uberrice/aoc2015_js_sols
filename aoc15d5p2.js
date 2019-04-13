var fs = require('fs');
var myInputs = fs.readFileSync('d5input.txt').toString().split("\r\n");

var classifier1 = /(..).*\1+/; //good classifier, two letters repeat
var classifier2 = /(.).\1/; //good classifier (letter repeating with a letter in between, aba, xbx etc.)

var goodcntr = 0;

console.log("bleaaaoijaef".match(classifier1));

for (const clastr of myInputs) {
    if(clastr.match(classifier1)){
        if(clastr.match(classifier2)){
            goodcntr++;
        }
    }
}

console.log(goodcntr);