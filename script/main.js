newTab(); 
let private = false; 
function navigate() {
        let address = document.getElementById("input_address").value;
        if (address == "") return;
        TabList.currentTab.navigate(address);
        showContent(address);
        if(private == false)
                History.add(address);
        refreshContent(); 
}

function navigate_specific(address) {
        TabList.currentTab.navigate(address);
        showContent(address);
        History.add(address);
        refreshContent(); 
}

function showContent(address = TabList.currentTab.current.address) {
        let content = document.getElementById("tab_content");
        console.log(address);
        content.innerHTML = "Loading " + address + "...";
}

function back() {
        if (TabList.currentTab.backPage()) {
                let address = TabList.currentTab.current.address;
                History.add(address);
                showContent(address);
        };
        refreshContent(); 
}

function next() {
        if (TabList.currentTab.nextPage()) {
                let address = TabList.currentTab.current.address;
                History.add(address);
                showContent(address);
        }
        refreshContent(); 
}

document.getElementById("input_address").addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
                navigate();
        }
});

function printDate(D = Date()) {
        return D.toDateString() + " " + D.getHours() + ":" + D.getMinutes() + ":" + D.getSeconds();
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


                        newAddress.addEventListener('click', function() { 
                                handleClick(i); 
                        });

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

function refreshContent() { 
        let content = document.getElementById("content"); 
        content.innerHTML = ""; 
        let newTabBar = document.createElement("div"); 
        newTabBar.id = "tab_bar"; 
        for (let i = 0; i < TabList.TabArray.length; i++) { 
                let newDiv = document.createElement('div'); 
                let newTabButton = document.createElement('button'); 
                newTabButton.classList.toggle('function')
                newTabButton.id = i; 
                newTabButton.innerHTML = TabList.TabArray[i].current.address;
                newTabButton.onclick = function() {  
                        if (event.button == 0) {
                                console.log("CHUOT TRAI"); 
                                selectTab(i); 
                        }
                }; 

                newTabButton.addEventListener('contextmenu', function (e) {
                        e.preventDefault(); // Ngăn chặn hành vi mặc định của chuột phải
                        deleteTab(i);
                    });
            
                newDiv.appendChild(newTabButton); 

                newTabBar.appendChild(newDiv); 
        }
        content.appendChild(newTabBar); 
        let tab_content = document.createElement("div"); 
        tab_content.id = "tab_content"; 
        content.appendChild(tab_content);
        showContent(); 

}
refreshContent();

function selectTab(index) { 
        console.log(index); 
        TabList.currentTabIndex = index; 
        TabList.currentTab = TabList.TabArray[TabList.currentTabIndex]
        refreshContent(); 
}

function newTab() { 
        TabList.add(); 
        History.add(TabList.currentTab.current.address); 
        refreshContent();
}

function deleteTab(index) { 
        console.log("DELETE" + index); 
        TabList.delete(index); 
        refreshContent(); 
}

function privateMode()
{
        private = !private;  
        console.log(private);
}

function handleClick(address) {
        console.log('You clicked the span element!');
        navigate_specific(address); 
}