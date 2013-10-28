module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
};
