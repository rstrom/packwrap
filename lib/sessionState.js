'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (index) {
  var initial = JSON.parse(sessionStorage.getItem('initial')) || {};
  var data = _lodash2.default.range(Number(index) + 1).map(function (i) {
    return JSON.parse(sessionStorage.getItem(i)).data;
  }).reduce(function (a, b) {
    return (0, _assign2.default)(a, b);
  }, (0, _extends3.default)({}, initial, {
    fireKey: sessionStorage.getItem('fireKey'),
    index: Number(index)
  }));
  return {
    componentState: JSON.parse(sessionStorage.getItem(index)).componentState,
    index: index,
    data: data
  };
};