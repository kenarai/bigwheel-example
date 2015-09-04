module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // CONFIG START
    config: {
      assets: 'assets',
      src: 'app',
      dev: '.tmp',
      dist: 'release',
      server: '127.0.0.1',
      port: 9000,
    },

    clean: {
      assets: ['<%= config.dev %>/assets/'],
      dev: ['<%= config.dev %>'],
      dist: ['<%= config.dist %>']
    },

    copy:{
      dev:{
        'files': [
          {
            'expand': true,
            'cwd': '<%= config.src %>/',
            'src': ['index.html'],
            'dest': '<%= config.dev %>/'
          },
          {
            'expand': true,
            'cwd': '<%= config.src %>/assets/',
            'src': ['**'],
            'dest': '<%= config.dev %>/assets/'
          }
        ]
      },
      dist:{
        'files': [
          {
            'expand': true,
            'cwd': '<%= config.src %>/',
            'src': ['index.html'],
            'dest': '<%= config.dist %>/',
          },
          {
            'expand': true,
            'cwd': '<%= config.src %>/assets/',
            'src': ['**'],
            'dest': '<%= config.dist %>/assets/'
          }
        ],
      }
    },

    less: {
      dev: {
        'options': {
          'plugins' : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]}) ],
          'compress': true,
          'cleancss': false,
          'sourceMap': true,
          'sourceMapFilename': '<%= config.dev %>/css/main.css.map',
          'sourceMapURL': 'main.css.map',
          'sourceMapBasepath': '<%= config.dev %>',
          'sourceMapRootpath': '/'
        },
        'files': {
          '<%= config.dev %>/css/main.css': '<%= config.src %>/com/less/main.less'
        },
      },
      dist: {
        'options': {
          'plugins' : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]}) ],
          'compress': true,
          'cleancss': true,
        },
        'files': {
          '<%= config.dist %>/css/main.css': '<%= config.src %>/com/less/main.less'
        }
      }
    },

    connect: {
      devServer: {
        'options': {
          'base': '<%= config.dev %>/',
          'port': '<%= config.port %>',
          'hostname': '<%= config.server %>'
        }
      }
    },

    browserify: {
      dev: {
        'src': '<%= config.src %>/index.js',
        'dest': '<%= config.dev %>/js/bundle.js',
        'options': {
          'debug': true,
          'watch': true,
          'verbose': true,
          'open': true,
          'browserifyOptions': {
            'debug': true
          }
        }
      },
      dist: {
        'src': '<%= config.src %>/index.js',
        'dest': '<%= config.dist %>/js/bundle.js',
        'options': {
          'debug': false,
          'verbose': false
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      'html': {
        'files': ['<%= config.src %>/**/*.html'],
        'tasks': ['browserify:dev']
      },
      'less': {
        'files': ['<%= config.src %>/**/*.less'],
        'tasks': ['less:dev']
      },
      'browserify': {
        'files': [
          '<%= config.src %>/**/*.js',
          '*.js'
        ],
        'tasks': ['browserify:dev']
      },
      'assets': {
        'files': ['<%= config.src %>/assets/**'],
        'tasks': ['clean:assets', 'copy:dev']
      },
    },
  // CONFIG END
  });

  grunt.registerTask('default',[
    'clean:dev',
    'copy:dev',
    'newer:less:dev',
    'newer:browserify:dev',
    'connect',
    'watch'
  ]);
};
