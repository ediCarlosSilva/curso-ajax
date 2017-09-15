window.onload = initPage;

function initPage() {
    var table = document.getElementById("puzzleGrid");
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = tileClick;
    }
}

function tileClick() {
    alert("essa celula foi clicada. " + this.id);
}