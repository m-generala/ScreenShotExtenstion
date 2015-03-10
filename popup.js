var alreadyRun = false;
function placePicture(dataUrl, width, height) {
    if (!alreadyRun) {
        var picture = $('<img/>');
        picture.attr('src', dataUrl);
		picture.attr('id', 'ext-img');
        $(document.body).append(picture);
		var body = $(document.body),
		input = $('<input/>');

		input.attr('id', 'img-text');

		var buttonText = $('<button/>');
		buttonText.attr('id', 'btn-text');
		buttonText.html('Add text');
		body.append($('<br/>'));
		body.append(input);
		body.append(buttonText);
        alreadyRun = true;
		buttonText.click(function () {
			var canvas = document.createElement('canvas'),
				img = document.getElementById('ext-img');
				
			var context = canvas.getContext('2d');
			var imgWidth = img.width;
			var imgHeight = img.height;
			var text = input.val();
			$(img).ready(function() {
				canvas.width = img.width;
				canvas.height = img.height;
				context.drawImage(img, 0, 0);
				context.font = "40pt Calibri";
				// where to place the text
				context.fillText(text, 50, 50);
				img.src = canvas.toDataURL()
			});
		});
		/*
		var client = new Dropbox.Client({ key: 'mkjr3ly95e2zx8i' });

        function doHelloWorld() {
            client.writeFile('hello.txt', 'Hello, World!', function (error) {
                if (error) {
                    alert('Error: ' + error);
                } else {
                    alert('File written successfully!');
                }
            });
        }
		*/
    }
}