'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function echo(prop, env) {
  switch (true) {
    case Array.isArray(prop):
      return prop.map(function (p) {
        return echo(p, env);
      });

    case (typeof prop === 'undefined' ? 'undefined' : (0, _typeof3.default)(prop)) === 'object':
      return (0, _lodash2.default)(prop).map(function (v, k) {
        return [k, echo(v, env)];
      }).fromPairs().value();

    case /\${.+?}/.test(prop):
      // replace ${foo} with env[foo]
      // ${${qux}} -> ${env[qux]}
      var p = prop.replace(/\${([^\${}]+?)}/, function (m, p1) {
        return env[p1];
      });
      return echo(p, env);

    case /^\$(\w|_).*/.test(prop):
      return env.hasOwnProperty(prop.substring(1)) ? echo(env[prop.substring(1)], env) : prop;

    default:
      return prop;
  }
}

exports.default = echo;