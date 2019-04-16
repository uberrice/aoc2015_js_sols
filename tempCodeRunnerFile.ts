var input : string = "cqjxjnds";

function aInc(ip: string): string{
    if(ip.slice(-1).match(/[hnk]/)){
        return ip.slice(0, ip.length-1) + String.fromCharCode(2+ip.charCodeAt(ip.length-1));
    } else if(ip.slice(-1) != "z"){
        return ip.slice(0, ip.length-1) + String.fromCharCode(1+ip.charCodeAt(ip.length-1));
    }
    else{
        return (aInc(ip.slice(0,-1)) + "a"); //sweet sweet recursion
    }
}

function what(ip : string): string{
    //todo: check double chars (two of them)
    while(true){
        if(ip.match(/(.)\1.*(.)\2/)){ //check if double chars exist
            for (let index = 0; index < ip.length-2; index++) {
                if((ip.charCodeAt(index)+2) === (ip.charCodeAt(index+1)+1) && (ip.charCodeAt(index+1)+1) === ip.charCodeAt(index+2)) { //check for increasing chars
                    if(!ip.match(/[iol]/)){
                        return ip;

                    }
                }  
            }
        }
        ip = aInc(ip);
        //console.log(ip);

    }
    
}

console.log("part 1 sol: " + what(input));
console.log("part 2 sol: " + what(aInc(what(input))));