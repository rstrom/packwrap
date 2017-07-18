'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _simulate = require('./simulate');

var _simulate2 = _interopRequireDefault(_simulate);

var _StateList = require('./StateList');

var _StateList2 = _interopRequireDefault(_StateList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.React = _react2.default;

var Wrap = function Wrap(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    null,
    children
  );
};

var Container = function (_React$Component) {
  (0, _inherits3.default)(Container, _React$Component);

  function Container(props) {
    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this, props));

    _this.push = function (response, silent) {
      if (!silent) document.querySelector('.main').scrollTop = 0;
      _this.setState({ wrapWidth: null });
      var _this$props = _this.props,
          components = _this$props.components,
          modules = _this$props.modules;

      var index = _this.state.index;
      _this.SL.push(response, modules[index].component, silent);
    };

    _this.set = function (screenState) {
      _this.SL.set(screenState);
    };

    _this.simulateTo = function (index, withData) {
      _this.setState(function (state) {
        var _this$props2 = _this.props,
            modules = _this$props2.modules,
            components = _this$props2.components;

        var simulated = simulateOver(state.data, modules.slice(0, index), components);
        return {
          data: (0, _extends3.default)({}, simulated, withData),
          index: simulated.index
        };
      });
    };

    var params = (0, _lodash2.default)(location.search.slice(1).split('&')).map(function (item) {
      return item.split('=');
    }).fromPairs().value();

    if (!params.index) sessionStorage.clear();

    var initial = (0, _extends3.default)({
      start: Date.now(),
      endpoint: null
    }, props.state, params);
    document.title = initial.title || 'Survey';

    _this.SL = new _StateList2.default(initial);
    _this.state = (0, _extends3.default)({}, _this.SL.getState(), {
      params: params
    });
    _this.push = _this.push.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Container, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.SL.subscribe(function (state) {
        return _this2.setState(state);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          modules = _props.modules,
          components = _props.components;
      var params = this.state.params;


      if (+params.simto) (0, _simulate2.default)(this.SL, modules, components, +params.simto);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          components = _props2.components,
          modules = _props2.modules,
          state = _props2.state,
          wrapper = _props2.wrapper;
      var _state = this.state,
          index = _state.index,
          screenState = _state.screenState;


      var key = sessionStorage.getItem('key');

      if (index >= modules.length) {
        return _react2.default.createElement(
          'pre',
          null,
          (0, _stringify2.default)(this.state.data, null, 2)
        );
      } else if (!components.hasOwnProperty(modules[index].component)) {
        return _react2.default.createElement(
          'pre',
          null,
          'Error: could not find component ',
          modules[index].component
        );
      }

      var Component = components[modules[index].component];
      var props = (0, _extends3.default)({}, (0, _echo2.default)((0, _extends3.default)({}, Component.defaultProps, modules[index], screenState), (0, _extends3.default)({}, state, this.state.data, screenState)));

      var Wrapper = wrapper || Wrap;

      return _react2.default.createElement(
        Wrapper,
        {
          state: this.state,
          length: modules.length,
          simulatePush: function simulatePush() {
            return _this3.push(Component.simulate(props));
          }
        },
        key ? _react2.default.createElement(Component, (0, _extends3.default)({}, props, {
          key: index,
          index: index,
          data: this.state.data,
          set: this.set,
          push: this.push,
          setWrapWidth: function setWrapWidth(wrapWidth) {
            return _this3.setState({ wrapWidth: wrapWidth });
          }
        })) : _react2.default.createElement(
          'p',
          null,
          'Initializing...'
        )
      );
    }
  }]);
  return Container;
}(_react2.default.Component);

Container.defaultProps = {
  state: {},
  modules: [],
  components: {}
};
exports.default = Container;