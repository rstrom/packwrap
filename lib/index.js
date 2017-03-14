'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pack = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pack = exports.pack = function pack(components) {
  return function (state, modules, elementId, wrapper) {
    (0, _reactDom.render)(_react2.default.createElement(_Container2.default, {
      components: components,
      state: state,
      modules: modules,
      wrapper: wrapper
    }), document.getElementById(elementId));
  };
};