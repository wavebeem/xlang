function readOnly(observable) {
    return ko.computed(function() {
        return observable();
    });
}

(function(GLOBAL) {
    var theCode = document.getElementById("the-code");
    var code = [
        "twice (count. up.).",
        "left.",
        "twice (count. down.).",
        "left. count.",
        "twice (left.).",
        "up.",
        "right.",
        "right.",
        "twice (",
        "   down.",
        "   right.",
        "   down.",
        "   right.",
        "   count.",
        "   twice (",
        "       twice (",
        "           twice (",
        "               count.",
        "           ).",
        "       ).",
        "   ).",
        ")."
    ].join("\n");

    var editor = ace.edit(theCode);
    // List of themes: https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
    editor.setTheme("ace/theme/github");
    editor.session.setValue(code);
    if (localStorage.vim) {
        editor.setKeyboardHandler("ace/keyboard/vim");
    }
    editor.session.setTabSize(4);
    editor.session.setUseSoftTabs(true);

    GLOBAL.editor = editor;
})(this);
