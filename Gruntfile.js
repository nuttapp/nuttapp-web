module.exports = function (grunt) {
    var env = grunt.option('env') || 'dev';
    var buildDir = 'builds/' + env;

    var gruntConfig = {

    watch: {
      options: {
          livereload: true,
          atBegin: true
      },
      bootstrap: {
        files: ['vendor/bootstrap/less/*.less'],
        tasks: ['clear', 'shell:buildBootstrap', 'copy:bootstrap_css_dev']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['clear', 'less']
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
      build: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
        },
        files: [{
          expand: true,
          src: 'less/*.less',
          dest: buildDir + '/css',
          flatten: true,
          ext: '.css'
        }]
      } 
    },

    cssmin: {
      minProd: {
        files: [{
          expand: true,
          src: buildDir + '/css/*.css',
          dest: buildDir + '/css',
          flatten: true,
          ext: '.css'
        }]
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
        src: 'bootstrap.css*',
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
        buildFiles: buildDir + '/*'
    },

    connect: {
      run: {
        options: {
          keepalive: true,
          port: 9000,
          livereload: true,
          base: buildDir
        }
      }
    },

    imagemin: {                          
      dynamic: {                         
        files: [{
          expand: true,                  
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: buildDir + '/images/'
        }]
      }
    }

  };

  if (env === 'dev') {
    grunt.registerTask('build', [
        'clear',
        'clean',
        'shell:buildBootstrap', 'copy:bootstrap_css_dev',
        'less',
        'copy:html',
        'copy:images', 
        'copy:cssImages'
    ]);
  } else if (env === 'prod') {
    // disable live reload
    gruntConfig.watch.options.livereload = false;
    gruntConfig.connect.run.options.livereload = false;
    // disable sourcemaps
    gruntConfig.less.build.options.sourceMap = false;
    // change connect port
    gruntConfig.connect.run.options.port = 9001;

    grunt.registerTask('build', [
        'clear', 
        'clean',
        'shell:buildBootstrap', 'copy:bootstrap_css_prod',
        'less',
        'cssmin:minProd',
        'copy:html',
        'imagemin', 
        'copy:cssImages'
    ]);
  }

  require('time-grunt')(grunt);
  grunt.initConfig(gruntConfig);

  // load all grunt tasks on demand
  require('jit-grunt')(grunt);
};
