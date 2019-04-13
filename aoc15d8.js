var fs = require('fs');
var myInputs = fs.readFileSync('d8input.txt');
var test = myInputs.length;
var test2 = myInputs.toString();
var test3 = test2.split("\r\n")[1];
console.log(test);
console.log(test3);
console.log(test3.length);

console.log("test\nmoretest\n");


function stringParser(instr){
    let regex1 = /(").*\1/;
    for (c of instr) {
        switch (c) {
            case '"':
                
                break;
        
            default:
                break;
        }
    }
}


let regex1 = /(").*\1/;

console.log('whew, " this is  amazing'.match(regex1));