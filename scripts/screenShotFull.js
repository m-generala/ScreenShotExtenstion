html2canvas(document.body, {
    onrendered: function (canvas) {
        var img = document.createElement('img');
        img.src = canvas.toDataURL();
        document.body.appendChild(img);

        chrome.extension.sendMessage({
            action: "getScrenShot",
            img: canvas.toDataURL(),
        });
    }
});
