module.exports = function (grunt) {
    var env = grunt.option('env') || 'dev';
    var buildDir = 'builds/' + env;

    var gruntConfig = {

    watch: {
      options: {
          livereload: true
      },
      bootstrap: {
        files: ['vendor/bootstrap/less/*.less'],
        tasks: ['shell:buildBootstrap', 'copy:bootstrap_css_dev']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less:lessDev']
      },
      html: {
        files: ['*.html'],
        tasks: ['copy:html']
      },
      images: {
        files: ['images/*', 'css/images/*'],
        tasks: ['copy:images', 'copy:cssImages']
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
      dev: {
        options: {
          keepalive: true,
          port: 9000,
          livereload: true,
          base: "builds/dev/"
        }
      },
      prod: {
        options: {
          keepalive: true,
          port: 9001,
          livereload: false,
          base: "builds/prod/"
        }
      }
    }

  };

  if (env === 'dev') {
    grunt.registerTask('build', [
        'clean:dev',
        'shell:buildBootstrap', 'copy:bootstrap_css_dev',
        'less:lessDev',
        'copy:html',
        'copy:images', 'copy:cssImages'
    ]);
  } else if (env === 'prod') {
    grunt.registerTask('build', [
        'clean:prod',
        'shell:buildBootstrap', 'copy:bootstrap_css_prod',
        'less:lessProd',
        'cssmin:minProd',
        'copy:html',
        'copy:images', 'copy:cssImages'
    ]);
  }

  require('time-grunt')(grunt);
  grunt.initConfig(gruntConfig);

  // load all grunt tasks that are in devDependencies
  require('jit-grunt')(grunt);
};
