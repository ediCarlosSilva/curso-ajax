window.onload = initPage;

function initPage() {
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("password2").onblur = checkPassword;
    document.getElementById("register").disabled = true;
}

function checkPassword() {
    var password1 = document.getElementById("password1");
    var password2 = document.getElementById("password2");
    password1.className = "thinking";

    // primeiro comparando as senhas
    if ((password1.value == "") || (password1.value != password2.value)) {
        password1.className = "denied";
        return;
    }

    // as senhas coincidem, enviar a solicitação para o servidor
    passwordRequest = createRequest();
    if (passwordRequest == null) {
        alert("Incapaz de criar a solicitação");
    } else {
        var password = escape(password1.value);
        var url = "checkPass.php?password=" + password;
        passwordRequest.onreadystatechange = showPasswordStatus;
        passwordRequest.open("GET", url, true);
        passwordRequest.send(null);
    }
}

function showPasswordStatus() {
    if (passwordRequest.readyState == 4) {
        if (passwordRequest.status == 200) {
            var password1 = document.getElementById("password1");
            if (passwordRequest.responseText == "okay") {
                password1.className = "approved";
                document.getElementById("register").disabled = false;
            } else {
                password1.className = "denied";
                password1.focus();
                password1.select();
                document.getElementById("register").disabled = true;
            }
        }
    }
}

function checkUsername() {
    document.getElementById("username").className = "thinking";
    usernameRequest = createRequest();
    if (usernameRequest == null)
        alert("Unable to create usernameRequest");
    else {
        var theName = document.getElementById("username").value;
        var username = escape(theName);
        var url = "checkName.php?username=" + username;
        usernameRequest.onreadystatechange = showUsernameStatus;
        usernameRequest.open("GET", url, true);
        usernameRequest.send(null);
    }
}

function showUsernameStatus() {
    if (usernameRequest.readyState == 4) {
        if (usernameRequest.status == 200) {
            if (usernameRequest.responseText == "okay") {
                document.getElementById("username").className = "approved";
                document.getElementById("register").disabled = false;
            } else {
                document.getElementById("username").className = "denied";
                document.getElementById("username").focus();
                document.getElementById("username").select();
                document.getElementById("register").disabled = true;
            }
        }
    }
}