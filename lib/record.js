'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mung(data) {
  for (var k in data) {
    // delete any internal params that start with "_"!
    if (/^_/.test(k)) {
      delete data[k];
    }

    if (/[\$#[\]\/\.]/.test(k)) {
      var clean = k.replace(/[\$#[\]\/\.]/g, '*');
      data[clean] = data[k];
      delete data[k];
    }

    if ((0, _typeof3.default)(data[k]) === 'object') {
      data[k] = mung(data[k]);
    }
  }
  return data;
}

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(endpoint) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var index = arguments[2];
    var key, cleanData, put, q;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // key : null | 'FETCHING' | '-ORDERED_HASH'
            key = sessionStorage.getItem('key');
            cleanData = mung(JSON.parse((0, _stringify2.default)(data)));

            if (!(key && key !== 'FETCHING')) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return fetch(endpoint + '/' + key + '/' + index + '.json', {
              method: 'PUT',
              body: (0, _stringify2.default)((0, _extends3.default)({}, cleanData, {
                timestamp: {
                  '.sv': 'timestamp'
                }
              }))
            });

          case 5:
            put = _context2.sent;
            _context2.next = 14;
            break;

          case 8:
            if (!(key === 'FETCHING')) {
              _context2.next = 13;
              break;
            }

            q = JSON.parse(sessionStorage.getItem('queue')) || [];

            sessionStorage.setItem('queue', (0, _stringify2.default)(q.concat({
              data: cleanData,
              index: index
            })));
            _context2.next = 14;
            break;

          case 13:
            return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
              var post, _ref2, name, q;

              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      sessionStorage.setItem('key', 'FETCHING');
                      _context.next = 3;
                      return fetch(endpoint + '.json', {
                        method: 'POST',
                        body: (0, _stringify2.default)((0, _defineProperty3.default)({}, index, (0, _extends3.default)({}, cleanData, {
                          timestamp: {
                            '.sv': 'timestamp'
                          }
                        })))
                      });

                    case 3:
                      post = _context.sent;
                      _context.next = 6;
                      return post.json();

                    case 6:
                      _ref2 = _context.sent;
                      name = _ref2.name;

                      sessionStorage.setItem('key', name);
                      q = JSON.parse(sessionStorage.getItem('queue')) || [];

                      q.map(function (r) {
                        return fetch(endpoint + '/' + name + '/' + r.index + '.json', {
                          method: 'PUT',
                          body: (0, _stringify2.default)((0, _extends3.default)({}, r.data, {
                            timestamp: {
                              '.sv': 'timestamp'
                            }
                          }))
                        });
                      });

                    case 11:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            })(), 't0', 14);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();