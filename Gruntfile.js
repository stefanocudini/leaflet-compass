'use strict';

module.exports = function(grunt) {

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	meta: {
		banner:
		'/* \n'+
		' * Leaflet Control Compass v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
		' * \n'+
		' * Copyright 2014 <%= pkg.author.name %> \n'+
		' * <%= pkg.author.email %> \n'+
		' * <%= pkg.author.url %> \n'+
		' * \n'+
		' * Licensed under the <%= pkg.license %> license. \n'+
		' * \n'+
		' * Demos: \n'+
		' * <%= pkg.homepage %> \n'+
		' * \n'+
		' * Source: \n'+
		' * <%= pkg.repository.url %> \n'+
		' * \n'+
		' */\n'
	},
	clean: {
		dist: {
			src: ['dist/*']
		}
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignore tabs and space warning
			"-W033": true,
			"-W044": true	//ignore regexp
		},
		files: ['src/*.js']
	},
	concat: {
		//TODO cut out SearchMarker
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/leaflet-compass.src.js': ['src/leaflet-compass.js'],			
				'dist/leaflet-compass.src.css': ['src/leaflet-compass.css']
			}
		}
	},
	uglify: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'dist/leaflet-compass.min.js': ['dist/leaflet-compass.src.js']
			}
		}
	},
	cssmin: {
		combine: {
			files: {
				'dist/leaflet-compass.min.css': ['src/leaflet-compass.css']
			}
		},
		options: {
			banner: '<%= meta.banner %>'
		},
		minify: {
			expand: true,
			cwd: 'dist/',
			files: {
				'dist/leaflet-compass.min.css': ['src/leaflet-compass.css']
			}
		}
	},
    svg2png: {
        all: {
            files: [
                { src: ['images/*.svg'] }
            ]
        }
    },	
	todos: {
		options: { verbose: false },
		TODO: ['src/*.js'],
	},	
	watch: {
		dist: {
			options: { livereload: true },
			files: ['src/*'],
			tasks: ['clean','concat','cssmin','jshint']
		}		
	}
});

grunt.registerTask('default', [
	'clean',
	'concat',	
	'cssmin',
	'jshint',
	'uglify',
	'svg2png',
	'todos'
]);


grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-svg2png');
grunt.loadNpmTasks('grunt-todos');

};