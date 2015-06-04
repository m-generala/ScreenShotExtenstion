(function() {
	var mouseStartPosition = {},
		moveStarted = false;
	document.onmousedown = function (e) {
		moveStarted = !moveStarted;
		mouseStartPosition.x = (e.clientX || e.pageX) + 'px';
		mouseStartPosition.y = (e.pageY || e.clientY) + 'px';
	}

	function createDiv(position, id) {
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
		div.setAttribute("id", id)

		return div;
	}

	document.onmousemove = function (e) {
		if(moveStarted) {
			var mouseEndPosition = {
				x: e.clientX || e.pageX,
				y: e.pageY || e.clientY,
			},
				width = Math.abs(mouseEndPosition.x - parseInt(mouseStartPosition.x.replace('px', ''))) + 'px',
				height = Math.abs(mouseEndPosition.y - parseInt(mouseStartPosition.y.replace('px', ''))) + 'px';

			mouseEndPosition.x += 'px';
			mouseEndPosition.y += 'px';
			
			try{
				var left = document.getElementById('left');
				document.body.removeChild(left);
				var top = document.getElementById('top');
				document.body.removeChild(top);
				var bottom = document.getElementById('bottom');
				document.body.removeChild(bottom);
				var right = document.getElementById('right');
				document.body.removeChild(right);
			} catch (TypeError) {
			}
			// left div
			var div = createDiv({
				left: mouseStartPosition.x,
				top: mouseStartPosition.y,
				width: '1px',
				height: height
			}, 'left');
			// top div
			document.body.appendChild(div);
			div = createDiv({
				left: mouseStartPosition.x,
				top: mouseStartPosition.y,
				width: width,
				height: '1px'
			}, 'top');
			// bottom div
			document.body.appendChild(div);
			div = createDiv({
				left: mouseStartPosition.x,
				top: mouseEndPosition.y,
				width: width,
				height: '1px'
			}, 'bottom');
			document.body.appendChild(div);
			// right div
			div = createDiv({
				left: mouseEndPosition.x,
				top: mouseStartPosition.y,
				width: '1px',
				height: height
			}, 'right');
			document.body.appendChild(div);
		}
	}

	document.onmouseup = function (e) {
		var mouseEndPosition = {
			x: e.clientX || e.pageX,
			y: e.pageY || e.clientY,
		},
			width = Math.abs(mouseEndPosition.x - parseInt(mouseStartPosition.x.replace('px', ''))) + 'px',
			height = Math.abs(mouseEndPosition.y - parseInt(mouseStartPosition.y.replace('px', ''))) + 'px';
        
		mouseEndPosition.x += 'px';
		mouseEndPosition.y += 'px';
		html2canvas(document.body, {
			onrendered: function (canvas) {
				var canvasToClip = document.createElement('canvas'),
					clippingContext = canvasToClip.getContext('2d');

				intWidth = width.replace('px', '');
				intHeight = height.replace('px', '');
				canvasToClip.width = intWidth;
				canvasToClip.height = intHeight;

				clippingContext.drawImage(canvas,
					parseInt(mouseStartPosition.x.replace('px', '')),
					parseInt(mouseStartPosition.y.replace('px', '')),
					intWidth,
					intHeight,
					0,
					0,
					intWidth,
					intHeight);

				clippingContext.save();
				console.log(canvasToClip.width, canvasToClip.height);
				chrome.extension.sendMessage({
					action: "getScrenShot",
					img: canvasToClip.toDataURL(),
					width: intWidth,
					height: intHeight,
				});
			}
		});
		document.onmouseup = {};
		document.onmousemove = {};
		document.onmousedown = {};
		moveStarted = !moveStarted;
	}
})();