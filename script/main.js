let tab = new Tab(); 

function Navigate() { 
        let address = document.getElementById("input_address").value; 
        tab.navigate(); 
        let content = document.getElementById("content"); 
        content.innerHTML = "Loading " + address + " ...";
}

function Navigate(address) { 
}

function 