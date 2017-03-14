'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (statics, components) {
  return statics.filter(function (q) {
    return _lodash2.default.has(components, q.component);
  }).map(function (q, i) {
    var Q = components[q.component];
    return _react2.default.createElement(Q, (0, _extends3.default)({}, q, { key: i }));
  });
};