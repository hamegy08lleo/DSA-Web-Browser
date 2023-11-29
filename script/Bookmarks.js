let BookmarksSet = new Set(); 
let Bookmarks = {} 

Bookmarks.add = function(address) { 
        BookmarksSet.add(address); 
}

Bookmarks.delete = function(address) { 
        BookmarksMap.delete(address); 
}