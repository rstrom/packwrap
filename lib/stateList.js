'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fold(list, prop, init) {
  return list.reduce(function (a, b) {
    return (0, _assign2.default)(a, prop ? b[prop] : b);
  }, init || {});
}

var StateList = function () {
  function StateList(initial) {
    (0, _classCallCheck3.default)(this, StateList);

    this.initial = initial;
    this.state = [{
      data: [],
      screenState: []
    }];
    this.index = 0;
    this.publish = function () {
      return null;
    };
  }

  (0, _createClass3.default)(StateList, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // page reload
      var reload = JSON.parse(sessionStorage.getItem('StateList'));
      if (reload) {
        this.index = reload.index;
        this.state = reload.state;
        this.publish();
      }

      // no key for db
      if (!sessionStorage.getItem('key')) {
        ;(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var endpoint;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  endpoint = (0, _echo2.default)(_this.initial.endpoint, _this.initial);
                  _context.next = 4;
                  return (0, _record2.default)(endpoint, _this.initial, 'initial');

                case 4:
                  _this.publish();
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  _this.initial = (0, _extends4.default)({}, _this.initial, {
                    fail: true
                  });

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 7]]);
        }))();
      }

      history.replaceState(this.index, null, '?index=' + this.index);
      window.onpopstate = function (event) {
        // prevent going back before max
        var max = sessionStorage.getItem('max');
        if (Number(event.state) > Number(max)) {
          _this.index = event.state;
          _this.publish();
        }
      };
    }
  }, {
    key: 'set',
    value: function set(screenState) {
      this.state[this.index] = (0, _extends4.default)({}, this.state[this.index], {
        screenState: this.state[this.index].screenState.concat((0, _extends4.default)({}, screenState, {
          timestamp: Date.now()
        }))
      });
      this.publish();
    }
  }, {
    key: 'push',
    value: function push(data, component) {
      var _extends2,
          _this2 = this;

      var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.state[this.index].data = this.state[this.index].data.concat((0, _extends4.default)({}, data, (_extends2 = {}, (0, _defineProperty3.default)(_extends2, 'module_' + this.index + '_component', component), (0, _defineProperty3.default)(_extends2, 'module_' + this.index + '_t', Date.now()), _extends2)));
      this.state[this.index].silent = silent;(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var endpoint;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                endpoint = (0, _echo2.default)(_this2.initial.endpoint, _this2.initial);
                _context2.next = 4;
                return (0, _record2.default)(endpoint, _this2.state[_this2.index], _this2.index);

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                _this2.initial = (0, _extends4.default)({}, _this2.initial, {
                  fail: true
                });

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 6]]);
      }))();

      this.index += 1;
      if (!this.state[this.index]) {
        this.state[this.index] = {
          data: [],
          screenState: []
        };
      }
      if (!silent) history.pushState(this.index, null, '?index=' + this.index);
      history.replaceState(this.index, null, '?index=' + this.index);
      this.publish();
    }
  }, {
    key: 'getState',
    value: function getState() {
      var key = sessionStorage.getItem('key');
      var initial = (0, _assign2.default)(this.initial, { key: key });
      var datas = this.state.slice(0, this.index).map(function (s) {
        return fold(s.data);
      });
      return {
        index: this.index,
        data: fold(datas, null, initial),
        screenState: fold(this.state[this.index].screenState)
      };
    }
  }, {
    key: 'subscribe',
    value: function subscribe(callback) {
      var _this3 = this;

      this.publish = function () {
        var state = _this3.getState();
        callback(state);

        // save for page reload
        sessionStorage.setItem('StateList', (0, _stringify2.default)({
          state: _this3.state,
          index: _this3.index
        }));
      };
      this.init();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.state = [{
        data: [],
        screenState: []
      }];
      this.index = 0;
    }
  }]);
  return StateList;
}();

exports.default = StateList;