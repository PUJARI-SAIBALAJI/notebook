import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/react-speech-recognition/lib/utils.js
var require_utils = __commonJS({
  "node_modules/react-speech-recognition/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.browserSupportsPolyfills = exports.compareTwoStringsUsingDiceCoefficient = exports.commandToRegExp = exports.concatTranscripts = exports.debounce = void 0;
    var debounce = function debounce2(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        var later = function later2() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
    exports.debounce = debounce;
    var concatTranscripts = function concatTranscripts2() {
      for (var _len = arguments.length, transcriptParts = new Array(_len), _key = 0; _key < _len; _key++) {
        transcriptParts[_key] = arguments[_key];
      }
      return transcriptParts.map(function(t) {
        return t.trim();
      }).join(" ").trim();
    };
    exports.concatTranscripts = concatTranscripts;
    var optionalParam = /\s*\((.*?)\)\s*/g;
    var optionalRegex = /(\(\?:[^)]+\))\?/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*/g;
    var escapeRegExp = /[-{}[\]+?.,\\^$|#]/g;
    var commandToRegExp = function commandToRegExp2(command) {
      if (command instanceof RegExp) {
        return new RegExp(command.source, "i");
      }
      command = command.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
        return optional ? match : "([^\\s]+)";
      }).replace(splatParam, "(.*?)").replace(optionalRegex, "\\s*$1?\\s*");
      return new RegExp("^" + command + "$", "i");
    };
    exports.commandToRegExp = commandToRegExp;
    var compareTwoStringsUsingDiceCoefficient = function compareTwoStringsUsingDiceCoefficient2(first, second) {
      first = first.replace(/\s+/g, "").toLowerCase();
      second = second.replace(/\s+/g, "").toLowerCase();
      if (!first.length && !second.length) return 1;
      if (!first.length || !second.length) return 0;
      if (first === second) return 1;
      if (first.length === 1 && second.length === 1) return 0;
      if (first.length < 2 || second.length < 2) return 0;
      var firstBigrams = /* @__PURE__ */ new Map();
      for (var i = 0; i < first.length - 1; i++) {
        var bigram = first.substring(i, i + 2);
        var count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
        firstBigrams.set(bigram, count);
      }
      var intersectionSize = 0;
      for (var _i = 0; _i < second.length - 1; _i++) {
        var _bigram = second.substring(_i, _i + 2);
        var _count = firstBigrams.has(_bigram) ? firstBigrams.get(_bigram) : 0;
        if (_count > 0) {
          firstBigrams.set(_bigram, _count - 1);
          intersectionSize++;
        }
      }
      return 2 * intersectionSize / (first.length + second.length - 2);
    };
    exports.compareTwoStringsUsingDiceCoefficient = compareTwoStringsUsingDiceCoefficient;
    var browserSupportsPolyfills = function browserSupportsPolyfills2() {
      return typeof window !== "undefined" && window.navigator !== void 0 && window.navigator.mediaDevices !== void 0 && window.navigator.mediaDevices.getUserMedia !== void 0 && (window.AudioContext !== void 0 || window.webkitAudioContext !== void 0);
    };
    exports.browserSupportsPolyfills = browserSupportsPolyfills;
  }
});

// node_modules/react-speech-recognition/lib/constants.js
var require_constants = __commonJS({
  "node_modules/react-speech-recognition/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.APPEND_TRANSCRIPT = exports.CLEAR_TRANSCRIPT = void 0;
    var CLEAR_TRANSCRIPT = "CLEAR_TRANSCRIPT";
    exports.CLEAR_TRANSCRIPT = CLEAR_TRANSCRIPT;
    var APPEND_TRANSCRIPT = "APPEND_TRANSCRIPT";
    exports.APPEND_TRANSCRIPT = APPEND_TRANSCRIPT;
  }
});

// node_modules/react-speech-recognition/lib/actions.js
var require_actions = __commonJS({
  "node_modules/react-speech-recognition/lib/actions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.appendTranscript = exports.clearTranscript = void 0;
    var _constants = require_constants();
    var clearTranscript = function clearTranscript2() {
      return {
        type: _constants.CLEAR_TRANSCRIPT
      };
    };
    exports.clearTranscript = clearTranscript;
    var appendTranscript = function appendTranscript2(interimTranscript, finalTranscript) {
      return {
        type: _constants.APPEND_TRANSCRIPT,
        payload: {
          interimTranscript,
          finalTranscript
        }
      };
    };
    exports.appendTranscript = appendTranscript;
  }
});

// node_modules/react-speech-recognition/lib/reducers.js
var require_reducers = __commonJS({
  "node_modules/react-speech-recognition/lib/reducers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.transcriptReducer = void 0;
    var _constants = require_constants();
    var _utils = require_utils();
    var transcriptReducer = function transcriptReducer2(state, action) {
      switch (action.type) {
        case _constants.CLEAR_TRANSCRIPT:
          return {
            interimTranscript: "",
            finalTranscript: ""
          };
        case _constants.APPEND_TRANSCRIPT:
          return {
            interimTranscript: action.payload.interimTranscript,
            finalTranscript: (0, _utils.concatTranscripts)(state.finalTranscript, action.payload.finalTranscript)
          };
        default:
          throw new Error();
      }
    };
    exports.transcriptReducer = transcriptReducer;
  }
});

// node_modules/react-speech-recognition/lib/isAndroid.js
var require_isAndroid = __commonJS({
  "node_modules/react-speech-recognition/lib/isAndroid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _default = function _default2() {
      return /(android)/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");
    };
    exports["default"] = _default;
  }
});

// node_modules/react-speech-recognition/lib/NativeSpeechRecognition.js
var require_NativeSpeechRecognition = __commonJS({
  "node_modules/react-speech-recognition/lib/NativeSpeechRecognition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = exports.isNative = void 0;
    var NativeSpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition);
    var isNative = function isNative2(SpeechRecognition) {
      return SpeechRecognition === NativeSpeechRecognition;
    };
    exports.isNative = isNative;
    var _default = NativeSpeechRecognition;
    exports["default"] = _default;
  }
});

