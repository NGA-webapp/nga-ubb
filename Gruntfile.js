module.exports = function (grunt) {
  var config = grunt.file.readJSON('config.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/index.html']
    },
    jscoverage: {
      options: {
        inputDirectory: 'libs',
        outputDirectory: 'libs-cov'
      }
    },
    clean: {
      webapp: {
        src: [config.path.webapp + '**/**'],
        options: {
          force: true
        }
      }
    },
    copy: {
      webapp: {
        files: [
          {extend: true, src: ['index.js', 'libs/**'], dest: config.path.webapp}
        ]
      }
    },
    watch: {
      libs: {
        files: 'libs/**/**',
        tasks: ['test']
      },
      tests: {
        files: 'test/**/**',
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks("grunt-jscoverage");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('webapp', ['clean', 'copy']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('cov', ['jscoverage']);
};
