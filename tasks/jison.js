module.exports = function(grunt) {
    var jison = require('jison');

    grunt.registerTask('jison', 'Generates a parser using Jison', function() {
        var options = this.options();

        var grammar = grunt.file.read(options.grammar);
        var lexer   = grunt.file.read(options.lexer);

        var input = lexer + "\n\n" + grammar;

        var generator = new jison.Parser(input);
        var source    = generator.generate();

        grunt.file.write(options.output, source);
    });
};
