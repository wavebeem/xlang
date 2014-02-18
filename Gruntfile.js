module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                // True means more warnings section
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                immed: true,
                indent: 4,
                latedef: true,
                plusplus: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                trailing: true,
                maxparams: 4,
                maxdepth: 5,
                maxstatements: 20,
                maxcomplexity: 6,
                maxlen: 80,

                // True means less warnings section
                expr: true,
                lastsemic: true,
                laxbreak: true,
                shadow: true,

                // This section opts-in to certain groups of globals
                node: true
            },
            files: ['Gruntfile.js', 'src/**/*.js']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            default: {
                files: ['grammar/*', 'src/**/*.js', 'test/**/*.js'],
                tasks: ['clear', 'default'],
                options: {
                    spawn: true
                }
            }
        },
        jison: {
            options: {
                grammar: 'grammar/grammar.y',
                lexer: 'grammar/lexer.l',
                output: 'build/parser.js'
            }
        }
    });

    grunt.loadTasks('tasks');

    [
        'grunt-mocha-test',
        'grunt-contrib-watch',
        'grunt-contrib-jshint',
    ].forEach(grunt.loadNpmTasks);


    grunt.registerTask('default', ['jshint', 'jison', 'mochaTest']);
};
