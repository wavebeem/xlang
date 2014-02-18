(function(GLOBAL) {
    var editor = ace.edit("the-code");
    var session = editor.getSession();

    // List of themes: https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
    editor.setTheme("ace/theme/github");
    editor.setKeyboardHandler("ace/keyboard/vim");
    session.setTabSize(4);
    session.setUseSoftTabs(true);

    editor.setValue("");
    editor.insert([
        "twice (",
        "    twice (",
        "        count.",
        "        count.",
        "    ).",
        "    count.",
        ").",
        "twice (",
        "    count.",
        ").",
    ].join("\n"));

    GLOBAL.editor = editor;
})(this);
