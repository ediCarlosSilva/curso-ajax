function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActionXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActionXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }

    return request;
}