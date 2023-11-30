class Navigation { 
        constructor(address = "", time = "") { 
                this.address = address; 
                this.time = new Date(); 
                this.next = null; 
                this.pre = null
                console.log(this.time); 
        }
}


// let historyArray = [];

class HistoryList { 
        constructor() { 
                this.head = this.tail = null; 
        }
        add(address = String()) { 
                if (this.head == null) { 
                        this.tail = this.head = new Navigation(address);
                }
                else { 
                        let p = new Navigation(address); 
                        this.head.pre = p; 
                        this.head.pre.next = this.head; 
                        this.head = p; 
                }
        }
        clear() { 
                this.tail = this.head = null; 
        }
        erase(navigation = Navigation()) {
                if (navigation != this.head) 
                        navigation.pre.next = navigation.next; 
                else { 
                        this.head = navigation.next; 
                }
                if (navigation != this.tail) 
                        navigation.next.pre = navigation.pre; 
                else {
                        this.tail = navigation.pre; 
                }
        }
}

let historyList = new HistoryList(); 

let History = {}; 

History.add = function(address) { 
        historyList.add(address); 
}

History.clear = function() { 
        historyList.clear(); 
};

History.delete = function(navigation) { 
        historyList.erase(navigation); 
}