let tab = new Tab(); 

navigate_specific("Google.com"); 

function navigate() { 
        let address = document.getElementById("input_address").value; 
        tab.navigate(address);
        History.add(address);  
        showContent(address); 
}

function navigate_specific(address) { 
        tab.navigate(address); 
        History.add(address);  
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
                History.add(address); 
                showContent(address); 
        }; 
}

function next() { 
        if (tab.nextPage()) { 
                let address = tab.current.address;
                History.add(address); 
                showContent(address); 
        }
}

document.getElementById("input_address").addEventListener('keydown', function(event) {
        if (event.key === "Enter") { 
                navigate(); 
        }
});

function printDate(D = Date()) { 
        return D.toDateString() + " " + D.getHours() + ":" + D.getMinutes() + ":" + D.getSeconds(); 
}

function showHistory() { 
        var menu = document.getElementById("menu_bar"); 
        var browser = document.getElementById("browser"); 
        var on = browser.classList.contains("ShowHistory"); 
        if (on == false) { 
                browser.classList.toggle("ShowHistory");
                for (const i of historyArray) { 
                        let newAddress = document.createElement('span'); 
                        
                        menu.appendChild(newAddress);

                        let newTime = document.createElement('span'); 
                        newTime.classList.toggle("HistoryTime"); 
                        
                        menu.appendChild(newTime);
                        
                        
                        newTime.innerHTML += printDate(i.time); 
                        newAddress.innerHTML += i.address; 
                        
                        
                }
        
        }
        else { 
                menu.innerHTML = ""; 
                browser.classList.toggle("ShowHistory"); 
        }
        
}