!function(){function t(t){return t&&t.__esModule?t.default:t}var e,r,o,n,i=function(){function t(t,e,r){void 0===e&&(e=!1),this.next=null,this.prev=null,this.owner=null,this.fn=t,this.once=e,this.thisArg=r}return t.prototype.detach=function(){return null!==this.owner&&(this.owner.detach(this),!0)},t.prototype.dispose=function(){this.detach()},t}(),s=function(){function t(){this._head=null,this._tail=null,this._filter=null}return t.prototype.handlers=function(){for(var t=this._head,e=[];t;)e.push(t),t=t.next;return e},t.prototype.hasAny=function(){return!!this._head},t.prototype.has=function(t){return t.owner===this},t.prototype.dispatch=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=this._head;if(!r)return!1;if(this._filter&&!this._filter.apply(this,t))return!1;for(;r;)r.once&&this.detach(r),r.fn.apply(r.thisArg,t),r=r.next;return!0},t.prototype.add=function(t,e){return void 0===e&&(e=null),this._addMiniSignalBinding(new i(t,!1,e))},t.prototype.once=function(t,e){return void 0===e&&(e=null),this._addMiniSignalBinding(new i(t,!0,e))},t.prototype.detach=function(t){return t.owner!==this?this:(t.prev&&(t.prev.next=t.next),t.next&&(t.next.prev=t.prev),t===this._head?(this._head=t.next,null===t.next&&(this._tail=null)):t===this._tail&&(this._tail=t.prev,this._tail&&(this._tail.next=null)),t.owner=null,this)},t.prototype.detachAll=function(){var t=this._head;if(!t)return this;for(this._head=null,this._tail=null;t;)t.owner=null,t=t.next;return this},t.prototype.filter=function(t){this._filter=t},t.prototype.proxy=function(){for(var t=this,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var o=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.dispatch.apply(t,e)},n=0;n<e.length;++n)e[n].add(o);return this},t.prototype._addMiniSignalBinding=function(t){return this._head?(this._tail&&(this._tail.next=t),t.prev=this._tail,this._tail=t):(this._head=t,this._tail=t),t.owner=this,t},t}(),a=function(t){this.config=t,this.onError=new s,this.onComplete=new s,this.onProgress=new s},h=function(t,e){return(h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};
/*!
 * type-signals - v1.0.3
 * https://github.com/englercj/type-signals
 * Compiled Sun, 15 Sep 2019 20:21:49 UTC
 *
 * type-signals is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */function u(t,e){function r(){this.constructor=t}h(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function l(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var o=Array(t),n=0;for(e=0;e<r;e++)for(var i=arguments[e],s=0,a=i.length;s<a;s++,n++)o[n]=i[s];return o}function p(t){var e="";if(0===t.indexOf("data:")){var r=t.indexOf("/");e=t.substring(r+1,t.indexOf(";",r))}else{var o=t.indexOf("?"),n=t.indexOf("#"),i=Math.min(o>-1?o:t.length,n>-1?n:t.length);e=(t=t.substring(0,i)).substring(t.lastIndexOf(".")+1)}return e.toLowerCase()}function d(t){throw new Error("Unexpected value. Should have been never.")}(r=e||(e={}))[r.Unknown=0]="Unknown",r[r.Buffer=1]="Buffer",r[r.Blob=2]="Blob",r[r.Json=3]="Json",r[r.Xml=4]="Xml",r[r.Image=5]="Image",r[r.Audio=6]="Audio",r[r.Video=7]="Video",r[r.Text=8]="Text",(n=o||(o={}))[n.NotStarted=0]="NotStarted",n[n.Loading=1]="Loading",n[n.Complete=2]="Complete";var c,f,_=function(t){function r(e,r){var o=t.call(this,e)||this;return o.elementType=r,o._boundOnLoad=o._onLoad.bind(o),o._boundOnError=o._onError.bind(o),o._boundOnTimeout=o._onTimeout.bind(o),o._element=o._createElement(),o._elementTimer=0,o}return u(r,t),r.prototype.load=function(){var t=this.config;t.crossOrigin&&(this._element.crossOrigin=t.crossOrigin);var e=t.sourceSet||[t.url];if(navigator.isCocoonJS)this._element.src=e[0];else for(var r=0;r<e.length;++r){var o=e[r],n=t.mimeTypes?t.mimeTypes[r]:void 0;n||(n=this.elementType+"/"+p(o));var i=document.createElement("source");i.src=o,i.type=n,this._element.appendChild(i)}this._element.addEventListener("load",this._boundOnLoad,!1),this._element.addEventListener("canplaythrough",this._boundOnLoad,!1),this._element.addEventListener("error",this._boundOnError,!1),this._element.load(),t.timeout&&(this._elementTimer=window.setTimeout(this._boundOnTimeout,t.timeout))},r.prototype.abort=function(){for(this._clearEvents();this._element.firstChild;)this._element.removeChild(this._element.firstChild);this._error(this.elementType+" load aborted by the user.")},r.prototype._createElement=function(){return this.config.loadElement?this.config.loadElement:document.createElement(this.elementType)},r.prototype._clearEvents=function(){clearTimeout(this._elementTimer),this._element.removeEventListener("load",this._boundOnLoad,!1),this._element.removeEventListener("canplaythrough",this._boundOnLoad,!1),this._element.removeEventListener("error",this._boundOnError,!1)},r.prototype._error=function(t){this._clearEvents(),this.onError.dispatch(t)},r.prototype._complete=function(){this._clearEvents();var t=e.Unknown;switch(this.elementType){case"audio":t=e.Audio;break;case"video":t=e.Video;break;default:d(this.elementType)}this.onComplete.dispatch(t,this._element)},r.prototype._onLoad=function(){this._complete()},r.prototype._onError=function(){this._error(this.elementType+" failed to load.")},r.prototype._onTimeout=function(){this._error(this.elementType+" load timed out.")},r}(a),m=function(t){function e(e){return t.call(this,e,"audio")||this}return u(e,t),e}(_),y=function(t){function r(){var e=null!==t&&t.apply(this,arguments)||this;return e._boundOnLoad=e._onLoad.bind(e),e._boundOnError=e._onError.bind(e),e._boundOnTimeout=e._onTimeout.bind(e),e._element=e._createElement(),e._elementTimer=0,e}return u(r,t),r.prototype.load=function(){var t=this.config;t.crossOrigin&&(this._element.crossOrigin=t.crossOrigin),this._element.src=t.url,this._element.addEventListener("load",this._boundOnLoad,!1),this._element.addEventListener("error",this._boundOnError,!1),t.timeout&&(this._elementTimer=window.setTimeout(this._boundOnTimeout,t.timeout))},r.prototype.abort=function(){this._clearEvents(),this._element.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",this._error("Image load aborted by the user.")},r.prototype._createElement=function(){return this.config.loadElement?this.config.loadElement:document.createElement("img")},r.prototype._clearEvents=function(){clearTimeout(this._elementTimer),this._element.removeEventListener("load",this._boundOnLoad,!1),this._element.removeEventListener("error",this._boundOnError,!1)},r.prototype._error=function(t){this._clearEvents(),this.onError.dispatch(t)},r.prototype._complete=function(){this._clearEvents(),this.onComplete.dispatch(e.Image,this._element)},r.prototype._onLoad=function(){this._complete()},r.prototype._onError=function(){this._error("Image failed to load.")},r.prototype._onTimeout=function(){this._error("Image load timed out.")},r}(a),g=function(t){function e(e){return t.call(this,e,"video")||this}return u(e,t),e}(_),v=!(!window.XDomainRequest||"withCredentials"in new XMLHttpRequest);function b(t){return t.toString().replace("object ","")}(f=c||(c={})).Default="text",f.Buffer="arraybuffer",f.Blob="blob",f.Document="document",f.Json="json",f.Text="text";var w=function(t){function r(){var e=null!==t&&t.apply(this,arguments)||this;return e._boundOnLoad=e._onLoad.bind(e),e._boundOnAbort=e._onAbort.bind(e),e._boundOnError=e._onError.bind(e),e._boundOnTimeout=e._onTimeout.bind(e),e._boundOnProgress=e._onProgress.bind(e),e._xhr=e._createRequest(),e._xhrType=c.Default,e}return u(r,t),r.prototype.load=function(){var t=this.config,e=p(t.url);"string"!=typeof t.xhrType&&(t.xhrType=this._determineXhrType(e));var r=this._xhr;this._xhrType=t.xhrType||c.Default,v?(r.timeout=t.timeout||5e3,r.onload=this._boundOnLoad,r.onerror=this._boundOnError,r.ontimeout=this._boundOnTimeout,r.onprogress=this._boundOnProgress,r.open("GET",t.url,!0),setTimeout((function(){r.send()}),0)):(r.open("GET",t.url,!0),t.timeout&&(r.timeout=t.timeout),t.xhrType===c.Json||t.xhrType===c.Document?r.responseType=c.Text:r.responseType=t.xhrType,r.addEventListener("load",this._boundOnLoad,!1),r.addEventListener("abort",this._boundOnAbort,!1),r.addEventListener("error",this._boundOnError,!1),r.addEventListener("timeout",this._boundOnTimeout,!1),r.addEventListener("progress",this._boundOnProgress,!1),r.send())},r.prototype.abort=function(){v?(this._clearEvents(),this._xhr.abort(),this._onAbort()):this._xhr.abort()},r.prototype._createRequest=function(){return v?new window.XDomainRequest:new XMLHttpRequest},r.prototype._determineXhrType=function(t){return r._xhrTypeMap[t]||c.Default},r.prototype._clearEvents=function(){v?(this._xhr.onload=null,this._xhr.onerror=null,this._xhr.ontimeout=null,this._xhr.onprogress=null):(this._xhr.removeEventListener("load",this._boundOnLoad,!1),this._xhr.removeEventListener("abort",this._boundOnAbort,!1),this._xhr.removeEventListener("error",this._boundOnError,!1),this._xhr.removeEventListener("timeout",this._boundOnTimeout,!1),this._xhr.removeEventListener("progress",this._boundOnProgress,!1))},r.prototype._error=function(t){this._clearEvents(),this.onError.dispatch(t)},r.prototype._complete=function(t,e){this._clearEvents(),this.onComplete.dispatch(t,e)},r.prototype._onLoad=function(){var t=this._xhr,r="",o=void 0===t.status?200:t.status;if(void 0!==t.responseType&&""!==t.responseType&&"text"!==t.responseType||(r=t.responseText),0===o&&(r.length>0||t.responseType===c.Buffer)?o=200:1223===o&&(o=204),200===100*Math.floor(o/100))switch(this._xhrType){case c.Buffer:this._complete(e.Buffer,t.response);break;case c.Blob:this._complete(e.Blob,t.response);break;case c.Document:this._parseDocument(r);break;case c.Json:this._parseJson(r);break;case c.Default:case c.Text:this._complete(e.Text,r);break;default:d(this._xhrType)}else this._error("["+t.status+"] "+t.statusText+": "+t.responseURL)},r.prototype._parseDocument=function(t){try{if(window.DOMParser){var r=(new DOMParser).parseFromString(t,"text/xml");this._complete(e.Xml,r)}else{var o=document.createElement("div");o.innerHTML=t,this._complete(e.Xml,o)}}catch(t){this._error("Error trying to parse loaded xml: "+t)}},r.prototype._parseJson=function(t){try{var r=JSON.parse(t);this._complete(e.Json,r)}catch(t){this._error("Error trying to parse loaded json: "+t)}},r.prototype._onAbort=function(){var t=this._xhr;this._error(b(t)+" Request was aborted by the user.")},r.prototype._onError=function(){var t=this._xhr;this._error(b(t)+" Request failed. Status: "+t.status+', text: "'+t.statusText+'"')},r.prototype._onTimeout=function(){var t=this._xhr;this._error(b(t)+" Request timed out.")},r.prototype._onProgress=function(t){t&&t.lengthComputable&&this.onProgress.dispatch(t.loaded/t.total)},r.setExtensionXhrType=function(t,e){t&&0===t.indexOf(".")&&(t=t.substring(1)),t&&(r._xhrTypeMap[t]=e)},r.ResponseType=c,r._xhrTypeMap={xhtml:c.Document,html:c.Document,htm:c.Document,xml:c.Document,tmx:c.Document,svg:c.Document,tsx:c.Document,gif:c.Blob,png:c.Blob,bmp:c.Blob,jpg:c.Blob,jpeg:c.Blob,tif:c.Blob,tiff:c.Blob,webp:c.Blob,tga:c.Blob,json:c.Json,text:c.Text,txt:c.Text,ttf:c.Buffer,otf:c.Buffer},r}(a);function x(t){var e=t;return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(null===e)throw new Error("Callback was already called.");var o=e;return e=null,o.apply(this,t)}}var E=function(){function t(t,e){if(void 0===e&&(e=1),this.worker=t,this.concurrency=e,this.workers=0,this.buffer=0,this.paused=!1,this._started=!1,this._tasks=[],this.onSaturated=new s,this.onUnsaturated=new s,this.onEmpty=new s,this.onDrain=new s,this.onError=new s,0===e)throw new Error("Concurrency must not be zero");this.buffer=e/4}return Object.defineProperty(t.prototype,"started",{get:function(){return this._started},enumerable:!0,configurable:!0}),t.prototype.reset=function(){this.onDrain.detachAll(),this.workers=0,this._started=!1,this._tasks=[]},t.prototype.push=function(t,e){this._insert(t,!1,e)},t.prototype.unshift=function(t,e){this._insert(t,!0,e)},t.prototype.process=function(){for(;!this.paused&&this.workers<this.concurrency&&this._tasks.length;){var t=this._tasks.shift();0===this._tasks.length&&this.onEmpty.dispatch(),this.workers+=1,this.workers===this.concurrency&&this.onSaturated.dispatch(),this.worker(t.data,x(this._next(t)))}},t.prototype.length=function(){return this._tasks.length},t.prototype.running=function(){return this.workers},t.prototype.idle=function(){return this._tasks.length+this.workers===0},t.prototype.pause=function(){!0!==this.paused&&(this.paused=!0)},t.prototype.resume=function(){if(!1!==this.paused){this.paused=!1;for(var t=1;t<=this.concurrency;t++)this.process()}},t.prototype.getTask=function(t){return this._tasks[t]},t.prototype._insert=function(t,e,r){var o=this;if(null!=r&&"function"!=typeof r)throw new Error("task callback must be a function");if(this._started=!0,null==t&&this.idle())setTimeout((function(){return o.onDrain.dispatch()}),1);else{var n={data:t,callback:r};e?this._tasks.unshift(n):this._tasks.push(n),setTimeout((function(){return o.process()}),1)}},t.prototype._next=function(t){var e=this;return function(r){for(var o=[],n=1;n<arguments.length;n++)o[n-1]=arguments[n];e.workers-=1,t.callback&&t.callback.apply(t,l([r],o)),r&&e.onError.dispatch(r,t.data),e.workers<=e.concurrency-e.buffer&&e.onUnsaturated.dispatch(),e.idle()&&e.onDrain.dispatch(),e.process()}},t}(),T=t((function(t,e){e=e||{};for(var r={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},o=r.parser[e.strictMode?"strict":"loose"].exec(t),n={},i=14;i--;)n[r.key[i]]=o[i]||"";return n[r.q.name]={},n[r.key[12]].replace(r.q.parser,(function(t,e,o){e&&(n[r.q.name][e]=o)})),n})),O=function(){function t(r,n){if(this.children=[],this.onStart=new s,this.onProgress=new s,this.onComplete=new s,this.onAfterMiddleware=new s,this.data=null,this.type=e.Unknown,this.error="",this.progressChunk=0,this._dequeue=function(){},this._onCompleteBinding=null,this._state=o.NotStarted,this.name=r,"string"!=typeof n.crossOrigin&&(n.crossOrigin=this._determineCrossOrigin(n.url)),n.strategy&&"function"!=typeof n.strategy)this._strategy=n.strategy,this._strategy.config=n;else{var i=n.strategy;i||(i=t._loadStrategyMap[p(n.url)]),i||(i=t._defaultLoadStrategy),this._strategy=new i(n)}this._strategy.onError.add(this._error,this),this._strategy.onComplete.add(this._complete,this),this._strategy.onProgress.add(this._progress,this)}return t.setDefaultLoadStrategy=function(e){t._defaultLoadStrategy=e},t.setLoadStrategy=function(e,r){e&&0===e.indexOf(".")&&(e=e.substring(1)),e&&(t._loadStrategyMap[e]=r)},Object.defineProperty(t.prototype,"url",{get:function(){return this._strategy.config.url},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isLoading",{get:function(){return this._state===o.Loading},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isComplete",{get:function(){return this._state===o.Complete},enumerable:!0,configurable:!0}),t.prototype.abort=function(){this._strategy.abort()},t.prototype.load=function(){this._state=o.Loading,this.onStart.dispatch(this),this._strategy.load()},t.prototype._error=function(t){this._state=o.Complete,this.error=t,this.onComplete.dispatch(this)},t.prototype._complete=function(t,e){this._state=o.Complete,this.type=t,this.data=e,this.onComplete.dispatch(this)},t.prototype._progress=function(t){this.onProgress.dispatch(this,t)},t.prototype._determineCrossOrigin=function(e,r){if(void 0===r&&(r=window.location),0===e.indexOf("data:")||0===e.indexOf("javascript:"))return"";if(window.origin!==window.location.origin)return"anonymous";t._tempAnchor||(t._tempAnchor=document.createElement("a")),t._tempAnchor.href=e;var o=T(t._tempAnchor.href,{strictMode:!0}),n=!o.port&&""===r.port||o.port===r.port,i=o.protocol?o.protocol+":":"";return o.host===r.hostname&&n&&i===r.protocol?"":"anonymous"},t._tempAnchor=null,t._defaultLoadStrategy=w,t._loadStrategyMap={gif:y,png:y,bmp:y,jpg:y,jpeg:y,tif:y,tiff:y,webp:y,tga:y,svg:y,"svg+xml":y,mp3:m,ogg:m,wav:m,mp4:g,webm:g,mov:g},t}();var L=/(#[\w-]+)?$/,A=function(){function t(e,r){void 0===e&&(e=""),void 0===r&&(r=10),this.progress=0,this.loading=!1,this.defaultQueryString="",this.resources={},this.onError=new s,this.onLoad=new s,this.onStart=new s,this.onComplete=new s,this.onProgress=new s,this._baseUrl="",this._urlResolvers=[],this._middleware=[],this._resourcesParsing=[],this._boundLoadResource=this._loadResource.bind(this),this.baseUrl=e,this._queue=new E(this._boundLoadResource,r),this._queue.pause(),this._middleware=t._defaultMiddleware.slice()}return Object.defineProperty(t.prototype,"baseUrl",{get:function(){return this._baseUrl},set:function(t){for(;t.length&&"/"===t.charAt(t.length-1);)t=t.slice(0,-1);this._baseUrl=t},enumerable:!0,configurable:!0}),t.prototype.add=function(t,e){if(Array.isArray(t)){for(var r=0;r<t.length;++r)this.add(t[r]);return this}var o="",n="",i=this._baseUrl,s={url:""};if("object"==typeof t?(o=t.url,n=t.name||t.url,i=t.baseUrl||i,s=t):(n=t,o="string"==typeof e?e:n),!o)throw new Error("You must specify the `url` property.");if(this.loading&&!s.parentResource)throw new Error("Cannot add root resources while the loader is running.");if(this.resources[n])throw new Error('Resource named "'+n+'" already exists.');o=this._prepareUrl(o,i),s.url=o;var a=new O(n,s);if(this.resources[n]=a,"function"==typeof s.onComplete&&a.onAfterMiddleware.once(s.onComplete),this.loading){var h=s.parentResource,u=[];for(r=0;r<h.children.length;++r)h.children[r].isComplete||u.push(h.children[r]);var l=h.progressChunk*(u.length+1)/(u.length+2);h.children.push(a),h.progressChunk=l;for(r=0;r<u.length;++r)u[r].progressChunk=l;a.progressChunk=l}return this._queue.push(a),this},t.prototype.use=function(e,r){return void 0===r&&(r=t.DefaultMiddlewarePriority),this._middleware.push({fn:e,priority:r}),this._middleware.sort((function(t,e){return t.priority-e.priority})),this},t.prototype.reset=function(){for(var t in this.progress=0,this.loading=!1,this._queue.reset(),this._queue.pause(),this.resources){var e=this.resources[t];e&&(e._onCompleteBinding&&e._onCompleteBinding.detach(),e.isLoading&&e.abort())}return this.resources={},this},t.prototype.load=function(t){if("function"==typeof t&&this.onComplete.once(t),this.loading)return this;if(this._queue.idle())this._onStart(),this._onComplete();else{for(var e=100/this._queue.length(),r=0;r<this._queue.length();++r)this._queue.getTask(r).data.progressChunk=e;this._onStart(),this._queue.resume()}return this},Object.defineProperty(t.prototype,"concurrency",{get:function(){return this._queue.concurrency},set:function(t){this._queue.concurrency=t},enumerable:!0,configurable:!0}),t.prototype.addUrlResolver=function(t){return this._urlResolvers.push(t),this},t.prototype._prepareUrl=function(t,e){var r=T(t,{strictMode:!0});if(this._urlResolvers.forEach((function(e){t=e(t,r),r=T(t,{strictMode:!0})})),r.protocol||0===t.indexOf("//")||(t=e.length&&"/"!==t.charAt(0)?e+"/"+t:e+t),this.defaultQueryString){var o=L.exec(t);if(o){var n=o[0];-1!==(t=t.substr(0,t.length-n.length)).indexOf("?")?t+="&"+this.defaultQueryString:t+="?"+this.defaultQueryString,t+=n}}return t},t.prototype._loadResource=function(t,e){t._dequeue=e,t._onCompleteBinding=t.onComplete.once(this._onLoad,this),t.load()},t.prototype._onStart=function(){this.progress=0,this.loading=!0,this.onStart.dispatch(this)},t.prototype._onComplete=function(){this.progress=100,this.loading=!1,this.onComplete.dispatch(this,this.resources)},t.prototype._onLoad=function(t){var e=this;t._onCompleteBinding=null,this._resourcesParsing.push(t),t._dequeue(),function(t,e,r,o){void 0===o&&(o=!1);var n=0,i=t.length;!function s(a){a||n===i?r&&r(a):o?setTimeout((function(){return e(t[n++],s)}),1):e(t[n++],s)}()}(this._middleware,(function(r,o){r.fn.call(e,t,o)}),(function(){t.onAfterMiddleware.dispatch(t),e.progress=Math.min(100,e.progress+t.progressChunk),e.onProgress.dispatch(e,t),t.error?e.onError.dispatch(t.error,e,t):e.onLoad.dispatch(e,t),e._resourcesParsing.splice(e._resourcesParsing.indexOf(t),1),e._queue.idle()&&0===e._resourcesParsing.length&&e._onComplete()}),!0)},t.use=function(e,r){return void 0===r&&(r=t.DefaultMiddlewarePriority),t._defaultMiddleware.push({fn:e,priority:r}),t._defaultMiddleware.sort((function(t,e){return t.priority-e.priority})),t},t.DefaultMiddlewarePriority=50,t._defaultMiddleware=[],t}(),C=384,k=216,P=new A,S=document.getElementById("canvas"),B=S.getContext("2d");S.width=C,S.height=k,B.imageSmoothingEnabled=!1,S.style.width="".concat(C,"px"),S.style.height="".concat(k,"px");var q={a:1,b:0,c:0,d:1,e:0,f:0},M=function(){var t=window,e=t.innerWidth,r=t.innerHeight,o=function(t,e,r,o){if(t<=r||e<=o)return{width:r,height:o,factor:1};if(t/e==r/o){var n=t/r;return{width:r*n,height:o*n,factor:n}}for(var i=1,s=r*i,a=o*i;s<=t&&a<=e;)s=r*++i,a=o*i;return{width:r*--i,height:o*i,factor:i}}(e,r,C,k).factor;S.style.transform="scale(".concat(o,")"),S.style.left="".concat(e/2-S.width/2,"px"),S.style.top="".concat(r/2-S.height/2,"px")};M(),window.addEventListener("resize",M);var D=t("/bunny.24c514f5.png");P.add(D).load((function(t,e){var r=e[D];if(null==r)throw new Error("Could not load ".concat(D));var o={pos:{x:r.data.width/2,y:S.height/2-r.data.height/2},dir:{x:1,y:0},lastPos:{x:r.data.width/2,y:S.height/2-r.data.height/2},vel:{x:20,y:0},sprite:r.data},n=1e3/60,i=performance.now(),s=0;requestAnimationFrame((function t(e){for(s+=Math.min(1e3,e-i);s>=n;)o.lastPos.x=o.pos.x,o.lastPos.y=o.pos.y,o.pos.x+=o.vel.x/n*o.dir.x,o.pos.y+=o.vel.y/n*o.dir.y,o.pos.x+o.sprite.width>=C?(o.pos.x=C-o.sprite.width,o.dir.x*=-1):o.pos.x<=0&&(o.pos.x=0,o.dir.x*=-1),s-=n;var r=s/n,a=o.lastPos.x+(o.pos.x-o.lastPos.x)*r,h=o.lastPos.y+(o.pos.y-o.lastPos.y)*r;B.clearRect(0,0,S.width,S.height),B.strokeStyle="red",B.lineWidth=1,B.beginPath(),B.moveTo(19.5,0),B.lineTo(19.5,k),B.moveTo(39.5,0),B.lineTo(39.5,k),B.moveTo(59.5,0),B.lineTo(59.5,k),B.moveTo(79.5,0),B.lineTo(79.5,k),B.stroke(),B.translate(0|a,0|h),B.drawImage(o.sprite,0,0),B.setTransform(q),i=e,requestAnimationFrame(t)}))}))}();