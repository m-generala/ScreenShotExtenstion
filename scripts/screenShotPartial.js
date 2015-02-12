var mouseStartPosition = {};

document.onmousedown = function (e) {
    mouseStartPosition.x = (e.clientX || e.pageX) + 'px';
    mouseStartPosition.y = (e.clientY || e.pageY) + 'px';
}

function createDiv(position) {
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = position.left; //'100px';
    div.style.top = position.top;//'101px';
    div.style.width = position.width; //'1px';
    div.style.height = position.height; //'299px';
    div.style.clip = 'rect(0, ' + position.width + ', ' + position.height + ', 0)';
    div.style.backgroundColor = '#000000';
    div.style.overflow = 'hidden';
    div.style.zIndex = 10;

    return div;
}

document.onmousemove = function (e) {
}

document.onmouseup = function (e) {
    var mouseEndPosition = {
        x: e.clientX || e.pageX,
        y: e.clientY || e.pageY,
    },
        width = Math.abs(mouseEndPosition.x - parseInt(mouseStartPosition.x.replace('px', ''))) + 'px',
        height = Math.abs(mouseEndPosition.y - parseInt(mouseStartPosition.y.replace('px', ''))) + 'px';

    mouseEndPosition.x += 'px';
    mouseEndPosition.y += 'px';

    console.log(width);
    // left div
    var div = createDiv({
        left: mouseStartPosition.x,
        top: mouseStartPosition.y,
        width: '1px',
        height: height
    });
    // top div
    document.body.appendChild(div);
    div = createDiv({
        left: mouseStartPosition.x,
        top: mouseStartPosition.y,
        width: width,
        height: '1px'
    });
    // bottom div
    document.body.appendChild(div);
    div = createDiv({
        left: mouseStartPosition.x,
        top: mouseEndPosition.y,
        width: width,
        height: '1px'
    });
    document.body.appendChild(div);
    // right div
    div = createDiv({
        left: mouseEndPosition.x,
        top: mouseStartPosition.y,
        width: '1px',
        height: height
    });
    document.body.appendChild(div);

    html2canvas(document.body, {
        onrendered: function (canvas) {
            var canvasToClip = document.createElement('canvas'),
                clippingContext = canvasToClip.getContext('2d');

            intWidth = width.replace('px', '');
            intHeight = height.replace('px', '');
            canvasToClip.width = canvas.width;
            canvasToClip.height = canvas.height;

            clippingContext.drawImage(canvas,
                parseInt(mouseStartPosition.x.replace('px', '')),
                parseInt(mouseStartPosition.y.replace('px', '')),
                intWidth,
                intHeight,
                parseInt(mouseStartPosition.x.replace('px', '')),
                parseInt(mouseStartPosition.y.replace('px', '')),
                intWidth,
                intHeight);

            clippingContext.save();

            chrome.extension.sendMessage({
                action: "getScrenShot",
                img: canvasToClip.toDataURL(),
            });
        }
    });
    document.onmouseup = {};
    document.onmousedown = {};
}