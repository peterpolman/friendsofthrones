chrome.storage.sync.set({'active': true});

chrome.browserAction.onClicked.addListener(function() {

    chrome.storage.sync.get('active', function(result){
        
        if (result.active == true){
            
            chrome.browserAction.setIcon({path:"icon-on.png"});

            chrome.storage.sync.set({'active': false});

            chrome.tabs.reload();

        } else {
            
            chrome.browserAction.setIcon({path:"icon-off.png"});

            chrome.storage.sync.set({'active': true});

            chrome.tabs.reload();
        }

    });
        
});
