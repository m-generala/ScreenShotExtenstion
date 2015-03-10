html2canvas(document.body , {
    onrendered: function (canvas) {
        chrome.extension.sendMessage({
            action: "getScrenShot",
            img: canvas.toDataURL(),
        });
    }
});


