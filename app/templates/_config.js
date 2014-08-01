module.exports = function(config) {

  // Output directory
  config.dest = 'www';
  
  // Inject cordova script into html
  config.cordova = true;
  
  // Images minification
  config.minify_images = true;

  // Development web server
  // Setting to false will disable it
  config.server = {
                    host: '0.0.0.0',
                    port: '8000'
                  };

  // Weinre Remote debug server
  // Setting to false will disable it
  config.weinre = {
           httpPort:     8001,
           boundHost:    'localhost'
         };
  
  // 3rd party components
  // config.vendor.js.push('.bower_components/lib/dist/lib.js');
  // config.vendor.fonts.push('.bower_components/font/dist/*');

};