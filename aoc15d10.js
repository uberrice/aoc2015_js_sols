var input = "1113222113";
var output = "";
function lookAndSay(s){
    let occur = 1;
    for (let index = 0; index < s.length; index++) {
        let c = s[index];
        let c2 = s[index+1];
        if((c === c2) && (c2 !=undefined)){
            occur++;
        } else{
            output+= occur;
            output+= c;
            lookAndSay(s.slice(index+1));
            break;
        }
    }
}
lookAndSay(input);
for (let i = 0; i < 40; i++) {
    let o2 = output;
    output = "";
    lookAndSay(o2);
}
//doesn't work because it's too recursive :(

console.log(output);