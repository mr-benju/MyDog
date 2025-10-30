module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "src/tests/**/*.spec.js",  
      { pattern: 'public/img/*', watched: false, included: false, served: true, nocache: false }
    ],  // busca los tests

    preprocessors: { 
      "src/**/*.js": ["webpack"], // usa webpack para procesar imports/exports
    },
    
    proxies: {
      '/img/': '/base/public/img/'
    },
    
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                plugins: [
                  '@babel/plugin-transform-runtime'
                ]
              }
            }
          },
          {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
          }
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
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
