var fs = require('fs');
var myInputs = fs.readFileSync('d8input.txt');

console.log("test\nmoretest\n");

var totlength = 0;
var texlength = 0;
function stringParser(instr) {
    for (let index = 0; index < instr.length; index++) {
        switch (instr[index]) {
            case '\\':
                switch (instr[index + 1]) {
                    case '\\':
                        index++;
                        totlength++;
                        texlength++;
                        break;
                    case 'x':
                        index += 3;
                        totlength += 3;
                        texlength++;
                        break;
                    case '"':
                        index++;
                        totlength++;
                        texlength++;
                        break;
                    default:
                        console.log("this can't be, line :" + instr);
                }
                break;
            case '"':
                break;
            default:
                texlength++;
                break;
        }
        totlength++;
    }
}

for (const instr of myInputs.toString().split("\r\n")) {
    stringParser(instr);
}

console.log("tex: " + texlength + " tot: " + totlength);
console.log("solution: " + (totlength - texlength));