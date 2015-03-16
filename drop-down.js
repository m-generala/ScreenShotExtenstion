(function () {
    var buttonPartial = document.getElementById('partial');
    var buttonFullScreen = document.getElementById('full-screen');

    buttonPartial.addEventListener('click', function () {
        loadLibs();
        chrome.tabs.executeScript(null, {
            file: "scripts/screenShotPartial.js"
        }, function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.extension.lastError) {
                alert(chrome.extension.lastError.message);
                message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
    }, false);

    buttonFullScreen.addEventListener('click', function () {
        loadLibs();
        chrome.tabs.executeScript(null, {
            file: "scripts/screenShotFull.js"
        }, function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.extension.lastError) {
                alert(chrome.extension.lastError.message);
                message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
    }, false);

    function loadLibs() {
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
    }
})();