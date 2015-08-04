'use strict';

module.exports = function(config) {

  /**
   * The output directory.
   *
   * @property config.dest
   * @type {String}
   */
  config.dest = 'www';

  /**
   * Whether to inject cordova script
   * into html.
   *
   * @property config.cordova
   * @type {Boolean}
   */
  config.cordova = true;



  //
  // Development web server
  //

  /**
   * Development server config.
   *
   * @type {Boolean}
   * @property config.server
   *
   * @example Disable development server
   *   config.server = false;
   */

  /**
   * The host name where to bind development server.
   *
   * @property config.server.host
   * @type {String}
   */
  config.server.host = '0.0.0.0';

  /**
   * The port where development server will to listen.
   *
   * @property config.server.port
   * @type {String}
   */
  config.server.port = '8000';



  //
  // Weinre Remote debug server
  //

  /**
   * Weinre server config.
   *
   * @type {Boolean}
   * @property config.weinre
   *
   * @example Disable weinre
   *   config.weinre = false;
   */

  /**
   * The host name to which weinre will be bound.
   * @type {String}
   */
  config.weinre.boundHost = 'localhost';


  /**
  * The port where weinre server will to listen.
   * @type {String}
   */
  config.weinre.httpPort = 8001;



  //
  // Sources
  //

  /**
   * Less sources
   *
   * @property config.less.src
   * @type {Array}
   *
   * @default
   * 	 ['./src/less/app.less', './src/less/responsive.less']
   */

  // config.less.src.push('src/less/mystyle.less');

  /**
   * Less search paths
   *
   * @property config.less.paths
   * @type {Array}
   *
   * @default
   * 	 ['./src/less', './bower_components']
   */

  // config.less.paths.push('./vendor/less');



  //
  // 3rd party components
  //

  /**
   * Vendor Javascripts
   *
   * @property config.vendor.js
   * @type {Array}
   */

   // config.vendor.js.push('.bower_components/mylib/mylib.js');

  /**
   * Vendor Fonts
   *
   * @property config.vendor.fonts
   * @type {Array}
   */

   // config.vendor.fonts.push('.bower_components/mylib/fonts/**/*');

  /**
   * Vendor Css (prepended on compile time)
   *
   * @property config.vendor.css.prepend
   * @type {Array}
   */

  // config.vendor.css.prepend.push('.bower_components/mylib/mylib.css');

  /**
   * Vendor Css (appended on compile time)
   *
   * @property config.vendor.css.append
   * @type {Array}
   */

  // config.vendor.css.append.push('.bower_components/mylib/mylib.css');

};
