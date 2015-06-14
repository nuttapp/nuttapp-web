module.exports = function (grunt) {
    var env = grunt.option('env') || 'dev';
    var buildDir = 'builds/' + env;
    var useLiveReload = true;
    var port = 9000;

    if (env === 'prod') {
        useLiveReload = false;
        port = 9001;
    }

    var gruntConfig = {

    watch: {
      options: {
          livereload: useLiveReload
      },
      bootstrap: {
        files: ['vendor/bootstrap/less/*.less'],
        tasks: ['clear', 'shell:buildBootstrap', 'copy:bootstrap_css_dev']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['clear', 'less:lessDev']
      },
      html: {
        files: ['*.html'],
        tasks: ['clear', 'copy:html']
      },
      images: {
        files: ['images/*', 'css/images/*'],
        tasks: ['clear', 'copy:images', 'copy:cssImages']
      }
    },

    less: {
      lessDev: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'site.css.map',
          sourceMapFilename: buildDir + '/css/site.css.map'
        },
        files: {
          'builds/dev/css/site.css': 'less/site.less'
        }
      },
      lessProd: {
        files: {
          'builds/prod/css/site.css': 'less/site.less'
        }
      }
    },

    cssmin: {
      minProd: {
        files: {
          'builds/prod/css/site.css': 'builds/prod/css/site.css'
        }
      }
    },

    shell: {
      buildBootstrap: {
        command: 'grunt --base vendor/bootstrap/ --gruntfile vendor/bootstrap/Gruntfile.js less:compileCore autoprefixer:core csscomb:dist cssmin:minifyCore'
      }
    },

    copy: {
      cssImages: {
        expand: true,
        cwd: 'css/',
        src: 'images/*',
        dest: buildDir + '/css/',
        filter: 'isFile',
      },
      bootstrap_css_dev: {
        expand: true,
        cwd: 'vendor/bootstrap/dist/css/',
        src: 'bootstrap.*css*',
        dest: buildDir + '/css/',
        filter: 'isFile',
        flatten: true
      },
      bootstrap_css_prod: {
        src: 'vendor/bootstrap/dist/css/bootstrap.min.css',
        dest: buildDir + '/css/bootstrap.css',
      },
      html: {
        expand: true,
        cwd: './',
        src: '*.html',
        dest: buildDir,
        filter: 'isFile',
        flatten: true
      },
      images: {
        expand: true,
        cwd: 'images',
        src: '*',
        dest: buildDir + '/images/',
        filter: 'isFile',
        flatten: true
      }
    },
   
    clean: {
        dev: 'builds/dev/*',
        prod: 'builds/prod/*'
    },

    connect: {
      run: {
        options: {
          keepalive: true,
          port: port,
          livereload: useLiveReload,
          base: buildDir
        }
      }
    },

    imagemin: {                          // Task 
      dynamic: {                         // Another target 

        files: [{
          expand: true,                  // Enable dynamic expansion 
          cwd: 'images/',                   // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
          dest: 'builds/prod/images/'                  // Destination path prefix 
        }]
      }
    }

  };

  if (env === 'dev') {
    grunt.registerTask('build', [
        'clear',
        'clean:dev',
        'shell:buildBootstrap', 'copy:bootstrap_css_dev',
        'less:lessDev',
        'copy:html',
        'copy:images', 
        'copy:cssImages'
    ]);
  } else if (env === 'prod') {
    grunt.registerTask('build', [
        'clear', 
        'clean:prod',
        'shell:buildBootstrap', 'copy:bootstrap_css_prod',
        'less:lessProd',
        'cssmin:minProd',
        'copy:html',
        'imagemin', 
        'copy:cssImages'
    ]);
  }

  require('time-grunt')(grunt);
  grunt.initConfig(gruntConfig);

  // load all grunt tasks that are in devDependencies
  require('jit-grunt')(grunt);
};
