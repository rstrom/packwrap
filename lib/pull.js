'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(appName, appVersion, key) {
    var firebase, table$, _ref2, name, stack$, stack, _table$, table, _stack$, _stack;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(key, !key);
            firebase = 'https://statics-51590.firebaseio.com';

            if (key) {
              _context.next = 19;
              break;
            }

            _context.next = 5;
            return fetch(firebase + '/' + appName + '/' + appVersion + '.json', {
              method: 'POST',
              body: '{}'
            });

          case 5:
            table$ = _context.sent;
            _context.next = 8;
            return table$.json();

          case 8:
            _ref2 = _context.sent;
            name = _ref2.name;
            _context.next = 12;
            return fetch(firebase + '/' + appName + '/' + appVersion + '/stack.json');

          case 12:
            stack$ = _context.sent;
            _context.next = 15;
            return stack$.json();

          case 15:
            stack = _context.sent;
            return _context.abrupt('return', { key: name, table: {}, stack: stack });

          case 19:
            _context.next = 21;
            return fetch(firebase + '/' + appName + '/' + appVersion + '/' + key + '.json');

          case 21:
            _table$ = _context.sent;
            _context.next = 24;
            return _table$.json();

          case 24:
            table = _context.sent;
            _context.next = 27;
            return fetch(firebase + '/' + appName + '/' + appVersion + '/stack.json');

          case 27:
            _stack$ = _context.sent;
            _context.next = 30;
            return _stack$.json();

          case 30:
            _stack = _context.sent;

            console.log(key, _stack);
            return _context.abrupt('return', { key: key, table: table, stack: [] });

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();