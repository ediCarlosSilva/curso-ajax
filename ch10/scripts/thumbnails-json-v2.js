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

            // var jsonData = request.responseText;
            // var itemDetails = eval('(' + request.responseText + ')');
            var itemDetails = JSON.parse(request.responseText);
            //console.log(itemDetails);

            // Remove existing item details (if any)
            for (var i = detailDiv.childNodes.length; i > 0; i--) {
                detailDiv.removeChild(detailDiv.childNodes[i - 1]);
            }

            // adicionar novos detalhes do item
            for (var property in itemDetails) {
                var propertyValue = itemDetails[property];
                if (!isArray(propertyValue)) {
                    var p = document.createElement('p');
                    p.appendChild(
                        document.createTextNode(property + ': ' + propertyValue)
                    );
                    detailDiv.appendChild(p);
                } else {
                    var p = document.createElement('p');
                    p.appendChild(
                        document.createTextNode(property + ":")
                    );
                    var list = document.createElement('ul');
                    for (var i = 0; i < propertyValue.length; i++) {
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.setAttribute('href', propertyValue[i]);
                        a.appendChild(
                            document.createTextNode(propertyValue[i])
                        );
                        li.appendChild(a);
                        list.appendChild(li);
                    }
                    detailDiv.appendChild(p);
                    detailDiv.appendChild(list);
                }
            }
        }
    }
}