(function(GLOBAL) {
    var editor = ace.edit("the-code");
    var session = editor.getSession();

    // List of themes: https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
    editor.setTheme("ace/theme/eclipse");
    editor.setKeyboardHandler("ace/keyboard/vim");
    session.setTabSize(4);
    session.setUseSoftTabs(true);

    GLOBAL.editor = editor;
})(this);
