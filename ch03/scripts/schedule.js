window.onload = initPage;
var welcomePaneShowing = true;

function initPage() {
    var tabs =
        document.getElementById("tabs").getElementsByTagName("a");
    for (var i = 0; i < tabs.length; i++) {
        var currentTab = tabs[i];
        currentTab.onmouseover = showHint;
        currentTab.onmouseout = hideHint;
        currentTab.onclick = showTab;
    }

    var buttons = document.getElementById("navigation").getElementsByTagName("a");

    for (var i = 0; i < buttons.length; i++) {
        var currentBtn = buttons[i];

        currentBtn.onmouseover = showHint;

        currentBtn.onmouseout = hideHint;

        currentBtn.onclick = showTab;

        currentBtn.onmouseover = buttonOver;
        currentBtn.onmouseout = buttonOut;

    }
}

function showHint() {
    //alert("em showHint() " + this.title);
    if (!welcomePaneShowing) {
        return;
    }
    switch (this.title) {
        case "beginners":
            var hintText = "Acabou de começar? junte-se a nós!";
            break;
        case "intermediate":
            var hintText = "Leve sua flexibilidade ao próximo nível!";
            break;
        case "advanced":
            var hintText = "Una perfeição corpo e mente com estes exercícios intensívos";
            break;
        default:
            var hintText = "Clique em uma guia para exibir o programa do curso para a aula.";
    }

    var contentPane = document.getElementById("content");
    contentPane.innerHTML = "<h3>" + hintText + "</h3>";
}

function hideHint() {
    //alert("em HideHint()");
    if (welcomePaneShowing) {
        var contentPane = document.getElementById("content");
        contentPane.innerHTML =
            "<h3>Clique em uma guia para exibir o programa do curso para a aula.</h3>";
    }
}

function showTab() {
    //alert("em showTab()");
    var selectedTab = this.title;

    if (selectedTab == "welcome") {
        welcomePaneShowing = true;
        document.getElementById("content").innerHTML =
        "<h3>Clique em uma guia para exibir o programa do curso para a aula</h3>";
    } else {
        welcomePaneShowing = false;
    }

    var tabs = document.getElementById("tabs").getElementsByTagName("a");
    for (var i = 0; i < tabs.length; i++) {
        var currentTab = tabs[i];
        if (currentTab.title == selectedTab) {
            currentTab.className = 'active';
        } else {
            currentTab.className = 'inactive';
        }
    }

    var request = createRequest();
    if (request == null) {
        alert("unable to create request");
        return;
    }
    request.onreadystatechange = showSchedule;
    request.open("GET", selectedTab + ".html", true);
    request.send(null);
}

function showSchedule() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            document.getElementById("content").innerHTML =
                request.responseText;
        }
    }
}

function buttonOver() {
    this.className = "active";
}

function buttonOut() {
    this.className = "";
}