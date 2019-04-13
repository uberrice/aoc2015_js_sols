var md5 = require('md5');
var secret = "iwrupvqb";
console.log(md5("hello"));

for (let index = 0; index < 10000000; index++) {
    let input = secret + index;
    if(md5(input).slice(0,6) === "000000"){
        console.log("Solution found: " + input);
        console.log("Resulting hash: " + md5(input));
        break;
    }
}