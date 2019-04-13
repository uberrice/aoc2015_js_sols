var fs = require('fs');
var myInputs = fs.readFileSync('d5input.txt').toString().split("\r\n");

// console.log(myInputs);

var badclassifier = /(ab|cd|pq|xy)/;
var goodclassifier = /(.)\1+/;
var goodstrings = 0;
for (const clastr of myInputs) {
    var mystr = clastr.toString();
    if( !(mystr.match(badclassifier)) ){
        if(mystr.match(goodclassifier)){
            let nOfVowels = 0;
            for (const mychr of mystr) {
                if(mychr === 'a' || mychr === 'e' || mychr === 'i' || mychr === 'o' || mychr === 'u' ){
                    nOfVowels++;
                }
            }
            if(nOfVowels > 2){
                goodstrings++;
            }
        }
    }
}

console.log(goodstrings);
