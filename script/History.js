class Navigation { 
        constructor(address = "", time = "") { 
                this.address = address; 
                this.time = new Date(); 
                console.log(this.time); 
        }
}


history = []

function History() { 

        this.add = function(address) { 
                history.push(new Navigation(address)); 
        }

        this.add = function() { 
                history.length = 0; 
        }

}