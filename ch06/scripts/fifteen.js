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
    //alert("essa celula foi clicada. " + this.id);
    if (cellIsEmpty(this)) {
        alert("clique em um bloco numerado.");
        return;
    }

    var currentRow = this.id.charAt(4);
    var currentCol = this.id.charAt(5);

    // Verifica acima
    if (currentRow > 1) {
        var testRow = Number(currentRow) - 1;
        var testCellId = "cell" + testRow + currentCol;
        var testCell = document.getElementById(testCellId);
        if (cellIsEmpty(testCell)) {
            swapTiles(this, testCell);
            return;
        }
    }

    // verifica abaixo
    if (currentRow < 4) {
        var testRow = Number(currentRow) + 1;
        var testCellId = "cell" + testRow + currentCol;
        var testCell = document.getElementById(testCellId);
        if (cellIsEmpty(testCell)) {
            swapTiles(this, testCell);
            return;
        }
    }

    // verificar á esquerda
    if (currentCol > 1) {
        var testCol = Number(currentCol) - 1;
        var testCellId = "cell" + currentRow + testCol;
        var testCell = document.getElementById(testCellId);
        if (cellIsEmpty(testCell)) {
            swapTiles(this, testCell);
            return;
        }
    }

    // Verificar á direita
    if (currentCol < 4) {
        var testCol = Number(currentCol) + 1;
        var testCellId = "cell" + currentRow + testCol;
        var testCell = document.getElementById(testCellId);
        if (cellIsEmpty(testCell)) {
            swapTiles(this, testCell);
            return;
        }
    }

    // A célula clicada está bloqueada
    alert("Clique em um bloco próximo de uma célula vazia.");
}

function cellIsEmpty(cell) {
    var image = cell.firstChild;
    while (image.nodeName == "#text") {
        image = image.nextSibling;
    }
    if (image.alt == "empty")
        return true;
    else
        return false;
}

function swapTiles(selectedCell, destinationCell) {
    selectedImage = selectedCell.firstChild;
    while (selectedImage.nodeName == "#text") {
        selectedImage = selectedImage.nextSibling;
    }

    destinationImage = destinationCell.firstChild;
    while (destinationImage.nodeName == "#text") {
        destinationImage = destinationImage.nextSibling;
    }

    selectedCell.appendChild(destinationImage);
    destinationCell.appendChild(selectedImage);
}