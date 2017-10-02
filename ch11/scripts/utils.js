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

function addEventHandler(obj, eventName, handler) {
    if (document.attachEvent) {
        obj.attachEvent("on" + eventName, handler);
    } else if (document.addEventListener) {
        obj.addEventListener(eventName, handler, false);
    }
}

function getActivatedObject(e) {

    var obj;

    if (!e) {
        // a primeira versão do IE
        obj = window.event.srcElement;
    } else if (e.srcElement) {
        // IE 7 ou posterior
        obj = e.srcElement;
    } else {
        // navegador DOM nível 2
        obj = e.target;
    }

    return obj;

}