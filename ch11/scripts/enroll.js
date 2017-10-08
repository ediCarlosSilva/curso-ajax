window.onload = initPage;

var warnings = {
    'firstname': {
        'required': 'digite seu primeiro nome.',
        'letters': 'Apenas letras são permitidas em um primeiro nome.'
    },
    'lastname': {
        'required': 'digite seu último nome.',
        'letters': 'Apenas letras são permitidas em um último nome.'
    },
    'email': {
        'required': 'digite seu endereç de e-mail.',
        'format': 'Digite seu e-mail na forma "nome@dominio.com".'
    }
}

function initPage() {
    addEventHandler(document.getElementById('firstname'), 'blur', fieldIsFilled);
    addEventHandler(document.getElementById('firstname'), 'blur', fieldIsLetters);
    addEventHandler(document.getElementById('lastname'), 'blur', fieldIsFilled);
    addEventHandler(document.getElementById('lastname'), 'blur', fieldIsLetters);
    addEventHandler(document.getElementById('email'), 'blur', fieldIsFilled);
    addEventHandler(document.getElementById('email'), 'blur', emailIsProper);
}

function fieldIsFilled(e) {
    var me = getActivatedObject(e);
    if (me.value == '') {
        // exibir mensagem de erro
        warn(me, 'required');
    } else {
        // prosseguir com o código;
        unwarn(me, 'required');
    }
}

function emailIsProper(e) {
    var me = getActivatedObject(e);
    if (!/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(me.value)) {
        // exibir mensagem de erro
        warn(me, "format");
    } else {
        // prosseguir com o código;
        unwarn(me, 'format');
    }
}

function fieldIsLetters(e) {
    var me = getActivatedObject(e);
    var nonAlphaChars = /[^a-zA-Z]/;
    if (nonAlphaChars.test(me.value)) {
        // exibir mensagem de erro
        warn(me, "letters");
    } else {
        // prosseguir com o código;
        unwarn(me, 'letters');
    }
}

function fieldIsNumbers(e) {
    var me = getActivatedObject(e);
    var nonNumericChars = /[^0-9]/;
    if (nonNumericChars.test(me.value)) {
        // exibir mensagem de erro
        warn(me, "numbers");
    } else {
        // prosseguir com o código;
        unwarn(me, 'numbers');
    }
}

function warn(field, warningType) {
    var parentNode = field.parentNode;
    var warning = eval('warnings.' + field.id + '.' + warningType);
    if (parentNode.getElementsByTagName('p').length == 0) {
        var p = document.createElement('p');
        field.parentNode.appendChild(p);
        var warningNode = document.createTextNode(warning);
        p.appendChild(warningNode);
    } else {
        var p = parentNode.getElementsByTagName('p')[0];
        p.childNodes[0].nodeValue = warning;
    }
    document.getElementById('enroll').disabled = true;
}

function unwarn(field, warningType) {
    if (field.parentNode.getElementsByTagName('p').length > 0) {
        var p = field.parentNode.getElementsByTagName('p')[0];
        var currentWarning = p.childNodes[0].nodeValue;
        var warning = eval('warnings.' + field.id + '.' + warningType);
        if (currentWarning == warning) {
            field.parentNode.removeChild(p);
        }
    }

    var fieldsets = document.getElementById('content').getElementsByTagName('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
        var fieldWarnings = fieldsets[i].getElementsByTagName('p').length;
        if (fieldWarnings > 0) {
            document.getElementById('enroll').disabled = true;
            return;
        }
    }
    document.getElementById('enroll').disabled = false;
}