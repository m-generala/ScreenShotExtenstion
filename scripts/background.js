/// <reference path="jquery-1.11.2.js" />
var id = 5;

// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function () {
    chrome.extension.onMessage.addListener(function (request, sender) {
        var viewTabUrl = chrome.extension.getURL('popup.html?id=' + id++);
        if (request.action == "getScrenShot") {
            chrome.tabs.create({ url: viewTabUrl }, function (tab) {
                var selfTabId = tab.id;
                chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                    if (changeInfo.status == "complete" && tabId == selfTabId) {
                        var tabs = chrome.extension.getViews({ type: "tab" });
                        alert(request.img);
                        tabs[0].placePicture(request.img);
                    }
                });
            });
        }
    });

    chrome.tabs.executeScript(null, {
        file: "libs/tinyColor.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.extension.lastError) {
            alert(chrome.extension.lastError.message);
            message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
        }
    });

    chrome.tabs.executeScript(null, {
        file: "libs/html2canvas.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.extension.lastError) {
            alert(chrome.extension.lastError.message);
            message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
        }
    });

    if (false) {
        chrome.tabs.executeScript(null, {
            file: "scripts/screenShotFull.js"
        }, function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.extension.lastError) {
                alert(chrome.extension.lastError.message);
                message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
    } else {
        chrome.tabs.executeScript(null, {
            file: "scripts/screenShotPartial.js"
        }, function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.extension.lastError) {
                alert(chrome.extension.lastError.message);
                message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
    }

    //alert($('#gc-pagecontent').attr('role'));
    //chrome.tabs.captureVisibleTab(function (screenshotUrl) {
    //    var viewTabUrl = chrome.extension.getURL('popup.html?id=' + id++)
    //    var targetId = null;

    //    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    //        // We are waiting for the tab we opened to finish loading.
    //        // Check that the tab's id matches the tab we opened,
    //        // and that the tab is done loading.
    //        if (tabId != targetId || changedProps.status != "complete") {
    //            return;
    //        }

    //        // Passing the above test means this is the event we were waiting for.
    //        // There is nothing we need to do for future onUpdated events, so we
    //        // use removeListner to stop getting called when onUpdated events fire.
    //        chrome.tabs.onUpdated.removeListener(listener);

    //        // Look through all views to find the window which will display
    //        // the screenshot.  The url of the tab which will display the
    //        // screenshot includes a query parameter with a unique id, which
    //        // ensures that exactly one view will have the matching URL.

    //        // Get views(tabs?)
    //        // p
    //        var views = chrome.extension.getViews();
    //        for (var i = 0; i < views.length; i++) {
    //            var view = views[i];
    //            if (view.location.href == viewTabUrl) {
    //                view.setScreenshotUrl(screenshotUrl);
    //                break;
    //            }

    //        }
    //    });

    //    chrome.tabs.create({ url: viewTabUrl }, function (tab) {
    //        targetId = tab.id;
    //    });
    //});
});