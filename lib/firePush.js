'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(endpoint, data, index) {
    var key, post, _ref2, name, put;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            key = sessionStorage.getItem('key');

            console.log('push', endpoint, key, data, index);

            if (key) {
              _context.next = 14;
              break;
            }

            _context.next = 5;
            return fetch(endpoint + '.json', {
              method: 'POST',
              body: (0, _stringify2.default)({
                0: (0, _extends3.default)({}, data, {
                  timestamp: {
                    '.sv': 'timestamp'
                  }
                })
              })
            });

          case 5:
            post = _context.sent;
            _context.next = 8;
            return post.json();

          case 8:
            _ref2 = _context.sent;
            name = _ref2.name;

            sessionStorage.setItem('key', name);
            return _context.abrupt('return', name);

          case 14:
            _context.next = 16;
            return fetch(endpoint + '/' + key + '/' + index + '.json', {
              method: 'PUT',
              body: (0, _stringify2.default)((0, _extends3.default)({}, data, {
                timestamp: {
                  '.sv': 'timestamp'
                }
              }))
            });

          case 16:
            put = _context.sent;
            return _context.abrupt('return', key);

          case 18:
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