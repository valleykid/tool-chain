module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.outputPath = exports.gulp = undefined;

	__webpack_require__(2);

	var _gulp = __webpack_require__(3);

	var _gulp2 = _interopRequireDefault(_gulp);

	var _webpack = __webpack_require__(4);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _gulpNodemon = __webpack_require__(5);

	var _gulpNodemon2 = _interopRequireDefault(_gulpNodemon);

	var _gulpCssmin = __webpack_require__(6);

	var _gulpCssmin2 = _interopRequireDefault(_gulpCssmin);

	var _gulpUglify = __webpack_require__(7);

	var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

	var _gulpRename = __webpack_require__(8);

	var _gulpRename2 = _interopRequireDefault(_gulpRename);

	var _option = __webpack_require__(9);

	var _option2 = _interopRequireDefault(_option);

	var _webpack3 = __webpack_require__(16);

	var _webpack4 = _interopRequireDefault(_webpack3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wpconfig = (0, _webpack4.default)(_option2.default);
	var outputPath = wpconfig.output.path;
	var _console = console,
	    log = _console.log;


	_gulp2.default.task('webpack', function (callback) {
	  (0, _webpack2.default)(wpconfig, function () {
	    return callback();
	  }); /* err, stats */
	});

	_gulp2.default.task('copy-min', _option2.default.tasks || ['webpack'], function () {
	  log('***** Project-build START *****'.yellow);
	  var buildFile = wpconfig.output.path;
	  // copy
	  _gulp2.default.src(buildFile + '/**/*').pipe(_gulp2.default.dest('./.package/'));
	  // cssmin
	  _gulp2.default.src([buildFile + '/**/*.css', '!' + buildFile + '/**/*.min.css']).pipe((0, _gulpCssmin2.default)()).pipe((0, _gulpRename2.default)({ suffix: '.min' })).pipe(_gulp2.default.dest(buildFile)).pipe(_gulp2.default.dest('./.package/'));
	  // jsmin
	  _gulp2.default.src([buildFile + '/**/*.js', '!' + buildFile + '/**/*.min.js']).pipe((0, _gulpUglify2.default)().on('error', function (error) {
	    log(('[uglify error] ' + error.fileName + ' line:' + error.cause.line).red);
	  })).pipe((0, _gulpRename2.default)({ suffix: '.min' })).pipe(_gulp2.default.dest(buildFile)).pipe(_gulp2.default.dest('./.package/'));
	});

	_gulp2.default.task('dev', function () {
	  return (0, _gulpNodemon2.default)(_option2.default.server).on('restart', function () {
	    log('I\'m restarting...');
	  });
	});

	exports.gulp = _gulp2.default;
	exports.outputPath = outputPath;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("gulp");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("gulp-nodemon");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("gulp-cssmin");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("gulp-uglify");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("gulp-rename");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _path = __webpack_require__(10);

	var _path2 = _interopRequireDefault(_path);

	var _fs = __webpack_require__(11);

	var _fs2 = _interopRequireDefault(_fs);

	var _util = __webpack_require__(12);

	var _util2 = _interopRequireDefault(_util);

	var _deepAssign = __webpack_require__(13);

	var _deepAssign2 = _interopRequireDefault(_deepAssign);

	var _ip = __webpack_require__(14);

	var _transfer = __webpack_require__(15);

	var _transfer2 = _interopRequireDefault(_transfer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var currentPath = process.cwd();
	var fileJson = {
	  name: 'anonymous',
	  server: {
	    script: './examples/index.js',
	    env: { NODE_ENV: 'local' },
	    watch: './examples/'
	  },
	  proxy: {
	    // host: 'http://127.0.0.1',
	    port: 6001
	  },
	  livereload: {
	    exts: ['ejs', 'xtpl', 'js'],
	    watchPath: './examples/'
	  }
	};
	var max = 10;
	var pkg = {};
	var i = 0;

	function getLevel() {
	  var ret = [];
	  for (var m = 0; m < i; m++) {
	    ret.push('../');
	  }
	  return ret.join('');
	}

	function lookForConfigFile() {
	  var fileDir = _path2.default.join(currentPath, i === 0 ? './' : getLevel());
	  var pkgFile = _path2.default.resolve(fileDir, './package.json');
	  var configFile = _path2.default.resolve(fileDir, './.toolchainrc');
	  if (_fs2.default.existsSync(pkgFile)) {
	    pkg = _transfer2.default.require(pkgFile);
	    fileJson.projectPath = fileDir;
	    if (_fs2.default.existsSync(configFile)) return configFile;
	  } else {
	    i++;
	    if (i < max) return lookForConfigFile();
	  }
	  return undefined;
	}

	try {
	  var cfgfile = lookForConfigFile();
	  var content = _fs2.default.readFileSync(cfgfile, 'utf8');
	  fileJson.name = pkg.name || fileJson.name;
	  fileJson = (0, _deepAssign2.default)(fileJson, JSON.parse(content));
	} catch (e) {
	  _util2.default.log('.toolchainrc文件有误请检查');
	}

	var fileDir = fileJson.projectPath;
	var hotdomain = fileJson.proxy.hotdomain;
	var localIP = (0, _ip.address)();
	fileJson.localIP = localIP;
	fileJson.proxy.hotdomain = hotdomain === undefined ? '//' + localIP + ':' + fileJson.proxy.port : hotdomain.replace(/\/$/, '');
	fileJson.server.watch = _path2.default.join(fileDir, fileJson.server.watch);
	fileJson.livereload.watchPath = _path2.default.join(fileDir, fileJson.livereload.watchPath);
	fileJson.theme = fileJson.theme || pkg.theme;

	exports.default = fileJson;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("deep-assign");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("ip");

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	exports.require = require;

	exports.require_resolve = require.resolve;

	exports.getDirname = function () {
	  return __dirname;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = webpackConfig;

	var _fs = __webpack_require__(11);

	var _util = __webpack_require__(12);

	var _path = __webpack_require__(10);

	var _path2 = _interopRequireDefault(_path);

	var _webpack = __webpack_require__(4);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _autoprefixer = __webpack_require__(17);

	var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

	var _extractTextWebpackPlugin = __webpack_require__(18);

	var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

	var _transfer = __webpack_require__(15);

	var _transfer2 = _interopRequireDefault(_transfer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getLoaders(defwpconfig, loaders) {
	  var lsarr = defwpconfig.loadersSetting || [];
	  lsarr = (0, _util.isArray)(lsarr) ? lsarr : ((0, _util.isString)(lsarr) ? lsarr : '').replace(/\s/g, '').split(',');
	  defwpconfig.module = defwpconfig.module || {};
	  defwpconfig.module.loaders = defwpconfig.module.loaders || [];

	  lsarr.forEach(function (ls) {
	    var ld = (0, _util.isObject)(ls) ? ls : loaders[ls];
	    if (ld) {
	      defwpconfig.module.loaders.push(ld);
	    } else {
	      console.log('\u60A8\u4F7F\u7528\u7684loader(' + ls + ')\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5728\u672C\u5730\u5B89\u88C5\u8BBE\u7F6E');
	    }
	  });
	  delete defwpconfig.loadersSetting;
	  return defwpconfig;
	}

	function getEntry(dir, option, plugins) {
	  var results = {};
	  var isLibDir = option.libPath ? dir.indexOf(option.libPath) !== -1 : false;
	  var stats = void 0;
	  plugins = plugins || [];
	  try {
	    stats = (0, _fs.statSync)(dir);
	  } catch (e) {
	    return results;
	  }
	  if (stats && stats.isDirectory()) {
	    (0, _fs.readdirSync)(dir).forEach(function (file) {
	      var dirfile = _path2.default.resolve(dir, file, './index.js');
	      var ext = _path2.default.extname(file);
	      if (ext === '.js' || ext === '.jsx') {
	        results['' + (isLibDir ? 'lib/' : '') + _path2.default.basename(file, ext)] = [_path2.default.resolve(dir, file)].concat(plugins);
	      } else if ((0, _fs.existsSync)(dirfile)) {
	        results['' + (isLibDir ? 'lib/' : '') + file] = [dirfile].concat(plugins);
	      }
	    });
	  }
	  return results;
	}

	function getTheme(option) {
	  var theme = {};
	  if ((0, _util.isString)(option.theme)) {
	    var cfgPath = option.theme;
	    if (cfgPath.charAt(0) === '.') {
	      cfgPath = _path2.default.resolve(option.projectPath, option.theme);
	    }
	    try {
	      var getThemeConfig = _transfer2.default.require(cfgPath);
	      if ((0, _util.isFunction)(getThemeConfig)) {
	        theme = getThemeConfig();
	      } else if ((0, _util.isObject)(getThemeConfig)) {
	        theme = getThemeConfig;
	      }
	    } catch (e) {
	      option.log && option.log(e);
	    }
	  } else if ((0, _util.isObject)(option.theme)) {
	    theme = option.theme;
	  }
	  return theme;
	}

	// export function
	function webpackConfig(option) {
	  var targetDir = option.projectPath;
	  var env = option.node_env || process.env.NODE_ENV || '';

	  var wpEnv = /^(local|development)$/.test(env) ? '' : env; // default: webpack.config.js
	  var wpConfigFile = _path2.default.resolve(targetDir, './webpack.config' + (wpEnv === '' ? '' : '.' + wpEnv) + '.js');
	  var customConfig = (0, _fs.existsSync)(wpConfigFile) ? _transfer2.default.require(wpConfigFile) : null;

	  var proxy = option.proxy;
	  var hotMiddlewareScript = _transfer2.default.require_resolve('webpack-hot-middleware/client') + '?path=' + proxy.hotdomain + '/' + option.name + '__webpack_hmr&reload=true';

	  var gitlab = process.env && process.env.BUILD_DEST;
	  var isGitlab = gitlab !== undefined;
	  var buildPath = isGitlab ? gitlab : _path2.default.join(targetDir, './build');
	  var entryPath = _path2.default.resolve(targetDir, option.entryPath || './src/entry');
	  var libPath = option.libPath ? _path2.default.resolve(targetDir, option.libPath) : undefined;

	  option.currentPath = _transfer2.default.getDirname();

	  var loaders = {
	    babel: {
	      test: /\.(es6|jsx?)$/,
	      exclude: /node_modules/,
	      loader: _transfer2.default.require_resolve('babel-loader'),
	      query: {
	        presets: [_transfer2.default.require_resolve('babel-preset-react'), _transfer2.default.require_resolve('babel-preset-es2015'), _transfer2.default.require_resolve('babel-preset-stage-0')]
	      }
	    },
	    less: {
	      test: /\.less$/,
	      // bower_components|test => You may need an appropriate loader to handle this file type
	      exclude: /node_modules/,
	      loader: _extractTextWebpackPlugin2.default.extract(_transfer2.default.require_resolve('css-loader') + '?sourceMap!' + (_transfer2.default.require_resolve('less-loader') + '?') + ('{"sourceMap":true,"modifyVars":' + JSON.stringify(getTheme(option)) + '}'))
	    },
	    postcss: {
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: _extractTextWebpackPlugin2.default.extract(_transfer2.default.require_resolve('css-loader') + '?sourceMap&modules!' + _transfer2.default.require_resolve('postcss-loader'))
	    },
	    tpl: {
	      test: /\.(html|tpl)$/,
	      exclude: /node_modules/,
	      loader: _transfer2.default.require_resolve('html-loader')
	    },
	    url: {
	      test: /\.(jpe?g|png|gif|eot|otf|svg|ttf|woff2?)/,
	      exclude: /node_modules/,
	      loader: _transfer2.default.require_resolve('url-loader') + '?limit=10000&name=s/[hash].[ext]'
	    }
	  };

	  var defaultConfig = {
	    devtool: isGitlab ? '' : 'source-map', // cheap-module-eval-source-map
	    entry: Object.assign(getEntry(entryPath, option, isGitlab ? [] : [hotMiddlewareScript]), libPath ? getEntry(libPath, option, isGitlab ? [] : [hotMiddlewareScript]) : null),
	    output: {
	      path: buildPath,
	      publicPath: isGitlab ? '' : proxy.hotdomain + '/build/',
	      filename: '[name].js'
	    },

	    plugins: isGitlab ? [new _extractTextWebpackPlugin2.default('[name].css')] : [new _extractTextWebpackPlugin2.default('[name].css'), new _webpack2.default.optimize.OccurenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()],

	    resolve: {},

	    externals: {},

	    postcss: function postcss() {
	      return [(0, _autoprefixer2.default)({ browsers: ['last 2 versions', '> 2%'] })];
	    },


	    module: {
	      loaders: []
	    }
	  };

	  if ((0, _util.isFunction)(customConfig)) {
	    defaultConfig.loadersSetting = 'babel, less, tpl, url';
	    defaultConfig = getLoaders(defaultConfig, loaders);

	    loaders.setting = function (ld) {
	      defaultConfig.module.loaders = [];
	      defaultConfig.loadersSetting = ld || 'babel, less, tpl, url';
	      defaultConfig = getLoaders(defaultConfig, loaders);
	    };

	    customConfig(defaultConfig, _webpack2.default, loaders);
	  } else {
	    Object.assign(defaultConfig, customConfig);
	    defaultConfig.loadersSetting = defaultConfig.loadersSetting === undefined ? 'babel, less, tpl, url' : defaultConfig.loadersSetting;
	    defaultConfig = getLoaders(defaultConfig, loaders);
	  }

	  return defaultConfig;
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("autoprefixer");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ }
/******/ ]);