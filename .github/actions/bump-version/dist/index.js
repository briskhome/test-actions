module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(104);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 104:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(990);
const github = __webpack_require__(690);
const { exec } = __webpack_require__(952);

async function run() {
  try {
    const actor = core.getInput('actor');
    const token = core.getInput('token');
    const context = github.context;

    // Configure git
    await exec('git', ['remote', 'add', 'github', `"${actor}:${token}@github.com/${context.repository}.git"`]);
    await exec('git', ['config', 'user.name', '"Osome Bot"']);
    await exec('git', ['config', 'user.email', '"heuels@osome.com"']);

    // Bump minor version
    await exec('npm', ['version', 'minor', '--no-git-tag-version']);
    const version = __webpack_require__(809).version;

    // Create a commit and push it
    await exec('git', ['add', 'package.json']);
    await exec('git', ['commit', `v${version}`]);
    await exec('git', ['push', 'github', `HEAD:${context.ref}`]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()


/***/ }),

/***/ 690:
/***/ (function(module) {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 809:
/***/ (function(module) {

module.exports = eval("require")("package.json");


/***/ }),

/***/ 952:
/***/ (function(module) {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 990:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ });