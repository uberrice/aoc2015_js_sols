var input = "1113222113";
var output = "";
function lookAndSay(s){
    while(s.length != 0){
        let occur = 1;
        for (let index = 0; index < s.length; index++) {
            let c = s[index];
            let c2 = s[index+1];
            if((c === c2) && (c2 !=undefined)){
                occur++;
            } else{
                output+= occur;
                output+= c;
                s = s.slice(index+1);
                break;
            }
        }  
    }
}

lookAndSay(input);

for (let i = 1; i < 50; i++) { //50 for day 2
    let o2 = output;
    output = "";
    lookAndSay(o2);
}
//doesn't work because it's too recursive :(

console.log(output.length);