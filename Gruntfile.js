module.exports = function (grunt) {
  var config = grunt.file.readJSON('config.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      cmd: ['test/cmd/index.html']
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
        tasks: ['_dev']
      },
      tests: {
        files: 'test/**/**',
        tasks: ['_dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks("grunt-jscoverage");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('_dev', ['test', 'webapp']);
  grunt.registerTask('webapp', ['clean', 'copy']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('cov', ['jscoverage']);
};
