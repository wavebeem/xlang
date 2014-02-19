(function(GLOBAL) {
    var editor = ace.edit("the-code");
    var session = editor.getSession();

    // List of themes: https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
    editor.setTheme("ace/theme/github");
    // editor.setKeyboardHandler("ace/keyboard/vim");
    session.setTabSize(4);
    session.setUseSoftTabs(true);

    editor.setValue("");
    editor.insert("twice (count. up.).\nleft.\ntwice (count. down.).\nleft. count.\ntwice (left.).\nup.\nright.\nright.\ntwice (count. twice (count.).).");
    // editor.insert("twice (up.). up.");

    GLOBAL.editor = editor;
})(this);
