
let TabList = {}; 

TabList.TabArray = [];
TabList.currentTabIndex = -1; 
TabList.currentTab = null; 

TabList.add = function() { 
        this.TabArray.push(new Tab());
        this.currentTabIndex = this.TabArray.length - 1; 
        this.currentTab = this.TabArray[this.currentTabIndex];
}