function readinput(filename) {
    const fs = require('fs') 
    let returndata;
    fs.readFile(filename, (err, data) => { 
        if (err) throw err; 
        var mydata = data.toString().split("\r\n");
        // var mydata = readinput("d2input.txt");
        // var mydata = ["3x2x4", "1x1x10"];
        var surfacearea = 0;
        var ribbons = 0;
        mydata.forEach(present => {
            let presentsides = present.split("x");
            for (let i = 0; i < presentsides.length; i++) {
                presentsides[i] = parseInt(presentsides[i]); 
            }
            var presar = [];
            for (let i = 0; i < presentsides.length; i++) {
                if(i === (presentsides.length-1)){
                    presar[i] = presentsides[i] * presentsides[0];
                }else{
                    presar[i] = presentsides[i] * presentsides[i+1];
                }
            }
            let minside = Math.min(...presar);
            surfacearea += minside + 2 *(presar[0] + presar[1] + presar[2]);
            presentsides.sort(function(a,b){ //anonymous function declaration, very javascripty!
                return a - b;
            });
            console.log("Sorted: " + presentsides);
            ribbons += (2*(presentsides[0] + presentsides[1]) + (presentsides[0] * presentsides[1] *presentsides[2]))
        });
        console.log(surfacearea);
        console.log("Ribbons: " + ribbons);
            }) 

}



readinput("d2input.txt");