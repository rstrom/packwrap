'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignProps(params, state) {
  return (0, _lodash2.default)(params).map(function (v, k) {
    return [k, (0, _echo2.default)(v, state)];
  }).fromPairs().value();
}

function simulateOver(state, modules, components) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!modules.length) {
    return state;
  } else {
    var component = components[modules[0].component];
    component.defaultProps = component.defaultProps || {};
    var props = (0, _extends3.default)({}, assignProps(component.defaultProps, state), assignProps(modules[0], state));
    var simulated = component.hasOwnProperty('simulate') ? component.simulate((0, _extends3.default)({}, props, { index: index })) : {};
    return simulateOver((0, _extends3.default)({}, state, simulated, { index: index + 1 }), modules.slice(1), components, index + 1);
  }
}

exports.default = simulateOver;