let tab = new Tab(); 
const history = new History(); 

navigate_specific("Google.com"); 

function navigate() { 
        let address = document.getElementById("input_address").value; 
        tab.navigate(address);
        history().add(address);  
        showContent(address); 
}

function navigate_specific(address) { 
        tab.navigate(address); 
        history().add(address);  
        showContent(address); 
}

function showContent(address) { 
        let content = document.getElementById("content"); 
        console.log(address); 
        content.innerHTML = "Loading " + address + "...";         
}

function back() { 
        if (tab.backPage()) {             
                let address = tab.current.address; 
                history().add(address); 
                showContent(address); 
        }; 
}

function next() { 
        if (tab.nextPage()) { 
                let address = tab.current.address;
                history().add(address); 
                showContent(address); 
        }
}

document.getElementById("input_address").addEventListener('keydown', function(event) {
        if (event.key === "Enter") { 
                navigate(); 
        }
});

function showHistory() { 
        let menu = document.getElementById("menu_bar"); 
        for (const i of history) { 
                menu.innerHTML += i.address + " " + i.time + "\n"; 
        }
}