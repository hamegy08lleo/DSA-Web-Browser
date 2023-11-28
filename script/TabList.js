
let TabList = {}; 

TabList.TabArray = [];
TabList.currentTabIndex = -1; 
TabList.currentTab = null; 

TabList.add = function() { 
        this.TabArray.push(new Tab());
        this.currentTabIndex = this.TabArray.length - 1; 
        this.currentTab = this.TabArray[this.currentTabIndex];
}

TabList.delete = function(index) { 
        let needRefresh = false; 
        if (this.currentTabIndex == index) { 
                needRefresh = true;
        }
        for (let i = index; i < this.TabArray.length - 1; i++) { 
                this.TabArray[i] = this.TabArray[i + 1]; 
        }
        this.TabArray.pop(); 
        if (needRefresh == true) { 
                if (index - 1 >= 0) { 
                        this.currentTabIndex--; 
                        this.currentTab = this.TabArray[index-1]; 
                }
  
        }
        if (this.TabArray.length == 0) { 
                this.add(); 
        }
}