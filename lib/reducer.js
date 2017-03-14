'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = {
  index: 0,
  table: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments[1];

  switch (action.type) {
    case 'SET':
      return (0, _extends3.default)({}, state, {
        table: (0, _extends3.default)({}, state.table, action.table)
      });
    case 'PUSH':
      return (0, _extends3.default)({}, state, {
        index: state.index + 1,
        table: (0, _extends3.default)({}, state.table, action.table)
      });
    default:
      return state;
  }
};