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
    var url = "getDetailsXML-updated.php?ImageID=" + escape(itemName);
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

            // adicionar novos detalhes do item
            var responseDoc = request.responseXML;
            var categories = responseDoc.getElementsByTagName('category');
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                var nameElement = category.getElementsByTagName('name')[0];
                var categoryName = nameElement.firstChild.nodeValue;
                var categoryType = category.getAttribute('type');
                if ((categoryType == null) || (categoryType != 'list')) {
                    var valueElement = category.getElementsByTagName('value')[0]
                    var categoryValue = valueElement.firstChild.nodeValue;
                    var p = document.createElement('p');
                    var text = document.createTextNode(
                        categoryName + ": " + categoryValue
                    );
                    p.appendChild(text);
                    detailDiv.appendChild(p);
                } else {
                    var p = document.createElement('p');
                    p.appendChild(document.createTextNode(categoryName));
                    var list = document.createElement('ul');
                    var values = category.getElementsByTagName('value');
                    for (var j = 0; j < values.length; j++) {
                        var li = document.createElement('li');

                        // solução com link

                        if (p.firstChild.nodeValue != 'URLs') {
                            var pWorn = document.createElement('p');
                            pWorn.appendChild(document.createTextNode(values[j].firstChild.nodeValue));
                            li.appendChild(pWorn);
                        } else {
                            var a = document.createElement('a');
                            a.setAttribute('href', values[j].firstChild.nodeValue);
                            a.appendChild(document.createTextNode(values[j].firstChild.nodeValue));
                            li.appendChild(a);
                        }
                        list.appendChild(li);

                        // li.appendChild(
                        //     document.createTextNode(values[j].firstChild.nodeValue)
                        // );
                        // list.appendChild(li);
                    }
                    detailDiv.appendChild(p);
                    detailDiv.appendChild(list);
                }

            }
        }
    }
}