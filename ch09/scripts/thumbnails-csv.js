window.onload = initPage;

function initPage() {
    // find the thumbnails on the page
    thumbs = document.getElementById("thumbnailPane").getElementsByTagName("img");

    // set the handler for each image
    for (var i = 0; i < thumbs.length; i++) {
        image = thumbs[i];

        // create the onclick function
        image.onclick = function() {
            // find the image name
            detailURL = 'images/' + this.title + '-detail.jpg';
            document.getElementById("itemDetail").src = detailURL;
            getDetails(this.title);
        }
    }
}

function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }
    return request;
}

function getDetails(itemName) {
    request = createRequest();
    if (request == null) {
        alert("Unable to create request");
        return;
    }
    var url = "getDetailsCSV.php?ImageID=" + escape(itemName);
    request.open("GET", url, true);
    request.onreadystatechange = displayDetails;
    request.send(null);
}

function displayDetails() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            detailDiv = document.getElementById("description");
            //detailDiv.innerHTML = request.responseText;

            // Remover os detalhes do item existente (se houver)
            for (var i = detailDiv.childNodes.length; i > 0; i--) {
                detailDiv.removeChild(detailDiv.childNodes[i - 1]);
            }

            // for (var i = 0; i < detailDiv.childNodes.length; i++) {
            //     detailDiv.removeChild(detailDiv.childNodes[i]);
            // }

            // Adicionar novos detalhes do item
            var response = request.responseText;
            var itemDetails = response.split(',');

            var descriptionP = document.createElement('p');
            descriptionP.appendChild(
                document.createTextNode("Descrição: " + itemDetails[1])
            );
            detailDiv.appendChild(descriptionP);
            var priceP = document.createElement('p');
            priceP.appendChild(
                document.createTextNode('Preço: $' + itemDetails[2])
            );
            detailDiv.appendChild(priceP);
            var list = document.createElement("ul");
            for (var i = 3; i < itemDetails.length; i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute("href", itemDetails[i]);
                a.appendChild(document.createTextNode(itemDetails[i]));
                li.appendChild(a);
                list.appendChild(li);
            }
            detailDiv.appendChild(list);
        }
    }
}