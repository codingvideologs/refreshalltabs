// Initialize butotn with users's prefered color
let refreshAllTabs = document.getElementById("refreshAllTabs");


// When the button is clicked, it will retrieve all tabs IDs and reload its page.
refreshAllTabs.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.windows.getCurrent({ populate: true }, function (currentWindow) {
    console.debug("Current Window: " + currentWindow);
    tabs = {};
    tabIds = [];

    for (var j = 0; j < currentWindow.tabs.length; j++) {
      tabIds[tabIds.length] = currentWindow.tabs[j].id;
      tabs[currentWindow.tabs[j].id] = currentWindow.tabs[j];
    }
    console.debug("tabs: " + tabs);
    console.debug("tabIds: " + tabIds);
    console.debug("tabs.length: " + tabs.length);
    for (var i = 0; i < tabIds.length; i++) {
      console.debug("tab id: " + tabIds[i]);
      chrome.scripting.executeScript({
        target: { tabId: tabIds[i] },
        function: reload(tabIds[i]),
      }).catch(e => {
        console.debug(e);
      });
    }
  });
});

function reload(id) {
  console.debug("Reload tab " + id);
  // reload the specify id tab.
  chrome.tabs.reload(id);
}