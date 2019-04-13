var fs = require('fs');
// var myInputs = fs.readFileSync('aoc2015_js_d7/d7input.txt').toString().split("\r\n");
var myInputs = fs.readFileSync('aoc2015_js_d7/d7p2input.txt').toString().split("\r\n");
var linesrun = 0;

function lim16(l){ //16 bit 'implementation'; cuts stuff to 16-bitty size
    return (l & 0xFFFF);
}

function aocLog(inputvars, operand, nr, outputvar){//array of string, string, int, string
    this.inputvars = inputvars;
    this.operand = operand;
    this.outputvar = outputvar;
    this.nr = nr;
    this.unexec = true; //unexecuted yet

    this.tryRunOp = function(dictIn){
        if(this.unexec){
            let mrun = true;
            for (const invar of inputvars) { //are variables in the dictionary?
                if(dictIn[invar] === undefined){ //if it's not in there
                    mrun = false; //don't let it run
                }
            }
            if(mrun){
                this.unexec = false; //this has run to this point, variables are known
                linesrun++;
                //lim16 on each function call is not entirely necessary, but i'm doing it just to avoid potential errors
                switch(operand){
                    case "STO":
                        //directly save value
                        if(this.inputvars.length){ //are there input vars?
                            dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]]);
                        } else{
                            dictIn[this.outputvar] = lim16(this.nr);
                        }
                        break;
                    case "NOT":
                        //one variable, not
                        dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]] ^ 0xFFFF);
                        break;
                    case "AND": //ands can happen with numbers, be careful, nested switch
                        switch(this.inputvars.length){
                            case 1:
                                //one variable, AND with a number
                                dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]] & this.nr);
                            break;
                            case 2:
                                //two variables, AND with 2 variables
                                dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]] & dictIn[this.inputvars[1]]);
                            break;
                        }
                        break;
                    case "OR":
                        dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]] | dictIn[this.inputvars[1]]);
                        break;
                    case "LSHIFT":
                        dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]] << this.nr);
                        break;
                    case "RSHIFT":
                        dictIn[this.outputvar] = lim16(dictIn[this.inputvars[0]] >> this.nr);
                        break;
                }
            }
        }
    }
}


var resultDict = {}; //using an object as a 'dictionary'

var logOps = []; //array to contain aocLog objects
//function to populate objects
//parses the seperated lines into an array of objects to iterate through
for (line of myInputs) { //iterates through and puts in objects
    sL = line.split(" ");
    // console.log(sL);
    //first check if it's a NOT operation
    switch(sL.length){ //length to seperate options
        case 3: //it's a STO
            let tmpval = Number(sL[0]);
            if(tmpval || tmpval === 0){ //a number gets stored, even if it's 0
                logOps.push(new aocLog([],"STO",tmpval,sL[2])); 
            } else{ //a var gets transmitted to another var
                logOps.push(new aocLog([sL[0]],"STO",0,sL[2]));
            }
            break;
        case 4: //it's a NOT
            logOps.push(new aocLog([sL[1]],"NOT", 0, sL[3])); //stores a not object
            break;
        case 5: //it's AND, OR or (L|R)Shift
            switch(sL[1]){
                case "AND":
                    let tmpval = Number(sL[0]);
                    if(tmpval){
                        logOps.push(new aocLog([sL[2]],"AND",tmpval,sL[4])); //it's an AND with a number
                        //attention: this only works if the first operand is a number; as nothing else appears in my
                        //data that's fine, otherwise you'd need to check both.
                    }else{
                        logOps.push(new aocLog([sL[0],sL[2]],"AND",0,sL[4])); //it's an AND with 2 funcs
                    }
                    break;
                case "OR":
                    logOps.push(new aocLog([sL[0],sL[2]],"OR",0,sL[4])); //stores an OR
                    break;
                case "LSHIFT":
                    logOps.push(new aocLog([sL[0]],"LSHIFT",Number(sL[2]),sL[4]));
                    break;
                case "RSHIFT":
                    logOps.push(new aocLog([sL[0]],"RSHIFT",Number(sL[2]),sL[4]));
                    break;
            }
            break;

    }
}
//runs through all lines until everything is run:
while(linesrun < logOps.length){
    for (logOp of logOps) {
        logOp.tryRunOp(resultDict);
    }
    console.log(linesrun);
}

console.log(resultDict);
console.log("a is: " + resultDict["a"]);


// //test code to see if my operations work
// resultDict["a"] = 3;
// resultDict["b"] = 1;
// resultDict["c"] = 4;
// testOb1 = new aocLog(["b"],"STO",0,"stoTest"); //store b in c
// testOb2 = new aocLog(["b"],"NOT",0,"notTest"); //nottest, result has to be 65534
// testOb3 = new aocLog(["b","a"],"AND",0,"andTest"); //and test, result has to be 1
// testOb4 = new aocLog(["b","c"],"OR",0,"orTest"); //or test, result has to be 5
// testOb5 = new aocLog(["a"],"LSHIFT",2,"lShift"); //lshifttest, result has to be 3*4 = 12
// testOb6 = new aocLog(["c"],"RSHIFT",1,"rShift"); //rshifttest, result has to be 2

// testOb1.tryRunOp(resultDict);
// testOb2.tryRunOp(resultDict);
// testOb3.tryRunOp(resultDict);
// testOb4.tryRunOp(resultDict);
// testOb5.tryRunOp(resultDict);
// testOb6.tryRunOp(resultDict);

// console.log(resultDict);