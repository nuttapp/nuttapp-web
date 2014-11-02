module.exports = function (grunt) {
    var gruntConfig = {

    watch: {
      less: {
        files: ['less/*.less', 'vendor/bootstrap/less/*.less', '*.html'],
        tasks: ['shell:compileBootstrap', 'less:compileSite', 'copy']
        // tasks: ['less:compileSite', 'copy']
      }
    },

    less: {
      compileSite: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'site.css.map',
          sourceMapFilename: 'css/site.css.map'
          // sourceMapBasePath: 'css'
        },
        files: {
          'css/site.css': 'less/site.less'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
        'public/css/site.css': ['path/to/input_one.css', 'path/to/input_two.css']
        }
      }
    },

    shell: {
      compileBootstrap: {
        command: 'grunt --base vendor/bootstrap/ --gruntfile vendor/bootstrap/Gruntfile.js less:compileCore autoprefixer:core csscomb:dist cssmin:minifyCore concat uglify:core'
      }
    },

    copy: {
      bootstrap_css: {
        expand: true,
        cwd: 'vendor/bootstrap/dist/css/',
        src: 'bootstrap.*css*',
        dest: 'css/',
        filter: 'isFile',
        flatten: true
      },
      bootstrap_js: {
        expand: true,
        cwd: 'vendor/bootstrap/dist/js/',
        src: 'bootstrap.*js*',
        dest: 'js/',
        filter: 'isFile',
        flatten: true
      },
      html: {
        expand: true,
        cwd: './',
        src: '*.html',
        dest: 'public/',
        filter: 'isFile',
        flatten: true
      },
      css: {
        expand: true,
        cwd: 'css/',
        src: 'images/*',
        dest: 'public/css/',
        filter: 'isFile',
      }
    }
  };
  
  require('time-grunt')(grunt);
  grunt.initConfig(gruntConfig);

  // load all grunt tasks that are in devDependencies
  require('jit-grunt')(grunt);
};
