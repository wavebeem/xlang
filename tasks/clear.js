module.exports = function(grunt) {
    grunt.registerTask('clear', function() {
        grunt.log.write('\033[H\033[J');
    });
};
