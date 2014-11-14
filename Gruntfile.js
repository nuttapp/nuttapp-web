module.exports = function (grunt) {
    var gruntConfig = {

    watch: {
      less: {
        files: ['less/*.less', 'vendor/bootstrap/less/*.less', '*.html'],
        tasks: ['shell:compileBootstrap', 'less:compileSite', 'cssmin:minSite', 'copy']
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
      minSite: {
        files: {
          'css/site.min.css': ['css/site.css']
        }
      },
      combine: {
        files: {
        'public/css/site.css': ['path/to/input_one.css', 'path/to/input_two.css']
        }
      }
    },

    shell: {
      compileBootstrap: {
        command: 'grunt --base vendor/bootstrap/ --gruntfile vendor/bootstrap/Gruntfile.js less:compileCore autoprefixer:core csscomb:dist cssmin:minifyCore'
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
