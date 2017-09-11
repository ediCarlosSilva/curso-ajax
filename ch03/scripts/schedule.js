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

    var images = document.getElementById("schedulePane").getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) {
        var currentImage = images[i];

        currentImage.onmouseover = showHint;

        currentImage.onmouseout = hideHint;

        currentImage.onclick = showTab;

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

    var tabs = document.getElementById("tabs").getElementsByTagName("a");
    for (var i = 0; i < tabs.length; i++) {
        var currentTab = tabs[i];
        if (currentTab.title == selectedTab) {
            currentTab.className = 'active';
        } else {
            currentTab.className = 'inactive';
        }
    }
}