// node_modules/react-speech-recognition/lib/RecognitionManager.js
var require_RecognitionManager = __commonJS({
  "node_modules/react-speech-recognition/lib/RecognitionManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _isAndroid = _interopRequireDefault(require_isAndroid());
    var _utils = require_utils();
    var _NativeSpeechRecognition = require_NativeSpeechRecognition();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var RecognitionManager = function() {
      function RecognitionManager2(SpeechRecognition) {
        _classCallCheck(this, RecognitionManager2);
        this.recognition = null;
        this.pauseAfterDisconnect = false;
        this.interimTranscript = "";
        this.finalTranscript = "";
        this.listening = false;
        this.isMicrophoneAvailable = true;
        this.subscribers = {};
        this.onStopListening = function() {
        };
        this.previousResultWasFinalOnly = false;
        this.resetTranscript = this.resetTranscript.bind(this);
        this.startListening = this.startListening.bind(this);
        this.stopListening = this.stopListening.bind(this);
        this.abortListening = this.abortListening.bind(this);
        this.setSpeechRecognition = this.setSpeechRecognition.bind(this);
        this.disableRecognition = this.disableRecognition.bind(this);
        this.setSpeechRecognition(SpeechRecognition);
        if ((0, _isAndroid["default"])()) {
          this.updateFinalTranscript = (0, _utils.debounce)(this.updateFinalTranscript, 250, true);
        }
      }
      _createClass(RecognitionManager2, [{
        key: "setSpeechRecognition",
        value: function setSpeechRecognition(SpeechRecognition) {
          var browserSupportsRecogniser = !!SpeechRecognition && ((0, _NativeSpeechRecognition.isNative)(SpeechRecognition) || (0, _utils.browserSupportsPolyfills)());
          if (browserSupportsRecogniser) {
            this.disableRecognition();
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.onresult = this.updateTranscript.bind(this);
            this.recognition.onend = this.onRecognitionDisconnect.bind(this);
            this.recognition.onerror = this.onError.bind(this);
          }
          this.emitBrowserSupportsSpeechRecognitionChange(browserSupportsRecogniser);
        }
      }, {
        key: "subscribe",
        value: function subscribe(id, callbacks) {
          this.subscribers[id] = callbacks;
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe(id) {
          delete this.subscribers[id];
        }
      }, {
        key: "emitListeningChange",
        value: function emitListeningChange(listening) {
          var _this = this;
          this.listening = listening;
          Object.keys(this.subscribers).forEach(function(id) {
            var onListeningChange = _this.subscribers[id].onListeningChange;
            onListeningChange(listening);
          });
        }
      }, {
        key: "emitMicrophoneAvailabilityChange",
        value: function emitMicrophoneAvailabilityChange(isMicrophoneAvailable) {
          var _this2 = this;
          this.isMicrophoneAvailable = isMicrophoneAvailable;
          Object.keys(this.subscribers).forEach(function(id) {
            var onMicrophoneAvailabilityChange = _this2.subscribers[id].onMicrophoneAvailabilityChange;
            onMicrophoneAvailabilityChange(isMicrophoneAvailable);
          });
        }
      }, {
        key: "emitTranscriptChange",
        value: function emitTranscriptChange(interimTranscript, finalTranscript) {
          var _this3 = this;
          Object.keys(this.subscribers).forEach(function(id) {
            var onTranscriptChange = _this3.subscribers[id].onTranscriptChange;
            onTranscriptChange(interimTranscript, finalTranscript);
          });
        }
      }, {
        key: "emitClearTranscript",
        value: function emitClearTranscript() {
          var _this4 = this;
          Object.keys(this.subscribers).forEach(function(id) {
            var onClearTranscript = _this4.subscribers[id].onClearTranscript;
            onClearTranscript();
          });
        }
      }, {
        key: "emitBrowserSupportsSpeechRecognitionChange",
        value: function emitBrowserSupportsSpeechRecognitionChange(browserSupportsSpeechRecognitionChange) {
          var _this5 = this;
          Object.keys(this.subscribers).forEach(function(id) {
            var _this5$subscribers$id = _this5.subscribers[id], onBrowserSupportsSpeechRecognitionChange = _this5$subscribers$id.onBrowserSupportsSpeechRecognitionChange, onBrowserSupportsContinuousListeningChange = _this5$subscribers$id.onBrowserSupportsContinuousListeningChange;
            onBrowserSupportsSpeechRecognitionChange(browserSupportsSpeechRecognitionChange);
            onBrowserSupportsContinuousListeningChange(browserSupportsSpeechRecognitionChange);
          });
        }
      }, {
        key: "disconnect",
        value: function disconnect(disconnectType) {
          if (this.recognition && this.listening) {
            switch (disconnectType) {
              case "ABORT":
                this.pauseAfterDisconnect = true;
                this.abort();
                break;
              case "RESET":
                this.pauseAfterDisconnect = false;
                this.abort();
                break;
              case "STOP":
              default:
                this.pauseAfterDisconnect = true;
                this.stop();
            }
          }
        }
      }, {
        key: "disableRecognition",
        value: function disableRecognition() {
          if (this.recognition) {
            this.recognition.onresult = function() {
            };
            this.recognition.onend = function() {
            };
            this.recognition.onerror = function() {
            };
            if (this.listening) {
              this.stopListening();
            }
          }
        }
      }, {
        key: "onError",
        value: function onError(event) {
          if (event && event.error && event.error === "not-allowed") {
            this.emitMicrophoneAvailabilityChange(false);
            this.disableRecognition();
          }
        }
      }, {
        key: "onRecognitionDisconnect",
        value: function onRecognitionDisconnect() {
          this.onStopListening();
          this.listening = false;
          if (this.pauseAfterDisconnect) {
            this.emitListeningChange(false);
          } else if (this.recognition) {
            if (this.recognition.continuous) {
              this.startListening({
                continuous: this.recognition.continuous
              });
            } else {
              this.emitListeningChange(false);
            }
          }
          this.pauseAfterDisconnect = false;
        }
      }, {
        key: "updateTranscript",
        value: function updateTranscript(_ref) {
          var results = _ref.results, resultIndex = _ref.resultIndex;
          var currentIndex = resultIndex === void 0 ? results.length - 1 : resultIndex;
          this.interimTranscript = "";
          this.finalTranscript = "";
          for (var i = currentIndex; i < results.length; ++i) {
            if (results[i].isFinal && (!(0, _isAndroid["default"])() || results[i][0].confidence > 0)) {
              this.updateFinalTranscript(results[i][0].transcript);
            } else {
              this.interimTranscript = (0, _utils.concatTranscripts)(this.interimTranscript, results[i][0].transcript);
            }
          }
          var isDuplicateResult = false;
          if (this.interimTranscript === "" && this.finalTranscript !== "") {
            if (this.previousResultWasFinalOnly) {
              isDuplicateResult = true;
            }
            this.previousResultWasFinalOnly = true;
          } else {
            this.previousResultWasFinalOnly = false;
          }
          if (!isDuplicateResult) {
            this.emitTranscriptChange(this.interimTranscript, this.finalTranscript);
          }
        }
      }, {
        key: "updateFinalTranscript",
        value: function updateFinalTranscript(newFinalTranscript) {
          this.finalTranscript = (0, _utils.concatTranscripts)(this.finalTranscript, newFinalTranscript);
        }
      }, {
        key: "resetTranscript",
        value: function resetTranscript() {
          this.disconnect("RESET");
        }
      }, {
        key: "startListening",
        value: function() {
          var _startListening = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var _ref2, _ref2$continuous, continuous, language, isContinuousChanged, isLanguageChanged, _args = arguments;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref2 = _args.length > 0 && _args[0] !== void 0 ? _args[0] : {}, _ref2$continuous = _ref2.continuous, continuous = _ref2$continuous === void 0 ? false : _ref2$continuous, language = _ref2.language;
                    if (this.recognition) {
                      _context.next = 3;
                      break;
                    }
                    return _context.abrupt("return");
                  case 3:
                    isContinuousChanged = continuous !== this.recognition.continuous;
                    isLanguageChanged = language && language !== this.recognition.lang;
                    if (!(isContinuousChanged || isLanguageChanged)) {
                      _context.next = 11;
                      break;
                    }
                    if (!this.listening) {
                      _context.next = 9;
                      break;
                    }
                    _context.next = 9;
                    return this.stopListening();
                  case 9:
                    this.recognition.continuous = isContinuousChanged ? continuous : this.recognition.continuous;
                    this.recognition.lang = isLanguageChanged ? language : this.recognition.lang;
                  case 11:
                    if (this.listening) {
                      _context.next = 22;
                      break;
                    }
                    if (!this.recognition.continuous) {
                      this.resetTranscript();
                      this.emitClearTranscript();
                    }
                    _context.prev = 13;
                    _context.next = 16;
                    return this.start();
                  case 16:
                    this.emitListeningChange(true);
                    _context.next = 22;
                    break;
                  case 19:
                    _context.prev = 19;
                    _context.t0 = _context["catch"](13);
                    if (!(_context.t0 instanceof DOMException)) {
                      this.emitMicrophoneAvailabilityChange(false);
                    }
                  case 22:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[13, 19]]);
          }));
          function startListening() {
            return _startListening.apply(this, arguments);
          }
          return startListening;
        }()
      }, {
        key: "abortListening",
        value: function() {
          var _abortListening = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
            var _this6 = this;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    this.disconnect("ABORT");
                    this.emitListeningChange(false);
                    _context2.next = 4;
                    return new Promise(function(resolve) {
                      _this6.onStopListening = resolve;
                    });
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
          function abortListening() {
            return _abortListening.apply(this, arguments);
          }
          return abortListening;
        }()
      }, {
        key: "stopListening",
        value: function() {
          var _stopListening = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var _this7 = this;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    this.disconnect("STOP");
                    this.emitListeningChange(false);
                    _context3.next = 4;
                    return new Promise(function(resolve) {
                      _this7.onStopListening = resolve;
                    });
                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
          function stopListening() {
            return _stopListening.apply(this, arguments);
          }
          return stopListening;
        }()
      }, {
        key: "getRecognition",
        value: function getRecognition() {
          return this.recognition;
        }
      }, {
        key: "start",
        value: function() {
          var _start = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(this.recognition && !this.listening)) {
                      _context4.next = 4;
                      break;
                    }
                    _context4.next = 3;
                    return this.recognition.start();
                  case 3:
                    this.listening = true;
                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }()
      }, {
        key: "stop",
        value: function stop() {
          if (this.recognition && this.listening) {
            this.recognition.stop();
            this.listening = false;
          }
        }
      }, {
        key: "abort",
        value: function abort() {
          if (this.recognition && this.listening) {
            this.recognition.abort();
            this.listening = false;
          }
        }
      }]);
      return RecognitionManager2;
    }();
    exports["default"] = RecognitionManager;
  }
});

