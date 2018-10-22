/* Gulp dependencies */
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

/* Plugins para PostCSS*/
var csswring = require('csswring');
var sortProperties = require('postcss-sorting');
var cssNext = require('postcss-cssnext');

// Función para regresar errores encontrados durante la ejecución de las tareas
function swallowError (error) {
	console.log(error.toString())

	this.emit('end')
}

gulp.task('styles', function() {

	// Arreglo de plugins a utilizar con PostCSS
	var processors = [
		// sortProperties({ 'sort-order': 'alphabetical' }),
		cssNext
	];
	return gulp.src('./scss/app.scss') // Toma el archivo de origen para trabajar con el
		.pipe(sass()) // Funcionalidad con Sass
		.on('error', swallowError) // Evitamos que se detenga la ejecucion cuando encuentre error
		.pipe(postcss(processors)) // Ejecucion de Plugins de PostCSS
		.pipe(gulp.dest('./css')) // Guarda los archivos en la carpeta css
		.pipe(connect.reload()); // Recarga el navegador con los cambios (Livereload)
});


/* Watch for changes in folder and files  */
gulp.task('watch', function() {
	gulp.watch('**/scss/*.scss', ['styles']);
	gulp.watch('**/*.html', ['html']);
});


gulp.task('connect', function () {
	connect.server({
		livereload: true
	});
});

gulp.task('html', function () {
	return gulp.src('**/*.html')
	.pipe(connect.reload());
});

gulp.task('default', [ 'connect', 'watch', 'styles']) // Ejecucion de tareas al lanzar "gulp" en la consola