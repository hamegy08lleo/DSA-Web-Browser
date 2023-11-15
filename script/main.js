let tab = new Tab(); 

navigate_specific("Google.com"); 

function navigate() { 
        let address = document.getElementById("input_address").value; 
        tab.navigate(address); 
        showContent(address); 
}

function navigate_specific(address) { 
        tab.navigate(address); 
        showContent(address); 
}

function showContent(address) { 
        let content = document.getElementById("content"); 
        content.innerHTML = "Loading " + address + " ...";         
}

function back() { 
        tab.backPage(); 
        let address = tab.current.address; 
        showContent(address); 
}

function next() { 
        tab.nextPage(); 
        let address = tab.current.address; 
        showContent(address); 
}

document.getElementById("input_address").addEventListener('keydown', function(event) {
        if (event.key === "Enter") { 
                navigate(); 
        }
});