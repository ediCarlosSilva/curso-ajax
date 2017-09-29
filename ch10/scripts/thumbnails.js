window.onload = initPage;

function initPage() {
    // find the thumbnails on the page
    var thumbs =
        document.getElementById("thumbnailPane").getElementsByTagName("img");

    // set the handler for each image
    for (var i = 0; i < thumbs.length; i++) {
        var image = thumbs[i];

        // create the onclick function
        image.onclick = function() {
            // find the image name
            var detailURL = 'images/' + this.title + '-detail.jpg';
            document.getElementById("itemDetail").src = detailURL;
            getDetails(this.title);
        }
    }
}

function getDetails(itemName) {
    request = createRequest();
    if (request == null) {
        alert("Unable to create request");
        return;
    }
    // Version for XML server-side script
    var url = "getDetailsJSON.php?ImageID=" + escape(itemName);
    request.open("GET", url, true);
    request.onreadystatechange = displayDetails;
    request.send(null);
}

function displayDetails() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var detailDiv = document.getElementById("description");

            // Remove existing item details (if any)
            for (var i = detailDiv.childNodes.length; i > 0; i--) {
                detailDiv.removeChild(detailDiv.childNodes[i - 1]);
            }

            var jsonData = request.responseText;
            alert(jsonData);

        }
    }
}