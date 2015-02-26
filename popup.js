var alreadyRun = false;
// it's called when document is loaded
// no need for ready()
function placePicture(dataUrl, width, height) {
    if (!alreadyRun) {
        var $picture = $('<img/>');
        $picture.attr('src', dataUrl);
		$picture.attr('id', 'ext-img');
        $(document.body).append($picture);
		var $body = $(document.body),
		$input = $('<input/>');

		$input.attr('id', 'img-text');

		var $buttonText = $('<button/>');
		$buttonText.attr('id', 'btn-text');
		$buttonText.html('Add text');
		$body.append($('<br/>'));
		$body.append($input);
		$body.append($buttonText);
        alreadyRun = true;
		$buttonText.click(function () {
			var canvas = document.createElement('canvas'),
				img = document.getElementById('ext-img');
				
			var ctx = canvas.getContext('2d');
			var imgWidth = img.width;
			var imgHeight = img.height;
			var text = $input.val();
			$(img).ready(function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				ctx.font = "40pt Calibri";
				// where to place the text
				ctx.fillText(text, 50, 50);
				img.src = canvas.toDataURL()
			});
		});
		
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

        // Try to complete OAuth flow.
        //client.authenticate(null , function (error, client) {
        //    if (error) {
        //        alert('Error: ' + error);
        //    }
        //});

        //if (client.isAuthenticated()) {
        //    doHelloWorld();
        //}
        //
        //document.getElementById('write-button').onclick = function () {
        //    client.authenticate(function (error, client) {
        //        if (error) {
        //            alert('Error: ' + error);
        //        } else {
        //            doHelloWorld();
        //        }
        //    });
        //}
    }
}