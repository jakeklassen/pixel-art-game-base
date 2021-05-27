// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3YaxN":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "8599d34ab38277acfe107106781f3c2d";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"GVR7w":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "IDENTITY_MATRIX", function () {
  return IDENTITY_MATRIX;
});
var _resourceLoader = require('resource-loader');
var _urlAssetsBunnyPng = require('url:./assets/bunny.png');
var _urlAssetsBunnyPngDefault = _parcelHelpers.interopDefault(_urlAssetsBunnyPng);
var _urlAssetsMegamanPng = require('url:./assets/megaman.png');
var _urlAssetsMegamanPngDefault = _parcelHelpers.interopDefault(_urlAssetsMegamanPng);
var _urlAssetsMapPng = require('url:./assets/map.png');
var _urlAssetsMapPngDefault = _parcelHelpers.interopDefault(_urlAssetsMapPng);
var _urlAssetsFontsVisitorVisitor1Ttf = require('url:./assets/fonts/visitor/visitor1.ttf');
var _urlAssetsFontsVisitorVisitor1TtfDefault = _parcelHelpers.interopDefault(_urlAssetsFontsVisitorVisitor1Ttf);
var _libScreen = require('./lib/screen');
const GAME_WIDTH = 384 * 2;
const GAME_HEIGHT = 216 * 2;
const SRC_GAME_WIDTH = 384;
const SRC_GAME_HEIGHT = 216;
let gameScale = 1;
const loader = new _resourceLoader.Loader();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
ctx.imageSmoothingEnabled = false;
canvas.style.width = `${GAME_WIDTH}px`;
canvas.style.height = `${GAME_HEIGHT}px`;
const IDENTITY_MATRIX = {
  a: 2,
  b: 0,
  c: 0,
  d: 2,
  e: 0,
  f: 0
};
const resize = () => {
  // Scale canvas to fit window while maintaining 16x9
  const {innerWidth, innerHeight} = window;
  const {factor} = _libScreen.getResolution(innerWidth, innerHeight, GAME_WIDTH, GAME_HEIGHT);
  gameScale = factor;
  canvas.style.transform = `scale(${factor})`;
  canvas.style.left = `${innerWidth / 2 - canvas.width / 2}px`;
  canvas.style.top = `${innerHeight / 2 - canvas.height / 2}px`;
};
resize();
// window.addEventListener('resize', resize);
loader.add(_urlAssetsBunnyPngDefault.default).add(_urlAssetsMegamanPngDefault.default).add(_urlAssetsMapPngDefault.default).add(_urlAssetsFontsVisitorVisitor1TtfDefault.default).load(async (loader, resources) => {
  const font = new FontFace('Visitor', `url(${_urlAssetsFontsVisitorVisitor1TtfDefault.default})`);
  const visitorFont = await font.load();
  document.fonts.add(visitorFont);
  const bunnyResource = resources[_urlAssetsBunnyPngDefault.default];
  const playerResource = resources[_urlAssetsMegamanPngDefault.default];
  const mapResource = resources[_urlAssetsMapPngDefault.default];
  const player = {
    pos: {
      x: playerResource.data.width / 2,
      y: canvas.height / 2 - playerResource.data.height / 2
    },
    dir: {
      x: 1,
      y: 1
    },
    vel: {
      x: 60 * 2,
      y: 60 * 2
    },
    sprite: playerResource.data
  };
  const TARGET_FPS = 60;
  const STEP = 1000 / TARGET_FPS;
  let last = performance.now();
  let deltaTimeAccumulator = 0;
  function frame(hrt) {
    deltaTimeAccumulator += Math.min(1000, hrt - last);
    const dt = Math.min(1000, hrt - last) / 1000;
    player.pos.x += player.vel.x * dt * player.dir.x;
    player.pos.y += player.vel.y * dt * player.dir.y;
    if (player.pos.x + player.sprite.width * 2 >= GAME_WIDTH) {
      player.pos.x = GAME_WIDTH - player.sprite.width * 2;
      player.dir.x *= -1;
    } else if (player.pos.x <= 0) {
      player.pos.x = 0;
      player.dir.x *= -1;
    }
    if (player.pos.y + player.sprite.height * 2 >= GAME_HEIGHT) {
      player.pos.y = GAME_HEIGHT - player.sprite.height * 2;
      player.dir.y *= -1;
    } else if (player.pos.y <= 0) {
      player.pos.y = 0;
      player.dir.y *= -1;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(IDENTITY_MATRIX);
    ctx.drawImage(mapResource.data, 0, 0);
    ctx.fillStyle = 'white';
    ctx.font = '10px Visitor';
    ctx.setTransform(2, 0, 0, 2, player.pos.x, player.pos.y);
    ctx.drawImage(player.sprite, 0, 0);
    ctx.setTransform(IDENTITY_MATRIX);
    last = hrt;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
});

},{"resource-loader":"6bpcO","url:./assets/bunny.png":"69b0v","url:./assets/megaman.png":"2J46h","url:./assets/map.png":"1gNqp","url:./assets/fonts/visitor/visitor1.ttf":"p3ilP","./lib/screen":"737Je","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6bpcO":[function(require,module,exports) {
/*!
 * resource-loader - v4.0.0-rc4
 * https://github.com/englercj/resource-loader
 * Compiled Sun, 08 Mar 2020 16:55:29 UTC
 *
 * resource-loader is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var typeSignals = require('type-signals');
var parseUri = _interopDefault(require('parse-uri'));

var AbstractLoadStrategy = (function () {
    function AbstractLoadStrategy(config) {
        this.config = config;
        this.onError = new typeSignals.Signal();
        this.onComplete = new typeSignals.Signal();
        this.onProgress = new typeSignals.Signal();
    }
    return AbstractLoadStrategy;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function getExtension(url) {
    var isDataUrl = url.indexOf('data:') === 0;
    var ext = '';
    if (isDataUrl) {
        var slashIndex = url.indexOf('/');
        ext = url.substring(slashIndex + 1, url.indexOf(';', slashIndex));
    }
    else {
        var queryStart = url.indexOf('?');
        var hashStart = url.indexOf('#');
        var index = Math.min(queryStart > -1 ? queryStart : url.length, hashStart > -1 ? hashStart : url.length);
        url = url.substring(0, index);
        ext = url.substring(url.lastIndexOf('.') + 1);
    }
    return ext.toLowerCase();
}
function assertNever(x) {
    throw new Error('Unexpected value. Should have been never.');
}

(function (ResourceType) {
    ResourceType[ResourceType["Unknown"] = 0] = "Unknown";
    ResourceType[ResourceType["Buffer"] = 1] = "Buffer";
    ResourceType[ResourceType["Blob"] = 2] = "Blob";
    ResourceType[ResourceType["Json"] = 3] = "Json";
    ResourceType[ResourceType["Xml"] = 4] = "Xml";
    ResourceType[ResourceType["Image"] = 5] = "Image";
    ResourceType[ResourceType["Audio"] = 6] = "Audio";
    ResourceType[ResourceType["Video"] = 7] = "Video";
    ResourceType[ResourceType["Text"] = 8] = "Text";
})(exports.ResourceType || (exports.ResourceType = {}));
(function (ResourceState) {
    ResourceState[ResourceState["NotStarted"] = 0] = "NotStarted";
    ResourceState[ResourceState["Loading"] = 1] = "Loading";
    ResourceState[ResourceState["Complete"] = 2] = "Complete";
})(exports.ResourceState || (exports.ResourceState = {}));

var MediaElementLoadStrategy = (function (_super) {
    __extends(MediaElementLoadStrategy, _super);
    function MediaElementLoadStrategy(config, elementType) {
        var _this = _super.call(this, config) || this;
        _this.elementType = elementType;
        _this._boundOnLoad = _this._onLoad.bind(_this);
        _this._boundOnError = _this._onError.bind(_this);
        _this._boundOnTimeout = _this._onTimeout.bind(_this);
        _this._element = _this._createElement();
        _this._elementTimer = 0;
        return _this;
    }
    MediaElementLoadStrategy.prototype.load = function () {
        var config = this.config;
        if (config.crossOrigin)
            this._element.crossOrigin = config.crossOrigin;
        var urls = config.sourceSet || [config.url];
        if (navigator.isCocoonJS) {
            this._element.src = urls[0];
        }
        else {
            for (var i = 0; i < urls.length; ++i) {
                var url = urls[i];
                var mimeType = config.mimeTypes ? config.mimeTypes[i] : undefined;
                if (!mimeType)
                    mimeType = this.elementType + "/" + getExtension(url);
                var source = document.createElement('source');
                source.src = url;
                source.type = mimeType;
                this._element.appendChild(source);
            }
        }
        this._element.addEventListener('load', this._boundOnLoad, false);
        this._element.addEventListener('canplaythrough', this._boundOnLoad, false);
        this._element.addEventListener('error', this._boundOnError, false);
        this._element.load();
        if (config.timeout)
            this._elementTimer = window.setTimeout(this._boundOnTimeout, config.timeout);
    };
    MediaElementLoadStrategy.prototype.abort = function () {
        this._clearEvents();
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
        this._error(this.elementType + " load aborted by the user.");
    };
    MediaElementLoadStrategy.prototype._createElement = function () {
        if (this.config.loadElement)
            return this.config.loadElement;
        else
            return document.createElement(this.elementType);
    };
    MediaElementLoadStrategy.prototype._clearEvents = function () {
        clearTimeout(this._elementTimer);
        this._element.removeEventListener('load', this._boundOnLoad, false);
        this._element.removeEventListener('canplaythrough', this._boundOnLoad, false);
        this._element.removeEventListener('error', this._boundOnError, false);
    };
    MediaElementLoadStrategy.prototype._error = function (errMessage) {
        this._clearEvents();
        this.onError.dispatch(errMessage);
    };
    MediaElementLoadStrategy.prototype._complete = function () {
        this._clearEvents();
        var resourceType = exports.ResourceType.Unknown;
        switch (this.elementType) {
            case 'audio':
                resourceType = exports.ResourceType.Audio;
                break;
            case 'video':
                resourceType = exports.ResourceType.Video;
                break;
            default: assertNever(this.elementType);
        }
        this.onComplete.dispatch(resourceType, this._element);
    };
    MediaElementLoadStrategy.prototype._onLoad = function () {
        this._complete();
    };
    MediaElementLoadStrategy.prototype._onError = function () {
        this._error(this.elementType + " failed to load.");
    };
    MediaElementLoadStrategy.prototype._onTimeout = function () {
        this._error(this.elementType + " load timed out.");
    };
    return MediaElementLoadStrategy;
}(AbstractLoadStrategy));

var AudioLoadStrategy = (function (_super) {
    __extends(AudioLoadStrategy, _super);
    function AudioLoadStrategy(config) {
        return _super.call(this, config, 'audio') || this;
    }
    return AudioLoadStrategy;
}(MediaElementLoadStrategy));

var EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
var ImageLoadStrategy = (function (_super) {
    __extends(ImageLoadStrategy, _super);
    function ImageLoadStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._boundOnLoad = _this._onLoad.bind(_this);
        _this._boundOnError = _this._onError.bind(_this);
        _this._boundOnTimeout = _this._onTimeout.bind(_this);
        _this._element = _this._createElement();
        _this._elementTimer = 0;
        return _this;
    }
    ImageLoadStrategy.prototype.load = function () {
        var config = this.config;
        if (config.crossOrigin)
            this._element.crossOrigin = config.crossOrigin;
        this._element.src = config.url;
        this._element.addEventListener('load', this._boundOnLoad, false);
        this._element.addEventListener('error', this._boundOnError, false);
        if (config.timeout)
            this._elementTimer = window.setTimeout(this._boundOnTimeout, config.timeout);
    };
    ImageLoadStrategy.prototype.abort = function () {
        this._clearEvents();
        this._element.src = EMPTY_GIF;
        this._error('Image load aborted by the user.');
    };
    ImageLoadStrategy.prototype._createElement = function () {
        if (this.config.loadElement)
            return this.config.loadElement;
        else
            return document.createElement('img');
    };
    ImageLoadStrategy.prototype._clearEvents = function () {
        clearTimeout(this._elementTimer);
        this._element.removeEventListener('load', this._boundOnLoad, false);
        this._element.removeEventListener('error', this._boundOnError, false);
    };
    ImageLoadStrategy.prototype._error = function (errMessage) {
        this._clearEvents();
        this.onError.dispatch(errMessage);
    };
    ImageLoadStrategy.prototype._complete = function () {
        this._clearEvents();
        this.onComplete.dispatch(exports.ResourceType.Image, this._element);
    };
    ImageLoadStrategy.prototype._onLoad = function () {
        this._complete();
    };
    ImageLoadStrategy.prototype._onError = function () {
        this._error('Image failed to load.');
    };
    ImageLoadStrategy.prototype._onTimeout = function () {
        this._error('Image load timed out.');
    };
    return ImageLoadStrategy;
}(AbstractLoadStrategy));

var VideoLoadStrategy = (function (_super) {
    __extends(VideoLoadStrategy, _super);
    function VideoLoadStrategy(config) {
        return _super.call(this, config, 'video') || this;
    }
    return VideoLoadStrategy;
}(MediaElementLoadStrategy));

var useXdr = !!(window.XDomainRequest && !('withCredentials' in (new XMLHttpRequest())));
(function (XhrResponseType) {
    XhrResponseType["Default"] = "text";
    XhrResponseType["Buffer"] = "arraybuffer";
    XhrResponseType["Blob"] = "blob";
    XhrResponseType["Document"] = "document";
    XhrResponseType["Json"] = "json";
    XhrResponseType["Text"] = "text";
})(exports.XhrResponseType || (exports.XhrResponseType = {}));
function reqType(xhr) {
    return xhr.toString().replace('object ', '');
}
var XhrLoadStrategy = (function (_super) {
    __extends(XhrLoadStrategy, _super);
    function XhrLoadStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._boundOnLoad = _this._onLoad.bind(_this);
        _this._boundOnAbort = _this._onAbort.bind(_this);
        _this._boundOnError = _this._onError.bind(_this);
        _this._boundOnTimeout = _this._onTimeout.bind(_this);
        _this._boundOnProgress = _this._onProgress.bind(_this);
        _this._xhr = _this._createRequest();
        _this._xhrType = exports.XhrResponseType.Default;
        return _this;
    }
    XhrLoadStrategy.prototype.load = function () {
        var config = this.config;
        var ext = getExtension(config.url);
        if (typeof config.xhrType !== 'string') {
            config.xhrType = this._determineXhrType(ext);
        }
        var xhr = this._xhr;
        this._xhrType = config.xhrType || exports.XhrResponseType.Default;
        if (useXdr) {
            xhr.timeout = config.timeout || 5000;
            xhr.onload = this._boundOnLoad;
            xhr.onerror = this._boundOnError;
            xhr.ontimeout = this._boundOnTimeout;
            xhr.onprogress = this._boundOnProgress;
            xhr.open('GET', config.url, true);
            setTimeout(function () { xhr.send(); }, 0);
        }
        else {
            xhr.open('GET', config.url, true);
            if (config.timeout)
                xhr.timeout = config.timeout;
            if (config.xhrType === exports.XhrResponseType.Json || config.xhrType === exports.XhrResponseType.Document)
                xhr.responseType = exports.XhrResponseType.Text;
            else
                xhr.responseType = config.xhrType;
            xhr.addEventListener('load', this._boundOnLoad, false);
            xhr.addEventListener('abort', this._boundOnAbort, false);
            xhr.addEventListener('error', this._boundOnError, false);
            xhr.addEventListener('timeout', this._boundOnTimeout, false);
            xhr.addEventListener('progress', this._boundOnProgress, false);
            xhr.send();
        }
    };
    XhrLoadStrategy.prototype.abort = function () {
        if (useXdr) {
            this._clearEvents();
            this._xhr.abort();
            this._onAbort();
        }
        else {
            this._xhr.abort();
        }
    };
    XhrLoadStrategy.prototype._createRequest = function () {
        if (useXdr)
            return new window.XDomainRequest();
        else
            return new XMLHttpRequest();
    };
    XhrLoadStrategy.prototype._determineXhrType = function (ext) {
        return XhrLoadStrategy._xhrTypeMap[ext] || exports.XhrResponseType.Default;
    };
    XhrLoadStrategy.prototype._clearEvents = function () {
        if (useXdr) {
            this._xhr.onload = null;
            this._xhr.onerror = null;
            this._xhr.ontimeout = null;
            this._xhr.onprogress = null;
        }
        else {
            this._xhr.removeEventListener('load', this._boundOnLoad, false);
            this._xhr.removeEventListener('abort', this._boundOnAbort, false);
            this._xhr.removeEventListener('error', this._boundOnError, false);
            this._xhr.removeEventListener('timeout', this._boundOnTimeout, false);
            this._xhr.removeEventListener('progress', this._boundOnProgress, false);
        }
    };
    XhrLoadStrategy.prototype._error = function (errMessage) {
        this._clearEvents();
        this.onError.dispatch(errMessage);
    };
    XhrLoadStrategy.prototype._complete = function (type, data) {
        this._clearEvents();
        this.onComplete.dispatch(type, data);
    };
    XhrLoadStrategy.prototype._onLoad = function () {
        var xhr = this._xhr;
        var text = '';
        var status = typeof xhr.status === 'undefined' ? 200 : xhr.status;
        if (typeof xhr.responseType === 'undefined' || xhr.responseType === '' || xhr.responseType === 'text') {
            text = xhr.responseText;
        }
        if (status === 0 && (text.length > 0 || xhr.responseType === exports.XhrResponseType.Buffer)) {
            status = 200;
        }
        else if (status === 1223) {
            status = 204;
        }
        var flattenedStatus = Math.floor(status / 100) * 100;
        if (flattenedStatus !== 200) {
            this._error("[" + xhr.status + "] " + xhr.statusText + ": " + xhr.responseURL);
            return;
        }
        switch (this._xhrType) {
            case exports.XhrResponseType.Buffer:
                this._complete(exports.ResourceType.Buffer, xhr.response);
                break;
            case exports.XhrResponseType.Blob:
                this._complete(exports.ResourceType.Blob, xhr.response);
                break;
            case exports.XhrResponseType.Document:
                this._parseDocument(text);
                break;
            case exports.XhrResponseType.Json:
                this._parseJson(text);
                break;
            case exports.XhrResponseType.Default:
            case exports.XhrResponseType.Text:
                this._complete(exports.ResourceType.Text, text);
                break;
            default:
                assertNever(this._xhrType);
        }
    };
    XhrLoadStrategy.prototype._parseDocument = function (text) {
        try {
            if (window.DOMParser) {
                var parser = new DOMParser();
                var data = parser.parseFromString(text, 'text/xml');
                this._complete(exports.ResourceType.Xml, data);
            }
            else {
                var div = document.createElement('div');
                div.innerHTML = text;
                this._complete(exports.ResourceType.Xml, div);
            }
        }
        catch (e) {
            this._error("Error trying to parse loaded xml: " + e);
        }
    };
    XhrLoadStrategy.prototype._parseJson = function (text) {
        try {
            var data = JSON.parse(text);
            this._complete(exports.ResourceType.Json, data);
        }
        catch (e) {
            this._error("Error trying to parse loaded json: " + e);
        }
    };
    XhrLoadStrategy.prototype._onAbort = function () {
        var xhr = this._xhr;
        this._error(reqType(xhr) + " Request was aborted by the user.");
    };
    XhrLoadStrategy.prototype._onError = function () {
        var xhr = this._xhr;
        this._error(reqType(xhr) + " Request failed. Status: " + xhr.status + ", text: \"" + xhr.statusText + "\"");
    };
    XhrLoadStrategy.prototype._onTimeout = function () {
        var xhr = this._xhr;
        this._error(reqType(xhr) + " Request timed out.");
    };
    XhrLoadStrategy.prototype._onProgress = function (event) {
        if (event && event.lengthComputable) {
            this.onProgress.dispatch(event.loaded / event.total);
        }
    };
    XhrLoadStrategy.setExtensionXhrType = function (extname, xhrType) {
        if (extname && extname.indexOf('.') === 0)
            extname = extname.substring(1);
        if (!extname)
            return;
        XhrLoadStrategy._xhrTypeMap[extname] = xhrType;
    };
    XhrLoadStrategy.ResponseType = exports.XhrResponseType;
    XhrLoadStrategy._xhrTypeMap = {
        xhtml: exports.XhrResponseType.Document,
        html: exports.XhrResponseType.Document,
        htm: exports.XhrResponseType.Document,
        xml: exports.XhrResponseType.Document,
        tmx: exports.XhrResponseType.Document,
        svg: exports.XhrResponseType.Document,
        tsx: exports.XhrResponseType.Document,
        gif: exports.XhrResponseType.Blob,
        png: exports.XhrResponseType.Blob,
        bmp: exports.XhrResponseType.Blob,
        jpg: exports.XhrResponseType.Blob,
        jpeg: exports.XhrResponseType.Blob,
        tif: exports.XhrResponseType.Blob,
        tiff: exports.XhrResponseType.Blob,
        webp: exports.XhrResponseType.Blob,
        tga: exports.XhrResponseType.Blob,
        json: exports.XhrResponseType.Json,
        text: exports.XhrResponseType.Text,
        txt: exports.XhrResponseType.Text,
        ttf: exports.XhrResponseType.Buffer,
        otf: exports.XhrResponseType.Buffer,
    };
    return XhrLoadStrategy;
}(AbstractLoadStrategy));

function onlyOnce(func) {
    var fn = func;
    return function onceWrapper() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (fn === null)
            throw new Error('Callback was already called.');
        var callFn = fn;
        fn = null;
        return callFn.apply(this, args);
    };
}
var AsyncQueue = (function () {
    function AsyncQueue(worker, concurrency) {
        if (concurrency === void 0) { concurrency = 1; }
        this.worker = worker;
        this.concurrency = concurrency;
        this.workers = 0;
        this.buffer = 0;
        this.paused = false;
        this._started = false;
        this._tasks = [];
        this.onSaturated = new typeSignals.Signal();
        this.onUnsaturated = new typeSignals.Signal();
        this.onEmpty = new typeSignals.Signal();
        this.onDrain = new typeSignals.Signal();
        this.onError = new typeSignals.Signal();
        if (concurrency === 0)
            throw new Error('Concurrency must not be zero');
        this.buffer = concurrency / 4;
    }
    Object.defineProperty(AsyncQueue.prototype, "started", {
        get: function () { return this._started; },
        enumerable: true,
        configurable: true
    });
    AsyncQueue.prototype.reset = function () {
        this.onDrain.detachAll();
        this.workers = 0;
        this._started = false;
        this._tasks = [];
    };
    AsyncQueue.prototype.push = function (data, callback) {
        this._insert(data, false, callback);
    };
    AsyncQueue.prototype.unshift = function (data, callback) {
        this._insert(data, true, callback);
    };
    AsyncQueue.prototype.process = function () {
        while (!this.paused && this.workers < this.concurrency && this._tasks.length) {
            var task = this._tasks.shift();
            if (this._tasks.length === 0)
                this.onEmpty.dispatch();
            this.workers += 1;
            if (this.workers === this.concurrency)
                this.onSaturated.dispatch();
            this.worker(task.data, onlyOnce(this._next(task)));
        }
    };
    AsyncQueue.prototype.length = function () {
        return this._tasks.length;
    };
    AsyncQueue.prototype.running = function () {
        return this.workers;
    };
    AsyncQueue.prototype.idle = function () {
        return this._tasks.length + this.workers === 0;
    };
    AsyncQueue.prototype.pause = function () {
        if (this.paused === true)
            return;
        this.paused = true;
    };
    AsyncQueue.prototype.resume = function () {
        if (this.paused === false)
            return;
        this.paused = false;
        for (var w = 1; w <= this.concurrency; w++) {
            this.process();
        }
    };
    AsyncQueue.prototype.getTask = function (index) {
        return this._tasks[index];
    };
    AsyncQueue.prototype._insert = function (data, insertAtFront, callback) {
        var _this = this;
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        this._started = true;
        if (data == null && this.idle()) {
            setTimeout(function () { return _this.onDrain.dispatch(); }, 1);
            return;
        }
        var task = { data: data, callback: callback };
        if (insertAtFront)
            this._tasks.unshift(task);
        else
            this._tasks.push(task);
        setTimeout(function () { return _this.process(); }, 1);
    };
    AsyncQueue.prototype._next = function (task) {
        var _this = this;
        return function (err) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.workers -= 1;
            if (task.callback)
                task.callback.apply(task, __spreadArrays([err], args));
            if (err)
                _this.onError.dispatch(err, task.data);
            if (_this.workers <= (_this.concurrency - _this.buffer))
                _this.onUnsaturated.dispatch();
            if (_this.idle())
                _this.onDrain.dispatch();
            _this.process();
        };
    };
    return AsyncQueue;
}());

var Resource = (function () {
    function Resource(name, options) {
        this.children = [];
        this.onStart = new typeSignals.Signal();
        this.onProgress = new typeSignals.Signal();
        this.onComplete = new typeSignals.Signal();
        this.onAfterMiddleware = new typeSignals.Signal();
        this.data = null;
        this.type = exports.ResourceType.Unknown;
        this.error = '';
        this.progressChunk = 0;
        this._dequeue = function () { };
        this._onCompleteBinding = null;
        this._state = exports.ResourceState.NotStarted;
        this.name = name;
        this.metadata = options.metadata;
        if (typeof options.crossOrigin !== 'string')
            options.crossOrigin = this._determineCrossOrigin(options.url);
        if (options.strategy && typeof options.strategy !== 'function') {
            this._strategy = options.strategy;
            this._strategy.config = options;
        }
        else {
            var StrategyCtor = options.strategy;
            if (!StrategyCtor)
                StrategyCtor = Resource._loadStrategyMap[getExtension(options.url)];
            if (!StrategyCtor)
                StrategyCtor = Resource._defaultLoadStrategy;
            this._strategy = new StrategyCtor(options);
        }
        this._strategy.onError.add(this._error, this);
        this._strategy.onComplete.add(this._complete, this);
        this._strategy.onProgress.add(this._progress, this);
    }
    Resource.setDefaultLoadStrategy = function (strategy) {
        Resource._defaultLoadStrategy = strategy;
    };
    Resource.setLoadStrategy = function (extname, strategy) {
        if (extname && extname.indexOf('.') === 0)
            extname = extname.substring(1);
        if (!extname)
            return;
        Resource._loadStrategyMap[extname] = strategy;
    };
    Object.defineProperty(Resource.prototype, "strategy", {
        get: function () { return this._strategy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "url", {
        get: function () { return this._strategy.config.url; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "isLoading", {
        get: function () { return this._state === exports.ResourceState.Loading; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "isComplete", {
        get: function () { return this._state === exports.ResourceState.Complete; },
        enumerable: true,
        configurable: true
    });
    Resource.prototype.abort = function () {
        this._strategy.abort();
    };
    Resource.prototype.load = function () {
        this._state = exports.ResourceState.Loading;
        this.onStart.dispatch(this);
        this._strategy.load();
    };
    Resource.prototype._error = function (errMessage) {
        this._state = exports.ResourceState.Complete;
        this.error = errMessage;
        this.onComplete.dispatch(this);
    };
    Resource.prototype._complete = function (type, data) {
        this._state = exports.ResourceState.Complete;
        this.type = type;
        this.data = data;
        this.onComplete.dispatch(this);
    };
    Resource.prototype._progress = function (percent) {
        this.onProgress.dispatch(this, percent);
    };
    Resource.prototype._determineCrossOrigin = function (url, loc) {
        if (loc === void 0) { loc = window.location; }
        if (url.indexOf('data:') === 0 || url.indexOf('javascript:') === 0)
            return '';
        if (window.origin !== window.location.origin)
            return 'anonymous';
        if (!Resource._tempAnchor)
            Resource._tempAnchor = document.createElement('a');
        Resource._tempAnchor.href = url;
        var parsed = parseUri(Resource._tempAnchor.href, { strictMode: true });
        var samePort = (!parsed.port && loc.port === '') || (parsed.port === loc.port);
        var protocol = parsed.protocol ? parsed.protocol + ":" : '';
        if (parsed.host !== loc.hostname || !samePort || protocol !== loc.protocol)
            return 'anonymous';
        return '';
    };
    Resource._tempAnchor = null;
    Resource._defaultLoadStrategy = XhrLoadStrategy;
    Resource._loadStrategyMap = {
        gif: ImageLoadStrategy,
        png: ImageLoadStrategy,
        bmp: ImageLoadStrategy,
        jpg: ImageLoadStrategy,
        jpeg: ImageLoadStrategy,
        tif: ImageLoadStrategy,
        tiff: ImageLoadStrategy,
        webp: ImageLoadStrategy,
        tga: ImageLoadStrategy,
        svg: ImageLoadStrategy,
        'svg+xml': ImageLoadStrategy,
        mp3: AudioLoadStrategy,
        ogg: AudioLoadStrategy,
        wav: AudioLoadStrategy,
        mp4: VideoLoadStrategy,
        webm: VideoLoadStrategy,
        mov: VideoLoadStrategy,
    };
    return Resource;
}());

function eachSeries(array, iterator, callback, deferNext) {
    if (deferNext === void 0) { deferNext = false; }
    var i = 0;
    var len = array.length;
    (function next(err) {
        if (err || i === len) {
            if (callback)
                callback(err);
            return;
        }
        if (deferNext)
            setTimeout(function () { return iterator(array[i++], next); }, 1);
        else
            iterator(array[i++], next);
    })();
}

var MAX_PROGRESS = 100;
var rgxExtractUrlHash = /(#[\w-]+)?$/;
var Loader = (function () {
    function Loader(baseUrl, concurrency) {
        if (baseUrl === void 0) { baseUrl = ''; }
        if (concurrency === void 0) { concurrency = 10; }
        this.progress = 0;
        this.loading = false;
        this.defaultQueryString = '';
        this.resources = {};
        this.onError = new typeSignals.Signal();
        this.onLoad = new typeSignals.Signal();
        this.onStart = new typeSignals.Signal();
        this.onComplete = new typeSignals.Signal();
        this.onProgress = new typeSignals.Signal();
        this._baseUrl = '';
        this._urlResolvers = [];
        this._middleware = [];
        this._resourcesParsing = [];
        this._boundLoadResource = this._loadResource.bind(this);
        this.baseUrl = baseUrl;
        this._queue = new AsyncQueue(this._boundLoadResource, concurrency);
        this._queue.pause();
        this._middleware = Loader._defaultMiddleware.slice();
    }
    Object.defineProperty(Loader.prototype, "baseUrl", {
        get: function () { return this._baseUrl; },
        set: function (url) {
            while (url.length && url.charAt(url.length - 1) === '/') {
                url = url.slice(0, -1);
            }
            this._baseUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    Loader.prototype.add = function (options, url_) {
        if (Array.isArray(options)) {
            for (var i = 0; i < options.length; ++i) {
                this.add(options[i]);
            }
            return this;
        }
        var url = '';
        var name = '';
        var baseUrl = this._baseUrl;
        var resOptions = { url: '' };
        if (typeof options === 'object') {
            url = options.url;
            name = options.name || options.url;
            baseUrl = options.baseUrl || baseUrl;
            resOptions = options;
        }
        else {
            name = options;
            if (typeof url_ === 'string')
                url = url_;
            else
                url = name;
        }
        if (!url)
            throw new Error('You must specify the `url` property.');
        if (this.loading && !resOptions.parentResource) {
            throw new Error('Cannot add root resources while the loader is running.');
        }
        if (this.resources[name]) {
            throw new Error("Resource named \"" + name + "\" already exists.");
        }
        url = this._prepareUrl(url, baseUrl);
        resOptions.url = url;
        var resource = new Resource(name, resOptions);
        this.resources[name] = resource;
        if (typeof resOptions.onComplete === 'function') {
            resource.onAfterMiddleware.once(resOptions.onComplete);
        }
        if (this.loading) {
            var parent_1 = resOptions.parentResource;
            var incompleteChildren = [];
            for (var i = 0; i < parent_1.children.length; ++i) {
                if (!parent_1.children[i].isComplete) {
                    incompleteChildren.push(parent_1.children[i]);
                }
            }
            var fullChunk = parent_1.progressChunk * (incompleteChildren.length + 1);
            var eachChunk = fullChunk / (incompleteChildren.length + 2);
            parent_1.children.push(resource);
            parent_1.progressChunk = eachChunk;
            for (var i = 0; i < incompleteChildren.length; ++i) {
                incompleteChildren[i].progressChunk = eachChunk;
            }
            resource.progressChunk = eachChunk;
        }
        this._queue.push(resource);
        return this;
    };
    Loader.prototype.use = function (fn, priority) {
        if (priority === void 0) { priority = Loader.DefaultMiddlewarePriority; }
        this._middleware.push({ fn: fn, priority: priority });
        this._middleware.sort(function (a, b) { return a.priority - b.priority; });
        return this;
    };
    Loader.prototype.reset = function () {
        this.progress = 0;
        this.loading = false;
        this._queue.reset();
        this._queue.pause();
        for (var k in this.resources) {
            var res = this.resources[k];
            if (!res)
                continue;
            if (res._onCompleteBinding)
                res._onCompleteBinding.detach();
            if (res.isLoading)
                res.abort();
        }
        this.resources = {};
        return this;
    };
    Loader.prototype.load = function (cb) {
        if (typeof cb === 'function')
            this.onComplete.once(cb);
        if (this.loading)
            return this;
        if (this._queue.idle()) {
            this._onStart();
            this._onComplete();
        }
        else {
            var numTasks = this._queue.length();
            var chunk = MAX_PROGRESS / numTasks;
            for (var i = 0; i < this._queue.length(); ++i) {
                this._queue.getTask(i).data.progressChunk = chunk;
            }
            this._onStart();
            this._queue.resume();
        }
        return this;
    };
    Object.defineProperty(Loader.prototype, "concurrency", {
        get: function () {
            return this._queue.concurrency;
        },
        set: function (concurrency) {
            this._queue.concurrency = concurrency;
        },
        enumerable: true,
        configurable: true
    });
    Loader.prototype.addUrlResolver = function (func) {
        this._urlResolvers.push(func);
        return this;
    };
    Loader.prototype._prepareUrl = function (url, baseUrl) {
        var parsed = parseUri(url, { strictMode: true });
        this._urlResolvers.forEach(function (resolver) {
            url = resolver(url, parsed);
            parsed = parseUri(url, { strictMode: true });
        });
        if (!parsed.protocol && url.indexOf('//') !== 0) {
            if (baseUrl.length && url.charAt(0) !== '/')
                url = baseUrl + "/" + url;
            else
                url = baseUrl + url;
        }
        if (this.defaultQueryString) {
            var match = rgxExtractUrlHash.exec(url);
            if (match) {
                var hash = match[0];
                url = url.substr(0, url.length - hash.length);
                if (url.indexOf('?') !== -1)
                    url += "&" + this.defaultQueryString;
                else
                    url += "?" + this.defaultQueryString;
                url += hash;
            }
        }
        return url;
    };
    Loader.prototype._loadResource = function (resource, dequeue) {
        resource._dequeue = dequeue;
        resource._onCompleteBinding = resource.onComplete.once(this._onLoad, this);
        resource.load();
    };
    Loader.prototype._onStart = function () {
        this.progress = 0;
        this.loading = true;
        this.onStart.dispatch(this);
    };
    Loader.prototype._onComplete = function () {
        this.progress = MAX_PROGRESS;
        this.loading = false;
        this.onComplete.dispatch(this, this.resources);
    };
    Loader.prototype._onLoad = function (resource) {
        var _this = this;
        resource._onCompleteBinding = null;
        this._resourcesParsing.push(resource);
        resource._dequeue();
        eachSeries(this._middleware, function (middleware, next) {
            middleware.fn.call(_this, resource, next);
        }, function () {
            resource.onAfterMiddleware.dispatch(resource);
            _this.progress = Math.min(MAX_PROGRESS, _this.progress + resource.progressChunk);
            _this.onProgress.dispatch(_this, resource);
            if (resource.error)
                _this.onError.dispatch(resource.error, _this, resource);
            else
                _this.onLoad.dispatch(_this, resource);
            _this._resourcesParsing.splice(_this._resourcesParsing.indexOf(resource), 1);
            if (_this._queue.idle() && _this._resourcesParsing.length === 0)
                _this._onComplete();
        }, true);
    };
    Loader.use = function (fn, priority) {
        if (priority === void 0) { priority = Loader.DefaultMiddlewarePriority; }
        Loader._defaultMiddleware.push({ fn: fn, priority: priority });
        Loader._defaultMiddleware.sort(function (a, b) { return a.priority - b.priority; });
        return Loader;
    };
    Loader.DefaultMiddlewarePriority = 50;
    Loader._defaultMiddleware = [];
    return Loader;
}());

exports.AbstractLoadStrategy = AbstractLoadStrategy;
exports.AudioLoadStrategy = AudioLoadStrategy;
exports.ImageLoadStrategy = ImageLoadStrategy;
exports.Loader = Loader;
exports.MediaElementLoadStrategy = MediaElementLoadStrategy;
exports.Resource = Resource;
exports.VideoLoadStrategy = VideoLoadStrategy;
exports.XhrLoadStrategy = XhrLoadStrategy;

},{"type-signals":"10UOQ","parse-uri":"78cSo"}],"10UOQ":[function(require,module,exports) {
/*!
 * type-signals - v1.1.0
 * https://github.com/englercj/type-signals
 * Compiled Wed, 22 Apr 2020 17:58:58 UTC
 *
 * type-signals is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SignalBindingImpl = (function () {
    function SignalBindingImpl(fn, once, thisArg) {
        if (once === void 0) { once = false; }
        this.next = null;
        this.prev = null;
        this.owner = null;
        this.fn = fn;
        this.once = once;
        this.thisArg = thisArg;
    }
    SignalBindingImpl.prototype.detach = function () {
        if (this.owner === null)
            return false;
        this.owner.detach(this);
        return true;
    };
    SignalBindingImpl.prototype.dispose = function () {
        this.detach();
    };
    return SignalBindingImpl;
}());
var Signal = (function () {
    function Signal() {
        this._head = null;
        this._tail = null;
        this._filter = null;
    }
    Signal.prototype.handlers = function () {
        var node = this._head;
        var handlers = [];
        while (node) {
            handlers.push(node);
            node = node.next;
        }
        return handlers;
    };
    Signal.prototype.hasAny = function () {
        return !!this._head;
    };
    Signal.prototype.has = function (node) {
        return node.owner === this;
    };
    Signal.prototype.dispatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var node = this._head;
        if (!node)
            return false;
        if (this._filter && !this._filter.apply(this, args))
            return false;
        while (node) {
            if (node.once)
                this.detach(node);
            node.fn.apply(node.thisArg, args);
            node = node.next;
        }
        return true;
    };
    Signal.prototype.add = function (fn, thisArg) {
        if (thisArg === void 0) { thisArg = null; }
        return this._addSignalBinding(new SignalBindingImpl(fn, false, thisArg));
    };
    Signal.prototype.once = function (fn, thisArg) {
        if (thisArg === void 0) { thisArg = null; }
        return this._addSignalBinding(new SignalBindingImpl(fn, true, thisArg));
    };
    Signal.prototype.detach = function (node_) {
        var node = node_;
        if (node.owner !== this)
            return this;
        if (node.prev)
            node.prev.next = node.next;
        if (node.next)
            node.next.prev = node.prev;
        if (node === this._head) {
            this._head = node.next;
            if (node.next === null) {
                this._tail = null;
            }
        }
        else if (node === this._tail) {
            this._tail = node.prev;
            if (this._tail)
                this._tail.next = null;
        }
        node.owner = null;
        return this;
    };
    Signal.prototype.detachAll = function () {
        var node = this._head;
        if (!node)
            return this;
        this._head = null;
        this._tail = null;
        while (node) {
            node.owner = null;
            node = node.next;
        }
        return this;
    };
    Signal.prototype.filter = function (filter) {
        this._filter = filter;
    };
    Signal.prototype.proxy = function () {
        var _this = this;
        var signals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            signals[_i] = arguments[_i];
        }
        var fn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.dispatch.apply(_this, args);
        };
        for (var i = 0; i < signals.length; ++i) {
            signals[i].add(fn);
        }
        return this;
    };
    Signal.prototype._addSignalBinding = function (node_) {
        var node = node_;
        if (!this._head) {
            this._head = node;
            this._tail = node;
        }
        else {
            if (this._tail)
                this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        node.owner = this;
        return node;
    };
    return Signal;
}());

exports.Signal = Signal;

},{}],"78cSo":[function(require,module,exports) {
'use strict'

module.exports = function parseURI (str, opts) {
  opts = opts || {}

  var o = {
    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  }

  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str)
  var uri = {}
  var i = 14

  while (i--) uri[o.key[i]] = m[i] || ''

  uri[o.q.name] = {}
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2
  })

  return uri
}

},{}],"69b0v":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "bunny.848e211e.png"
},{"./bundle-url":"3seVR"}],"3seVR":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"2J46h":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "megaman.b39a55ef.png"
},{"./bundle-url":"3seVR"}],"1gNqp":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "map.b257823d.png"
},{"./bundle-url":"3seVR"}],"p3ilP":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "visitor1.90e6115f.ttf"
},{"./bundle-url":"3seVR"}],"737Je":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getResolution", function () {
  return getResolution;
});
const getResolution = (containerWidth, containerHeight, minWidth, minHeight) => {
  // If the container is smaller than the minWidth x minHeight, limit
  // to minWidth x minHeight.
  if (containerWidth <= minWidth || containerHeight <= minHeight) {
    return {
      width: minWidth,
      height: minHeight,
      factor: 1
    };
  }
  // If the container is the exact aspect ratio of the original resolution,
  // return a factor that reflects that.
  if (containerWidth / containerHeight === minWidth / minHeight) {
    const factor = containerWidth / minWidth;
    return {
      width: minWidth * factor,
      height: minHeight * factor,
      factor
    };
  }
  let factor = 1;
  let width = minWidth * factor;
  let height = minHeight * factor;
  // Lastly, limit scale factor to whole increments while smaller than
  // the container.
  while (width <= containerWidth && height <= containerHeight) {
    factor++;
    width = minWidth * factor;
    height = minHeight * factor;
  }
  factor--;
  return {
    width: minWidth * factor,
    height: minHeight * factor,
    factor
  };
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}]},["3YaxN","GVR7w"], "GVR7w", "parcelRequirec197")

//# sourceMappingURL=index.781f3c2d.js.map
