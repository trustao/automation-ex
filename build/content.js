!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=16)}([function(t,e,n){t.exports=n(10)},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){function n(t,e,n,r,a,o,c){try{var i=t[o](c),s=i.value}catch(t){return void n(t)}i.done?e(s):Promise.resolve(s).then(r,a)}t.exports=function(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var c=t.apply(e,r);function i(t){n(c,a,o,i,s,"next",t)}function s(t){n(c,a,o,i,s,"throw",t)}i(void 0)}))}}},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){var r=n(11),a=n(1);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?a(t):e}},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var r=n(12);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){var r=n(13),a=n(14),o=n(15);t.exports=function(t){return r(t)||a(t)||o()}},function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function s(t,e,n,r){var a=e&&e.prototype instanceof g?e:g,o=Object.create(a.prototype),c=new C(r||[]);return o._invoke=function(t,e,n){var r=l;return function(a,o){if(r===h)throw new Error("Generator is already running");if(r===p){if("throw"===a)throw o;return L()}for(n.method=a,n.arg=o;;){var c=n.delegate;if(c){var i=_(c,n);if(i){if(i===d)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var s=u(t,e,n);if("normal"===s.type){if(r=n.done?p:f,s.arg===d)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=p,n.method="throw",n.arg=s.arg)}}}(t,n,c),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l="suspendedStart",f="suspendedYield",h="executing",p="completed",d={};function g(){}function v(){}function b(){}var m={};m[o]=function(){return this};var y=Object.getPrototypeOf,k=y&&y(y(G([])));k&&k!==n&&r.call(k,o)&&(m=k);var x=b.prototype=g.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function S(t){var e;this._invoke=function(n,a){function o(){return new Promise((function(e,o){!function e(n,a,o,c){var i=u(t[n],t,a);if("throw"!==i.type){var s=i.arg,l=s.value;return l&&"object"==typeof l&&r.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,c)}),(function(t){e("throw",t,o,c)})):Promise.resolve(l).then((function(t){s.value=t,o(s)}),(function(t){return e("throw",t,o,c)}))}c(i.arg)}(n,a,e,o)}))}return e=e?e.then(o,o):o()}}function _(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,_(t,n),"throw"===n.method))return d;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=u(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,d;var o=a.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,d):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,d)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,c=function n(){for(;++a<t.length;)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return c.next=c}}return{next:L}}function L(){return{value:e,done:!0}}return v.prototype=x.constructor=b,b.constructor=v,b[i]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},w(S.prototype),S.prototype[c]=function(){return this},t.AsyncIterator=S,t.async=function(e,n,r,a){var o=new S(s(e,n,r,a));return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},w(x),x[i]="Generator",x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=G,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return i.type="throw",i.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var c=this.tryEntries[o],i=c.completion;if("root"===c.tryLoc)return a("end");if(c.tryLoc<=this.prev){var s=r.call(c,"catchLoc"),u=r.call(c,"finallyLoc");if(s&&u){if(this.prev<c.catchLoc)return a(c.catchLoc,!0);if(this.prev<c.finallyLoc)return a(c.finallyLoc)}else if(s){if(this.prev<c.catchLoc)return a(c.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return a(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;E(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:G(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=r=function(t){return n(t)}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},r(e)}t.exports=r},function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(2),c=n.n(o),i=n(4),s=n.n(i),u=n(5),l=n.n(u),f=n(6),h=n.n(f),p=n(7),d=n.n(p),g=n(1),v=n.n(g),b=n(8),m=n.n(b),y=n(3),k=n.n(y),x=n(9),w=n.n(x);function S(){var t;(t=console).log.apply(t,arguments)}var _=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;return new Promise((function(e){setTimeout((function(){e()}),t)}))},T={READY:"READY",RUNNING:"RUNNING",STOP:"STOP",PAUSED:"PAUSED"},E=0,C=function(t){function e(){var t;return s()(this,e),t=h()(this,d()(e).call(this)),k()(v()(t),"continue",c()(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.__changeStatus(T.RUNNING),!t.currentChildTask){e.next=4;break}return e.next=4,new Promise((function(e){t.currentChildTask.once("taskEnd",(function(){t.currentChildTask=null,t.off("changeStatus",t.changeHandlerOnChild),e()}))}));case 4:n=!0;case 5:if(!n){e.next=11;break}return e.next=8,t.runStep();case 8:n=e.sent,e.next=5;break;case 11:t.currentChildTask||t._runtimeTask.length?t.emit("taskPaused"):(t.__changeStatus(T.STOP),t.emit("taskEnd"));case 12:case"end":return e.stop()}}),e)})))),k()(v()(t),"checkAppRunning",c()(a.a.mark((function e(){var n,r,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.currentChildTask?t.currentChildTask:v()(t),r=n.stepCount,e.next=4,_();case 4:o=10;case 5:if(!o){e.next=17;break}if(S("checkRunning",n.stepCount,r),n.stepCount===r){e.next=12;break}return o=0,e.abrupt("return",!0);case 12:return e.next=14,_();case 14:o--;case 15:e.next=5;break;case 17:return e.abrupt("return",n.stepCount!==r);case 18:case"end":return e.stop()}}),e)})))),k()(v()(t),"run",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t._runtimeTask=w()(t.taskList),e.next=3,t.continue();case 3:case"end":return e.stop()}}),e)})))),k()(v()(t),"runStep",c()(a.a.mark((function n(){var r;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.stepCount++,t.status===T.RUNNING){n.next=3;break}return n.abrupt("return",!1);case 3:if(!(r=t._runtimeTask.shift())){n.next=16;break}if(!(r instanceof e)){n.next=11;break}return n.next=8,t.connectChildTask(r);case 8:return n.abrupt("return",n.sent);case 11:return n.next=13,r();case 13:return n.abrupt("return",!0);case 14:n.next=17;break;case 16:return n.abrupt("return",!1);case 17:case"end":return n.stop()}}),n)})))),k()(v()(t),"connectChildTask",function(){var e=c()(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.currentChildTask=n,t.on("changeStatus",t.changeHandlerOnChild),n.once("taskEnd",(function(){t.currentChildTask=null,t.off("changeStatus",t.changeHandlerOnChild),t.__childResolveFn(!0)})),n.run(),e.next=6,new Promise((function(e){t.__childResolveFn=e}));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),k()(v()(t),"changeHandlerOnChild",(function(e,n){switch(e){case T.PAUSED:t.currentChildTask.__changeStatus(e);break;case T.STOP:t.currentChildTask.__changeStatus(e),t.__childResolveFn(!1),t.off("changeStatus",t.changeHandlerOnChild),t.currentChildTask=null;break;case T.RUNNING:t.currentChildTask.status===T.PAUSED&&(t.currentChildTask.__changeStatus(e),t.currentChildTask.continue())}})),t.taskList=[],t.status=T.READY,t.stepCount=0,t.id=E++,t}return m()(e,t),l()(e,[{key:"__changeStatus",value:function(t){if(t!==this.status){var e=this.status;this.status=t,this.emit("changeStatus",t,e)}}},{key:"addStep",value:function(t){this.status===T.READY?this.taskList.push(t):console.error("任务已进行，无法添加")}},{key:"addAssertStep",value:function(t){var e=this;if(this.status===T.READY){var n=function(){var n=c()(a.a.mark((function n(){var r;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t();case 2:r=n.sent,e._runtimeTask.unshift(r);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();this.taskList.push(n)}else console.error("任务已进行，无法添加")}},{key:"clearStep",value:function(){this.stop(),this.taskList=[],this.__changeStatus(T.READY)}},{key:"stop",value:function(){this.__changeStatus(T.STOP),this._runtimeTask=[],this.currentChildTask=null}},{key:"paused",value:function(){this.__changeStatus(T.PAUSED)}}]),e}(function(){function t(){s()(this,t),this._events={}}return l()(t,[{key:"on",value:function(t,e){var n=this;if(Array.isArray(t))t.forEach((function(t){n.on(t,e)}));else{if("string"!=typeof t)throw new Error("[错误] events name must be a string");this._events[t]?this._events[t].push(e):this._events[t]=[e]}}},{key:"emit",value:function(t){for(var e=this,n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];if(Array.isArray(t))t.forEach((function(t){e.emit.apply(e,[t].concat(r))}));else{if("string"!=typeof t)throw new Error("[错误] events name must be a string");this._events[t]&&this._events[t].length&&this._events[t].forEach((function(t){t.apply(void 0,r)}))}}},{key:"off",value:function(t,e){var n=this;if(Array.isArray(t))t.forEach((function(t){n.off(t,e)}));else{if("string"!=typeof t)throw new Error("[错误] events name must be a string");if(this._events[t])if(e){var r=this._events[t].indexOf(e);r>=0&&this._events[t].splice(r,1)}else this._events[t]=null}}},{key:"once",value:function(t,e){var n=this;if("string"!=typeof t)throw new Error("[错误] events name must be a string");this.on(t,(function r(){e.apply(void 0,arguments),n.off(t,r)}))}}]),t}()),G=function(t){function e(t){var n;return s()(this,e),n=h()(this,d()(e).call(this,t)),k()(v()(n),"runCycle",c()(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.emit("cycleStart"),e=!0;case 2:if(!e){t.next=8;break}return t.next=5,n.runStep();case 5:e=t.sent,t.next=2;break;case 8:if(n._runtimeTask.length||n.emit("cycleEnd"),n.status!==T.RUNNING){t.next=14;break}return n._runtimeTask=w()(n.taskList),t.abrupt("return",n.runCycle);case 14:return S("暂停"),t.abrupt("return",!1);case 16:case"end":return t.stop()}}),t)})))),k()(v()(n),"continue",c()(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.__changeStatus(T.RUNNING),!n.currentChildTask){t.next=4;break}return t.next=4,new Promise((function(t){n.currentChildTask.once("taskEnd",(function(){n.currentChildTask=null,n.off("changeStatus",n.changeHandlerOnChild),t()}))}));case 4:e=n.runCycle;case 5:if(!e){t.next=11;break}return t.next=8,e();case 8:e=t.sent,t.next=5;break;case 11:S("停止");case 12:case"end":return t.stop()}}),t)})))),n}return m()(e,t),l()(e,[{key:"stopOnCurrentCycleEnd",value:function(){var t=this;this.once("cycleEnd",(function(){t.__changeStatus(T.STOP)}))}}]),e}(C),L="_tr_automation";function N(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;return new Promise((function(r,a){var o=0;!function t(c){o>n&&a('异常：check element "'.concat(c,'" error'));var i=e?e.find(c):$(c);i&&i.length?r(i):(o++,setTimeout((function(){t(c)}),300))}(t)}))}new(function(t){function e(){var t;return s()(this,e),t=h()(this,d()(e).call(this)),k()(v()(t),"refreshShopStock",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#refreshShopStock",t.iframeDoc);case 2:return e.sent.click(),e.next=6,_();case 6:case"end":return e.stop()}}),e)})))),k()(v()(t),"checkFirstCheckbox",c()(a.a.mark((function e(){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#shopGoodsList_shopGoods-table",t.iframeDoc);case 2:if(n=e.sent,r=n.find("tbody tr:first-child td:nth-child(9) input"),!r.prop("disabled")){e.next=9;break}return e.abrupt("return",t.openJDSend());case 9:return r.click(),e.abrupt("return",t.submitTag);case 11:case"end":return e.stop()}}),e)})))),k()(v()(t),"getTagGoodsList",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.selectSearchCondition(t.iframeDoc);case 2:return e.next=4,t.triggerSelect("select[name=shopGoodsList_shopGoods-table_length]",100,t.iframeDoc);case 4:return e.next=6,_(3e3);case 6:if(!(t.data.page>1)){e.next=12;break}return e.next=9,N("#shopGoodsList_shopGoods-table_paginate a:contains(".concat(t.data.page,")"),t.iframeDoc);case 9:e.sent[0].click(),console.log("page:",t.data.page);case 12:case"end":return e.stop()}}),e)})))),k()(v()(t),"clickSearch",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#shopGoodsList_queryShopGoodsForm",t.iframeDoc);case 2:return e.sent.click(),e.next=6,_();case 6:case"end":return e.stop()}}),e)})))),k()(v()(t),"checkCheckbox",c()(a.a.mark((function e(){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#shopGoodsList_shopGoods-table",t.iframeDoc);case 2:return n=e.sent,r=n.find("td:nth-child(9) input"),console.log(r),r.click(),e.next=8,_();case 8:case"end":return e.stop()}}),e)})))),k()(v()(t),"submitTag",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.iframeDoc.find("td:nth-child(9) input").filter((function(t,e){return e.checked})).length){e.next=7;break}return e.next=4,_(5e3);case 4:return e.next=6,t.clickSearch();case 6:return e.abrupt("return");case 7:return t.iframeDoc.find("#shopGoodsList_handleJdDeliver").click(),e.next=10,_();case 10:return e.next=12,N('.modal-footer button:contains("确认")',t.iframeDoc);case 12:return e.sent[0].click(),e.next=16,_();case 16:return e.next=18,N('#lblSysInfo:contains("操作成功")',t.iframeDoc,100);case 18:return e.sent?S("成功"):(S("失败",t.currentGoodsNo),t.markError()),e.next=22,_();case 22:t.iframeDoc.find("#sysAlart")[0].click();case 23:case"end":return e.stop()}}),e)})))),k()(v()(t),"checkRule",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#rulesItemTable input[value=".concat(t.data.ruleNo,"]"),t.iframeDoc);case 2:if(e.sent.length){e.next=6;break}return S("错误"),e.abrupt("return");case 6:return e.next=8,t.submitRules();case 8:case"end":return e.stop()}}),e)})))),k()(v()(t),"submitRules",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#submitRules",t.iframeDoc);case 2:return e.sent[0].click(),e.next=6,_();case 6:return e.next=8,N('.modal-footer button:contains("确认")',t.iframeDoc);case 8:return e.sent[0].click(),e.next=12,_();case 12:return e.prev=12,e.next=15,N('#lblSysInfo:contains("操作成功！")',t.iframeDoc,100);case 15:S("成功",t.currentGoodsNo),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(12),S("失败",t.currentGoodsNo),t.markError();case 22:t.currentGoodsNo="",t.iframeDoc.find("#sysAlart").click();case 24:case"end":return e.stop()}}),e,null,[[12,18]])})))),k()(v()(t),"goBaseInfoPage",c()(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N("#top_104202");case 2:return t.sent.click(),t.next=6,_();case 6:case"end":return t.stop()}}),t)})))),k()(v()(t),"goShopManage",c()(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N("#9250");case 2:return t.sent[0].click(),t.next=6,_(1e3);case 6:case"end":return t.stop()}}),t)})))),k()(v()(t),"getIframe",c()(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#mainIframe");case 2:n=e.sent,t.iframeDoc=$(n[0].contentDocument);case 4:case"end":return e.stop()}}),e)})))),k()(v()(t),"searchGoods",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.selectSearchCondition(t.iframeDoc);case 2:return e.next=4,N("#shopGoodsList_queryShopGoodsForm",t.iframeDoc);case 4:return e.sent.click(),e.next=8,_();case 8:if(!(t.data.page>1)){e.next=16;break}return e.next=11,N("#shopGoodsList_shopGoods-table_paginate a:contains(".concat(t.data.page,")"),t.iframeDoc);case 11:return e.sent[0].click(),console.log("page:",t.data.page),e.next=16,_(1e3);case 16:case"end":return e.stop()}}),e)})))),k()(v()(t),"goRulePage",c()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.clickGoodsModify(t.iframeDoc);case 2:return e.next=4,N("#editNewCombinationRule",t.iframeDoc);case 4:return e.sent.click(),e.next=8,_();case 8:case"end":return e.stop()}}),e)})))),k()(v()(t),"triggerSelect",function(){var t=c()(a.a.mark((function t(e,n,r){var o,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N("".concat(e,' option:contains("').concat(n,'")'),r,20);case 2:return o=t.sent,t.next=5,N("".concat(e),r,20);case 5:(c=t.sent)[0].value=o.val(),c[0].dispatchEvent(new Event("change"));case 8:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()),k()(v()(t),"writeRules",c()(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.iframeDoc,e.next=3,N("#rulesEdit_materialShopGoodsNo",n);case 3:return e.sent.val(t.data.ruleNo),n.find("#rulesEdit_num").val(t.data.ruleCount),n.find("#rulesEdit-rulesItem-add")[0].click(),e.next=9,_();case 9:case"end":return e.stop()}}),e)})))),k()(v()(t),"clickGoodsModify",function(){var e=c()(a.a.mark((function e(n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("#shopGoodsList_shopGoods-table",n);case 2:return r=e.sent,t.selectNoErrorGoodsTr(r).find('a:contains("修改")')[0].click(),e.next=7,_();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),k()(v()(t),"selectSearchCondition",function(){var e=c()(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.data.sybValue){e.next=5;break}return e.next=3,t.triggerSelect("#shopGoodsList_deptId",t.data.sybValue,n);case 3:return e.next=5,_();case 5:if(!t.data.shopName){e.next=10;break}return e.next=8,t.triggerSelect("#shopGoodsList_shopId",t.data.shopName,n);case 8:return e.next=10,_();case 10:return e.next=12,t.triggerSelect("#shopGoodsList_jdDeliver","否",n);case 12:return e.next=14,t.triggerSelect("#shopGoodsList_isCombination",t.isTagTask?"是":"否",n);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.data={sybValue:"天津中天启鸿网络科技有限公司",shopName:"飓风合新专卖店",ruleNo:"CSG4418118164142",ruleCount:1,page:1},t.errorSpu=[],t.init(),t}return m()(e,t),l()(e,[{key:"init",value:function(){this.appendController(),this.listenStatusChange(),this.catchError()}},{key:"combinationTask",value:function(){this.isTagTask=!1,this.addStep(this.goBaseInfoPage),this.addStep(this.createRepeatTask())}},{key:"createRepeatTask",value:function(){var t=new G;return t.addStep(this.goShopManage),t.addStep(this.getIframe),t.addStep(this.searchGoods),t.addStep(this.goRulePage),t.addStep(this.writeRules),t.addStep(this.checkRule),t}},{key:"tagSingleTask",value:function(){this.isTagTask=!0,this.addStep(this.goBaseInfoPage),this.addStep(this.createSingleTask())}},{key:"createSingleTask",value:function(){var t=new G;return t.addStep(this.goShopManage),t.addStep(this.getIframe),t.addStep(this.getTagGoodsList),t.addAssertStep(this.checkFirstCheckbox),t}},{key:"tagTask",value:function(){this.isTagTask=!0,this.addStep(this.goBaseInfoPage),this.addStep(this.goShopManage),this.addStep(this.getIframe),this.addStep(this.getTagGoodsList),this.addStep(this.createTagTask())}},{key:"createTagTask",value:function(){var t=new G;return t.addStep(this.checkCheckbox),t.addStep(this.submitTag),t.addStep(_.bind(null,5e3)),t}},{key:"openJDSend",value:function(){var t=new C;return t.addStep(this.goRulePage),t.addStep(this.refreshShopStock),t.addStep(this.submitRules),t}},{key:"selectNoErrorGoodsTr",value:function(t){return this.getTr(t.find("tbody tr:first-child"))}},{key:"getTr",value:function(t){if(!t.length)throw new Error("列表无数据");var e=t.find("td:nth-child(6)").text(),n=this.errorSpu.find((function(t){return t.no===e}));return n&&n.count>2?(this.updateErrorLog(),this.getTr(t.next())):(this.currentGoodsNo=e,t)}},{key:"updateErrorLog",value:function(){$("#".concat(L,"-log")).remove(),$("body").append('\n      <div id="'.concat("".concat(L,"-log"),'">\n        ',this.errorSpu.filter((function(t){return t.count>=3})).reduce((function(t,e){return t+"<p>".concat(e.no,", 重试3次， 失败</p>")}),""),"   \n      </div> \n    "))}},{key:"catchError",value:function(){var t=this;window.addEventListener("unhandledrejection",(function(e){$(".".concat(L,"-controller")).css({background:"rgba(255,12,17,0.3)","pointer-events":"none"}),t.checkAppRunning().then((function(e){e||(t.currentGoodsNo&&t.markError(),N(".modal:visible",t.iframeDoc,100).then((function(e){e&&e.click(),t.stop(),t.run(),$(".".concat(L,"-controller")).css({background:"rgba(0,255,27,0.3)","pointer-events":"auto"})})).catch((function(e){t.stop(),t.run(),$(".".concat(L,"-controller")).css({background:"rgba(0,255,27,0.3)","pointer-events":"auto"})})))}))}))}},{key:"markError",value:function(){var t=this;if(this.currentGoodsNo){var e=this.errorSpu.find((function(e){return e.no===t.currentGoodsNo}));e?e.count++:this.errorSpu.push({no:this.currentGoodsNo,count:1}),console.log(this.errorSpu),this.currentGoodsNo=""}}},{key:"listenStatusChange",value:function(){var t=this;this.on("changeStatus",(function(e){switch(e){case"READY":t.changeFormDisabledStatus(!1),$("#".concat(L,"-start")).attr("disabled",!1),$("#".concat(L,"-tag-run")).attr("disabled",!1),$("#".concat(L,"-tag-single-run")).attr("disabled",!1),$("#".concat(L,"-paused")).attr("disabled",!0),$("#".concat(L,"-stop")).attr("disabled",!0),$("#".concat(L,"-continue")).attr("disabled",!0),$(".".concat(L,"-controller")).css("background","rgba(0, 0, 0, .3)");break;case"RUNNING":t.changeFormDisabledStatus(!0),$("#".concat(L,"-start")).attr("disabled",!0),$("#".concat(L,"-tag-run")).attr("disabled",!0),$("#".concat(L,"-tag-single-run")).attr("disabled",!0),$("#".concat(L,"-paused")).attr("disabled",!1),$("#".concat(L,"-stop")).attr("disabled",!1),$("#".concat(L,"-continue")).attr("disabled",!0),$(".".concat(L,"-controller")).css("background","rgba(0,255,27,0.3)");break;case"PAUSED":t.changeFormDisabledStatus(!1),$("#".concat(L,"-start")).attr("disabled",!0),$("#".concat(L,"-tag-run")).attr("disabled",!0),$("#".concat(L,"-tag-single-run")).attr("disabled",!0),$("#".concat(L,"-paused")).attr("disabled",!0),$("#".concat(L,"-stop")).attr("disabled",!1),$("#".concat(L,"-continue")).attr("disabled",!1),$(".".concat(L,"-controller")).css("background","rgba(0, 0, 0, .3)");break;case"STOP":t.changeFormDisabledStatus(!1),$("#".concat(L,"-start")).attr("disabled",!1),$("#".concat(L,"-tag-run")).attr("disabled",!1),$("#".concat(L,"-tag-single-run")).attr("disabled",!1),$("#".concat(L,"-paused")).attr("disabled",!0),$("#".concat(L,"-stop")).attr("disabled",!0),$("#".concat(L,"-continue")).attr("disabled",!0),$(".".concat(L,"-controller")).css("background","rgba(0, 0, 0, .3)")}}))}},{key:"appendController",value:function(){var t=this;$("body").append($('\n      <div class="'.concat(L,'-controller">\n       <h3>controller</h3>\n       <div>\n         <button id="').concat(L,'-start">\n            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>\n            开始\n         </button>\n         <button id="').concat(L,'-stop">停止</button>\n         \n         <button id="').concat(L,'-continue">继续</button>\n         <button id="').concat(L,'-paused">暂停</button>\n       </div>\n       <div class="').concat(L,'-form">\n         <label for="').concat(L,'-sybValue">事业部<input type="text" id="').concat(L,'-sybValue"></label><br>\n         <label for="').concat(L,'-shopName">店铺名称<input type="text" id="').concat(L,'-shopName"></label><br>\n         <label for="').concat(L,'-ruleNo">编码<input type="text" id="').concat(L,'-ruleNo"></label><br>\n         <label for="').concat(L,'-ruleCount">数量<input type="text" id="').concat(L,'-ruleCount"></label><br>\n         <label for="').concat(L,'-page">页码\n           <select id="').concat(L,'-page">\n               <option value="1">1</option>      \n               <option value="2">2</option>      \n               <option value="3">3</option>      \n               <option value="4">4</option>      \n               <option value="5">5</option>      \n           </select>\n         </label><br>\n         <p style="font-size: 12px;color: #888;">修改后请点击确认再开始任务。</p>\n         <button id="').concat(L,'-submit">确认</button>\n       </div>\n       <button  id="').concat(L,'-tag-run">\n         <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>\n         批量打标   \n       </button>\n       <button  id="').concat(L,'-tag-single-run">\n         <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>\n         逐条打标   \n       </button>\n      </div>\n    '))),$("#".concat(L,"-start")).on("click",(function(){t.clearStep(),t.combinationTask(),t.run()})),$("#".concat(L,"-tag-run")).on("click",(function(){t.clearStep(),t.tagTask(),t.run()})),$("#".concat(L,"-tag-single-run")).on("click",(function(){t.clearStep(),t.tagSingleTask(),t.run()})),$("#".concat(L,"-stop")).on("click",(function(){t.stop()})).attr("disabled",!0),$("#".concat(L,"-continue")).on("click",(function(){t.continue()})).attr("disabled",!0),$("#".concat(L,"-paused")).on("click",(function(){t.paused()})).attr("disabled",!0),Object.keys(this.data).forEach((function(e){$("#".concat(L,"-").concat(e)).val(t.data[e])})),$("#".concat(L,"-submit")).on("click",(function(){Object.keys(t.data).forEach((function(e){t.data[e]=$("#".concat(L,"-").concat(e)).val()}))}))}},{key:"changeFormDisabledStatus",value:function(t){Object.keys(this.data).forEach((function(e){$("#".concat(L,"-").concat(e)).attr("disabled",t)})),$("#".concat(L,"-submit")).attr("disabled",t)}}]),e}(C))}]);