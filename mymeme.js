function rotato(mystr) {
    for (let iterat = 0; iterat < 10; iterat++) {
        mystr =  mystr.slice(-1) + mystr.slice(0, mystr.length-1);
        console.log(mystr);
    }

}
var myin = "w3schools";
rotato(myin);
console.log(1);