module.exports = function (grunt) {
  var config = grunt.file.readJSON('config.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      cmd: ['test/cmd/index.html']
    },
    mochacli: {
      node: ['test/node/app.js']
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
      },
      test: {
        src: ['test/cmd/app/case', 'test/node/case'],
        options: {
          force: true
        }
      }
    },
    copy: {
      webapp: {
        files: [
          {src: ['index.js', 'libs/**'], dest: config.path.webapp}
        ]
      },
      test: {
        files: [
          {expand: true, cwd: './test/case/', src: ['**'], dest: 'test/cmd/app/case/'},
          {expand: true, cwd: './test/case/', src: ['**'], dest: 'test/node/case/'},
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
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks("grunt-jscoverage");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('_dev', ['test', 'webapp']);
  grunt.registerTask('webapp', ['clean:webapp', 'copy:webapp']);
  grunt.registerTask('test', ['copy:test', 'mocha:cmd', 'mochacli:node', 'clean:test']);
  grunt.registerTask('test-cmd', ['copy:test', 'mocha:cmd', 'clean:test']);
  grunt.registerTask('test-node', ['copy:test', 'mochacli:node', 'clean:test']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('cov', ['jscoverage']);
};
