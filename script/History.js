class Navigation { 
        constructor(address = "", time = "") { 
                this.address = address; 
                this.time = new Date(); 
                console.log(this.time); 
        }
}


let historyArray = [];

let History = {}; 

History.add = function(address) { 
        historyArray.push(new Navigation(address));
}

History.clear = function() { 
        historyArray.length = 0; 
}