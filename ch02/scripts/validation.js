window.onload = initPage;

function initPage() {
    document.getElementById("username").onblur = checkUsername;
    alert("Dentro da função initPage")
}

function checkUsername() {
    // obter um objeto de solicitação e enviar ao servidor
    alert("inside checkusername()");
}

function showUsernameStatus() {

}