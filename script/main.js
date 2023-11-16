let tab = new Tab();

navigate_specific("Google.com");

function navigate() {
        let address = document.getElementById("input_address").value;
        if (address == "") return;
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

document.getElementById("input_address").addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
                navigate();
        }
});

function printDate(D = Date()) {
        return D.toDateString() + " " + D.getHours() + ":" + D.getMinutes() + ":" + D.getSeconds();
}


async function myFunction() {
        console.log("start"); 
        await delay(1000); // 1000 milliseconds = 1 second
        console.log("end"); 
}

function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

let mode = ["show-history", "show-bookmarks"]

function refresh_menu_bar(keep) { 
        var browser = document.getElementById("browser"); 
        for (let i of mode) { 
                if (browser.classList.contains(i) && i != keep) { 
                        browser.classList.toggle(i); 
                }
        }
}

function showHistory() {
        var menu_bar = document.getElementById("menu_bar");
        var browser = document.getElementById("browser");
        refresh_menu_bar("show-history"); 
        var on = browser.classList.contains("show-history");
        if (on == false) {
                browser.classList.toggle("show-history");
                menu_bar.innerHTML = "";
                for (const i of historyArray) {
                        let newAddress = document.createElement('span');

                        menu_bar.appendChild(newAddress);

                        let newTime = document.createElement('span');
                        newTime.classList.toggle("right-align");

                        menu_bar.appendChild(newTime);


                        newTime.innerHTML += printDate(i.time);
                        newAddress.innerHTML += i.address;


                }

        }
        else {
                menu_bar.innerHTML = "";
                browser.classList.toggle("show-history");
        }

}

function showBookmarks() { 
        var menu_bar = document.getElementById("menu_bar"); 
        var browser = document.getElementById("browser"); 
        refresh_menu_bar("show-bookmarks"); 
        var on = browser.classList.contains("show-bookmarks"); 
        if (on == false) { 
                menu_bar.innerHTML = "";
                browser.classList.toggle("show-bookmarks");
                for (const i of BookmarksSet) { 
                        let newAddress = document.createElement('span'); 
                        newAddress.classList.toggle("right-align"); 

                        menu_bar.appendChild(newAddress); 

                        newAddress.innerHTML += i; 
                }
        }
        else { 
                menu_bar.innerHTML = ""; 
                browser.classList.toggle("show-bookmarks"); 
        }
}

function addToBookmarks() { 
        let address = document.getElementById("input_address").value; 
        if (address.length == 0) return; 
        Bookmarks.add(address); 
}
