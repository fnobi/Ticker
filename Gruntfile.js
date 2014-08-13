module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        release: {
            options: {
                file: 'bower.json',
                npm: false
            }
        },
        mocha_html : {
            all: {
                src   : [
                    'bower_components/event-trigger/src/js/EventTrigger.js',
                    'Ticker.js'
                ],
                test  : [ 'test/*-test.js' ],
                assert : 'chai'
            }
        },
        mocha_phantomjs : {
            all: [ 'test/*.html' ]
        }
    });


    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-mocha-html');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.registerTask('default', ['release:patch']);
    grunt.registerTask('test', ['mocha_html', 'mocha_phantomjs']);
};
