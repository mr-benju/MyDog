// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["src/tests/**/*.spec.js"], // busca los tests
    preprocessors: { 
      "src/**/*.js": ["webpack"], // usa webpack para procesar imports/exports
    },
    webpack: { // permite los imports y exports
      mode: "development", // modo desarrollo para tests
    },
    reporters: ['mocha', 'html'],

mochaReporter: {
  showDiff: true,
  colors: {
    success: 'green',
    info: 'blue',
    warning: 'cyan',
    error: 'red'
  }
},

htmlReporter: {
  outputDir: 'karma_html', // carpeta donde se guardará el reporte
  reportName: 'reporte-unitario', // nombre del archivo
  focusOnFailures: true,
  namedFiles: false,
  urlFriendlyName: false
},

    browsers: ["Chrome"], // ejecuta las pruebas en Chrome
    singleRun: false, // cierra el navegador tras ejecutar las pruebas
  });
};
