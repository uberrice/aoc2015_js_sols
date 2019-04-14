var fs = require('fs');
var myInputs = fs.readFileSync('d8input.txt');


var totlength = 0;
var texlength = 0;
var deltalength = 0; //for part two
function stringParser(instr) {
    for (let index = 0; index < instr.length; index++) {
        switch (instr[index]) {
            case '\\':
                switch (instr[index + 1]) {
                    case '\\':
                        index++; //skips character
                        totlength++;
                        texlength++;
                        deltalength+=2; //needs two more escape characters (for each of the \s)
                        break;
                    case 'x':
                        index += 3; //skips next 3 characters (the code)
                        totlength += 3;
                        texlength++;
                        deltalength++; //needs one more escape character (before the \)
                        break;
                    case '"':
                        index++; //skips character
                        totlength++;
                        texlength++;
                        deltalength+=2;//needs two more escape characters (one for the \ and one for the ")
                        break;
                    default:
                        console.log("this can't be, line :" + instr);
                }
                break;
            case '"':
                deltalength++; //needs one more escape character
                break;
            default:
                texlength++; 
                break;
        }
        totlength++;
    }
    deltalength+=2; //for the beginning and ending "s
}

for (const instr of myInputs.toString().split("\r\n")) {
    stringParser(instr);
}

console.log("tex: " + texlength + " tot: " + totlength);
console.log("solution: " + (totlength - texlength));
console.log("solution for part 2: " + deltalength);