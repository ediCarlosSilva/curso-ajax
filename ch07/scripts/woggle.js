window.onload = initPage;

var frequencyTable = new Array(
    "a", "a", "a", "a", "a", "a", "a", "a", "b", "c", "c", "c", "d", "d", "d",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g",
    "g", "h", "h", "h", "h", "h", "h", "i", "i", "i", "i", "i", "i", "i", "j",
    "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o",
    "o", "o", "o", "o", "o", "o", "p", "p", "q", "q", "q", "q", "q", "q", "r",
    "r", "r", "r", "r", "r", "s", "s", "s", "s", "s", "s", "s", "s", "t", "t",
    "t", "u", "u", "v", "v", "w", "x", "y", "z");

function initPage() {
    randomizeTiles();
}

function randomizeTiles() {
    var tiles = document.getElementById("letterbox").getElementsByTagName("a");

    for (var i = 0; i < tiles.length; i++) {

        var index = Math.floor(Math.random() * 100);

        var letter = frequencyTable[index];

        tiles[i].className = tiles[i].className + ' l' + letter;

        tiles[i].onclick = addLetter;
    }
}

function addLetter() {
    // Descobrir qual letra foi clicada
    // Adicionar uma letra à caixa da palavra atual
    // Desativar a letra clicada
    var tileClasses = this.className.split(' ');
    var letterClass = tileClasses[2];
    var tileLetter = letterClass.substring(1, 2);
    // alert(tileLetter);

    var currentWordDiv = document.getElementById("currentWord");

    if (currentWordDiv.childNodes.length == 0) {

        var p = document.createElement("p");
        currentWordDiv.appendChild(p);
        var letterText = document.createTextNode(tileLetter);
        p.appendChild(letterText);

    } else {
        var p = currentWordDiv.firstChild;
        var letterText = p.firstChild;
        letterText.nodeValue += tileLetter;
    }

    this.className += " disabled";
}