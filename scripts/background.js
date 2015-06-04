// <reference path="jquery-1.11.2.js" />
var id = 5;

// Listen for a click on the camera icon. On that click, take a screenshot.
var addedInnerListener = false;
if (!addedInnerListener) {
    chrome.extension.onMessage.addListener(function (request, sender) {
        var viewTabUrl = chrome.extension.getURL('popup.html?id=' + id++);
        if (request.action == "getScrenShot") {
            chrome.tabs.create({ url: viewTabUrl }, function (tab) {
                var selfTabId = tab.id;
                chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                    if (changeInfo.status == "complete" && tabId == selfTabId) {
                        var tabs = chrome.extension.getViews({ type: "tab" });
                        tabs[tabs.length - 1].placePicture(request.img);
                    }
                });
            });
        }
    });

    addedInnerListener = !addedInnerListener;
}