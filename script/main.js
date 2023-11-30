newTab(); 
let private = false; 

function showingHistory() { 
        let on = browser.classList.contains("show-history");
        console.log("DUMACUU"); 
        return on == true; 
}

function navigate() {
        let address = document.getElementById("input_address").value;
        if (address == "") return;
        TabList.currentTab.navigate(address);
        showContent(address);

        if (showingHistory()) refreshHistory(); 
        if(private == false)
                History.add(address);
        refreshContent(); 
        if (showingHistory()) refreshHistory(); 
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
        if(address.length >50){
                address = address.slice(0,50);
        }
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


function getDateTime(now) {
      
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
        const dayAbr = daysOfWeek[now.getDay()];
        const day = now.getDate().toString().padStart(2, '0');
        const monthAbr = monthsOfYear[now.getMonth()];
        const year = now.getFullYear();
      
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
      
        const formattedDateTime = `${dayAbr}, ${day} ${monthAbr} ${year} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
}

// testing

function refreshHistory() { 
        let reversedHistoryArray = historyArray; 
        reversedHistoryArray.reverse(); 
        console.log("REVERSE"); 
        for (const address of reversedHistoryArray) {
                let i = address;
                let newAddress = document.createElement('span');
                console.log(typeof i.address);
                console.log(i.address);
                if(i.address.length >= 50){
                        i.address = i.address.slice(0,50);
                }
                menu_bar.appendChild(newAddress);
                
                let newTime = document.createElement('span');
                newTime.classList.toggle("right-align");
                
                menu_bar.appendChild(newTime);
                
                
                newTime.innerHTML += getDateTime(i.time);
                newAddress.innerHTML += i.address;
                
                newAddress.addEventListener('click',function(){
                        handleClick(i.address);
                });

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
                refreshHistory(); 
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
                for (const address of BookmarksSet) { 
                        let i = address;
                        let newAddress = document.createElement('span'); 
                        newAddress.classList.toggle("right-align"); 
                        if (i.length >= 40){
                                i = i.slice(0,40);
                        }
                        console.log(i.length);


                        newAddress.onclick = function(){
                                if(event.button == 0){
                                        console.log("Chuot trai");
                                        handleClick(i);
                                }
                        };

                        newAddress.addEventListener('contextmenu', function (e) {
                                e.preventDefault(); // Ngăn chặn hành vi mặc định của chuột phải
                                console.log("chuot phai");
                                Bookmarks.delete(i);
                                createNotification("You have deleted Bookmark: "+ i);
                                // refreshBookmark();
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
                let address = TabList.TabArray[i].current.address;
                address = address.slice(0,15);

                newTabButton.innerHTML = address;
                newTabButton.onclick = function() {  
                        if (event.button == 0) {
                                console.log("CHUOT TRAI"); 
                                selectTab(i); 
                        }
                }; 

                newTabButton.addEventListener('contextmenu', function (e) {
                        e.preventDefault(); // Ngăn chặn hành vi mặc định của chuột phải
                        deleteTab(i);
                        createNotification("You have deleted Tab: "+ address);
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

        if(private == true)
        {
                createNotification("You are in private mode");
        }
        else
        {
                createNotification("You are in normal mode");
        }
}

function handleClick(address) {
        console.log('You clicked the span element!');
        navigate_specific(address); 
        createNotification("you have access to: "+ address);    
}

function createNotification(message) {
        const notificationContainer = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        notificationContainer.appendChild(notification);

        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 2000);
}

function user_manual()
{
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
                alert(xhr.responseText);
             } else {
                alert('Error: ' + xhr.status);
             }
           }
        };
        xhr.open('GET', 'Help.txt', true);
        xhr.send(null);
}