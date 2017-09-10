window.onload = initPage;

function initPage() {
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("register").disabled = true;
    //alert("Dentro da função initPage")
}

function checkUsername() {
    // obter um objeto de solicitação e enviar ao servidor
    document.getElementById("username").className = "thinking";
    request = createRequest();
    if (request == null) {
        alert("Unable to create request");
    } else {
        //alert("Consegui o objeto de solicitação");
        var theName = document.getElementById("username").value;
        //alert("Valor do nome original: " + theName);
        var username = escape(theName);
        //alert("valor do nome com escape: " + username);
        var url = "checkName.php?username=" + username;
        //alert("URL: " + url);

        request.onreadystatechange = showUsernameStatus;
        request.open("GET", url, true);
        request.send(null);
    }
}

function showUsernameStatus() {
    //alert("showUsernameStatus foi chamada." + "readyState: " + request.readyState + " status: " + request.status);

    if (request.readyState == 4) {

        if (request.status == 200) {

            if (request.responseText == "okay") {
                // se tudo estiver bem, nenhum mensagem de erro será mostrada
                document.getElementById("username").className = "approved";
                document.getElementById("register").disabled = false;
            } else {
                // se houve um problema, informamos ao usuario.
                //alert("Desculpe, esse nome de usuário já é adotado.");
                document.getElementById("username").className = "denied";
                document.getElementById("username").focus();
                //document.getElementById("username").select();
                document.getElementById("register").disabled = true;
            }
        }
    }
}