// node_modules/react-speech-recognition/lib/SpeechRecognition.js
var require_SpeechRecognition = __commonJS({
  "node_modules/react-speech-recognition/lib/SpeechRecognition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = exports.useSpeechRecognition = void 0;
    var _react = require_react();
    var _utils = require_utils();
    var _actions = require_actions();
    var _reducers = require_reducers();
    var _RecognitionManager = _interopRequireDefault(require_RecognitionManager());
    var _isAndroid = _interopRequireDefault(require_isAndroid());
    var _NativeSpeechRecognition = _interopRequireDefault(require_NativeSpeechRecognition());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    var _browserSupportsSpeechRecognition = !!_NativeSpeechRecognition["default"];
    var _browserSupportsContinuousListening = _browserSupportsSpeechRecognition && !(0, _isAndroid["default"])();
    var recognitionManager;
    var useSpeechRecognition = function useSpeechRecognition2() {
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$transcribing = _ref.transcribing, transcribing = _ref$transcribing === void 0 ? true : _ref$transcribing, _ref$clearTranscriptO = _ref.clearTranscriptOnListen, clearTranscriptOnListen = _ref$clearTranscriptO === void 0 ? true : _ref$clearTranscriptO, _ref$commands = _ref.commands, commands = _ref$commands === void 0 ? [] : _ref$commands;
      var _useState = (0, _react.useState)(SpeechRecognition.getRecognitionManager()), _useState2 = _slicedToArray(_useState, 1), recognitionManager2 = _useState2[0];
      var _useState3 = (0, _react.useState)(_browserSupportsSpeechRecognition), _useState4 = _slicedToArray(_useState3, 2), browserSupportsSpeechRecognition = _useState4[0], setBrowserSupportsSpeechRecognition = _useState4[1];
      var _useState5 = (0, _react.useState)(_browserSupportsContinuousListening), _useState6 = _slicedToArray(_useState5, 2), browserSupportsContinuousListening = _useState6[0], setBrowserSupportsContinuousListening = _useState6[1];
      var _useReducer = (0, _react.useReducer)(_reducers.transcriptReducer, {
        interimTranscript: recognitionManager2.interimTranscript,
        finalTranscript: ""
      }), _useReducer2 = _slicedToArray(_useReducer, 2), _useReducer2$ = _useReducer2[0], interimTranscript = _useReducer2$.interimTranscript, finalTranscript = _useReducer2$.finalTranscript, dispatch = _useReducer2[1];
      var _useState7 = (0, _react.useState)(recognitionManager2.listening), _useState8 = _slicedToArray(_useState7, 2), listening = _useState8[0], setListening = _useState8[1];
      var _useState9 = (0, _react.useState)(recognitionManager2.isMicrophoneAvailable), _useState10 = _slicedToArray(_useState9, 2), isMicrophoneAvailable = _useState10[0], setMicrophoneAvailable = _useState10[1];
      var commandsRef = (0, _react.useRef)(commands);
      commandsRef.current = commands;
      var dispatchClearTranscript = function dispatchClearTranscript2() {
        dispatch((0, _actions.clearTranscript)());
      };
      var resetTranscript = (0, _react.useCallback)(function() {
        recognitionManager2.resetTranscript();
        dispatchClearTranscript();
      }, [recognitionManager2]);
      var testFuzzyMatch = function testFuzzyMatch2(command, input, fuzzyMatchingThreshold) {
        var commandToString = _typeof(command) === "object" ? command.toString() : command;
        var commandWithoutSpecials = commandToString.replace(/[&/\\#,+()!$~%.'":*?<>{}]/g, "").replace(/  +/g, " ").trim();
        var howSimilar = (0, _utils.compareTwoStringsUsingDiceCoefficient)(commandWithoutSpecials, input);
        if (howSimilar >= fuzzyMatchingThreshold) {
          return {
            command,
            commandWithoutSpecials,
            howSimilar,
            isFuzzyMatch: true
          };
        }
        return null;
      };
      var testMatch = function testMatch2(command, input) {
        var pattern = (0, _utils.commandToRegExp)(command);
        var result = pattern.exec(input);
        if (result) {
          return {
            command,
            parameters: result.slice(1)
          };
        }
        return null;
      };
      var matchCommands = (0, _react.useCallback)(function(newInterimTranscript, newFinalTranscript) {
        commandsRef.current.forEach(function(_ref2) {
          var command = _ref2.command, callback = _ref2.callback, _ref2$matchInterim = _ref2.matchInterim, matchInterim = _ref2$matchInterim === void 0 ? false : _ref2$matchInterim, _ref2$isFuzzyMatch = _ref2.isFuzzyMatch, isFuzzyMatch = _ref2$isFuzzyMatch === void 0 ? false : _ref2$isFuzzyMatch, _ref2$fuzzyMatchingTh = _ref2.fuzzyMatchingThreshold, fuzzyMatchingThreshold = _ref2$fuzzyMatchingTh === void 0 ? 0.8 : _ref2$fuzzyMatchingTh, _ref2$bestMatchOnly = _ref2.bestMatchOnly, bestMatchOnly = _ref2$bestMatchOnly === void 0 ? false : _ref2$bestMatchOnly;
          var input = !newFinalTranscript && matchInterim ? newInterimTranscript.trim() : newFinalTranscript.trim();
          var subcommands = Array.isArray(command) ? command : [command];
          var results = subcommands.map(function(subcommand) {
            if (isFuzzyMatch) {
              return testFuzzyMatch(subcommand, input, fuzzyMatchingThreshold);
            }
            return testMatch(subcommand, input);
          }).filter(function(x) {
            return x;
          });
          if (isFuzzyMatch && bestMatchOnly && results.length >= 2) {
            results.sort(function(a, b) {
              return b.howSimilar - a.howSimilar;
            });
            var _results$ = results[0], _command = _results$.command, commandWithoutSpecials = _results$.commandWithoutSpecials, howSimilar = _results$.howSimilar;
            callback(commandWithoutSpecials, input, howSimilar, {
              command: _command,
              resetTranscript
            });
          } else {
            results.forEach(function(result) {
              if (result.isFuzzyMatch) {
                var _command2 = result.command, _commandWithoutSpecials = result.commandWithoutSpecials, _howSimilar = result.howSimilar;
                callback(_commandWithoutSpecials, input, _howSimilar, {
                  command: _command2,
                  resetTranscript
                });
              } else {
                var _command3 = result.command, parameters = result.parameters;
                callback.apply(void 0, _toConsumableArray(parameters).concat([{
                  command: _command3,
                  resetTranscript
                }]));
              }
            });
          }
        });
      }, [resetTranscript]);
      var handleTranscriptChange = (0, _react.useCallback)(function(newInterimTranscript, newFinalTranscript) {
        if (transcribing) {
          dispatch((0, _actions.appendTranscript)(newInterimTranscript, newFinalTranscript));
        }
        matchCommands(newInterimTranscript, newFinalTranscript);
      }, [matchCommands, transcribing]);
      var handleClearTranscript = (0, _react.useCallback)(function() {
        if (clearTranscriptOnListen) {
          dispatchClearTranscript();
        }
      }, [clearTranscriptOnListen]);
      (0, _react.useEffect)(function() {
        var id = SpeechRecognition.counter;
        SpeechRecognition.counter += 1;
        var callbacks = {
          onListeningChange: setListening,
          onMicrophoneAvailabilityChange: setMicrophoneAvailable,
          onTranscriptChange: handleTranscriptChange,
          onClearTranscript: handleClearTranscript,
          onBrowserSupportsSpeechRecognitionChange: setBrowserSupportsSpeechRecognition,
          onBrowserSupportsContinuousListeningChange: setBrowserSupportsContinuousListening
        };
        recognitionManager2.subscribe(id, callbacks);
        return function() {
          recognitionManager2.unsubscribe(id);
        };
      }, [transcribing, clearTranscriptOnListen, recognitionManager2, handleTranscriptChange, handleClearTranscript]);
      var transcript = (0, _utils.concatTranscripts)(finalTranscript, interimTranscript);
      return {
        transcript,
        interimTranscript,
        finalTranscript,
        listening,
        isMicrophoneAvailable,
        resetTranscript,
        browserSupportsSpeechRecognition,
        browserSupportsContinuousListening
      };
    };
    exports.useSpeechRecognition = useSpeechRecognition;
    var SpeechRecognition = {
      counter: 0,
      applyPolyfill: function applyPolyfill(PolyfillSpeechRecognition) {
        if (recognitionManager) {
          recognitionManager.setSpeechRecognition(PolyfillSpeechRecognition);
        } else {
          recognitionManager = new _RecognitionManager["default"](PolyfillSpeechRecognition);
        }
        var browserSupportsPolyfill = !!PolyfillSpeechRecognition && (0, _utils.browserSupportsPolyfills)();
        _browserSupportsSpeechRecognition = browserSupportsPolyfill;
        _browserSupportsContinuousListening = browserSupportsPolyfill;
      },
      removePolyfill: function removePolyfill() {
        if (recognitionManager) {
          recognitionManager.setSpeechRecognition(_NativeSpeechRecognition["default"]);
        } else {
          recognitionManager = new _RecognitionManager["default"](_NativeSpeechRecognition["default"]);
        }
        _browserSupportsSpeechRecognition = !!_NativeSpeechRecognition["default"];
        _browserSupportsContinuousListening = _browserSupportsSpeechRecognition && !(0, _isAndroid["default"])();
      },
      getRecognitionManager: function getRecognitionManager() {
        if (!recognitionManager) {
          recognitionManager = new _RecognitionManager["default"](_NativeSpeechRecognition["default"]);
        }
        return recognitionManager;
      },
      getRecognition: function getRecognition() {
        var recognitionManager2 = SpeechRecognition.getRecognitionManager();
        return recognitionManager2.getRecognition();
      },
      startListening: function() {
        var _startListening = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
          var _ref3, continuous, language, recognitionManager2, _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ref3 = _args.length > 0 && _args[0] !== void 0 ? _args[0] : {}, continuous = _ref3.continuous, language = _ref3.language;
                  recognitionManager2 = SpeechRecognition.getRecognitionManager();
                  _context.next = 4;
                  return recognitionManager2.startListening({
                    continuous,
                    language
                  });
                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        function startListening() {
          return _startListening.apply(this, arguments);
        }
        return startListening;
      }(),
      stopListening: function() {
        var _stopListening = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
          var recognitionManager2;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  recognitionManager2 = SpeechRecognition.getRecognitionManager();
                  _context2.next = 3;
                  return recognitionManager2.stopListening();
                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        function stopListening() {
          return _stopListening.apply(this, arguments);
        }
        return stopListening;
      }(),
      abortListening: function() {
        var _abortListening = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
          var recognitionManager2;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  recognitionManager2 = SpeechRecognition.getRecognitionManager();
                  _context3.next = 3;
                  return recognitionManager2.abortListening();
                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
        function abortListening() {
          return _abortListening.apply(this, arguments);
        }
        return abortListening;
      }(),
      browserSupportsSpeechRecognition: function browserSupportsSpeechRecognition() {
        return _browserSupportsSpeechRecognition;
      },
      browserSupportsContinuousListening: function browserSupportsContinuousListening() {
        return _browserSupportsContinuousListening;
      }
    };
    var _default = SpeechRecognition;
    exports["default"] = _default;
  }
});

// node_modules/react-speech-recognition/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-speech-recognition/lib/index.js"(exports) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "useSpeechRecognition", {
      enumerable: true,
      get: function get() {
        return _SpeechRecognition.useSpeechRecognition;
      }
    });
    exports["default"] = void 0;
    var _SpeechRecognition = _interopRequireWildcard(require_SpeechRecognition());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var _default = _SpeechRecognition["default"];
    exports["default"] = _default;
  }
});
export default require_lib();
//# sourceMappingURL=react-speech-recognition.js.map
