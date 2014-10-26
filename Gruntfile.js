module.exports = function (grunt) {
  var gruntConfig = {

    watch: {
      // src: {
      //   files: '<%= jshint.src.src %>',
      //   tasks: ['jshint:src', 'qunit']
      // },
      // test: {
      //   files: '<%= jshint.test.src %>',
      //   tasks: ['jshint:test', 'qunit']
      // },
      less: {
        files: ['less/*.less', 'vendor/bootstrap/less/*.less'],
        tasks: ['shell:compileBootstrap', 'lessv']
      }
    },

    less: {
      compileCore: {
        options: {
          paths: 'vendor/bootstrap/less/',
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'foo.css.map',
          sourceMapFilename: 'foo.css.map'
        },
        files: {
          './foo.css': 'less/bootstrap.less'
        }
      }
    },

    shell: {
      compileBootstrap: {
        command: 'grunt --base vendor/bootstrap/ --gruntfile vendor/bootstrap/Gruntfile.js less:compileCore autoprefixer:core csscomb:dist'
      }
    }
  };

  grunt.initConfig(gruntConfig);

  // load all grunt tasks that are in devDependencies
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  grunt.registerTask('lessv', ['less:compileCore']);
};
