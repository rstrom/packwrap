'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

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

var _simulateOver = require('./simulateOver');

var _simulateOver2 = _interopRequireDefault(_simulateOver);

var _firePush = require('./firePush');

var _firePush2 = _interopRequireDefault(_firePush);

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

  function Container() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this));

    _this.push = function (response) {
      _this.setState(function (state) {
        var _extends2;

        return {
          data: (0, _extends5.default)({}, state.data, response, (_extends2 = {}, (0, _defineProperty3.default)(_extends2, 'module_' + _this.state.index + '_t', Date.now()), (0, _defineProperty3.default)(_extends2, 'module_' + _this.state.index + '_component', _this.props.modules[_this.state.index].component), _extends2)),
          componentState: {},
          index: state.index + 1
        };
      }, function () {
        document.querySelector('.main').scrollTop = 0;
        history.pushState(_this.state.index, _this.state.title, '?index=' + _this.state.index);
        sessionStorage.setItem(_this.state.index, (0, _stringify2.default)(_this.state));
        var endpoint = (0, _echo2.default)(_this.state.data.endpoint, _this.state.data);(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var fireKey;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _firePush2.default)(endpoint, _this.state.fireKey, _this.state.data);

                case 2:
                  fireKey = _context.sent;

                  _this.setState({ fireKey: fireKey });

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }))();
      });
    };

    _this.renderlessPush = function (response) {
      _this.setState(function (state) {
        var _extends3;

        return {
          data: (0, _extends5.default)({}, state.data, response, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, 'module_' + _this.state.index + '_t', Date.now()), (0, _defineProperty3.default)(_extends3, 'module_' + _this.state.index + '_component', _this.props.modules[_this.state.index].component), _extends3)),
          index: state.index + 1
        };
      });
    };

    _this.set = function (data) {
      _this.setState(function (state) {
        return {
          componentState: (0, _extends5.default)({}, state.componentState, data)
        };
      });
    };

    _this.simulateTo = function (index) {
      _this.setState(function (state) {
        var _this$props = _this.props,
            modules = _this$props.modules,
            components = _this$props.components;

        var simulated = (0, _simulateOver2.default)(state.data, modules.slice(0, index), components);
        return {
          data: simulated,
          index: simulated.index
        };
      });
    };

    _this.state = {
      index: 0,
      title: 'Survey'
    };
    return _this;
  }

  (0, _createClass3.default)(Container, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this3 = this;

      var params = (0, _lodash2.default)(location.search.slice(1).split('&')).map(function (item) {
        return item.split('=');
      }).fromPairs().value();

      this.setState({
        data: (0, _extends5.default)({
          start: Date.now(),
          endpoint: null
        }, this.props.state, params)
      });

      window.onpopstate = function (event) {
        var backState = JSON.parse(sessionStorage.getItem(event.state));
        _this3.setState(backState);
      };

      if (+params.simto) {
        this.simulateTo(params.simto);
      }

      if (params.index) {
        var backState = JSON.parse(sessionStorage.getItem(params.index));
        this.setState(backState);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.title = this.state.title;
      history.pushState(this.state.index, this.state.title, location.search);
      sessionStorage.setItem(this.state.index, (0, _stringify2.default)(this.state));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          components = _props.components,
          modules = _props.modules,
          state = _props.state,
          wrapper = _props.wrapper;
      var _state = this.state,
          index = _state.index,
          componentState = _state.componentState;


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
      var props = (0, _extends5.default)({}, (0, _echo2.default)((0, _extends5.default)({}, Component.defaultProps, modules[index], componentState), (0, _extends5.default)({}, state, this.state.data, componentState)));

      var Wrapper = wrapper || Wrap;

      return _react2.default.createElement(
        Wrapper,
        {
          state: this.state,
          length: modules.length,
          set: this.setState,
          simulatePush: function simulatePush() {
            return _this4.push(Component.simulate(props));
          }
        },
        _react2.default.createElement(Component, (0, _extends5.default)({}, props, {
          key: index,
          set: this.set,
          push: this.push,
          renderlessPush: this.renderlessPush
        }))
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