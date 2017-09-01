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

function simulate(SL, modules, components, to) {
  SL.reset();
  modules.slice(0, to).reduce(function (data, m) {
    console.log('sim', data);
    var component = components[m.component];
    component.defaultProps = component.defaultProps || {};
    var props = (0, _extends3.default)({}, assignProps(component.defaultProps, data), assignProps(m, data));
    var response = component.hasOwnProperty('simulate') ? component.simulate(props) : {};
    SL.push(response, 'Sim' + m.component, true);
    return SL.getState().data;
  }, {});
}

exports.default = simulate;