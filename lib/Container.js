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

var _extends9 = require('babel-runtime/helpers/extends');

var _extends10 = _interopRequireDefault(_extends9);

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
    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this));

    _this.push = function (response) {
      var _extends3;

      var index = _this.state.index + 1;
      var mutations = _this.state.data ? _this.state.data.mutations ? _this.state.data.mutations : {} : {};
      for (var k in response) {
        if (k in _this.state.data) {
          mutations[k] = (0, _extends10.default)({}, mutations[k], (0, _defineProperty3.default)({}, Date.now(), _this.state.data[k]));
        }
      }
      var newData = (0, _extends10.default)({}, response, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, 'module_' + _this.state.index + '_t', Date.now()), (0, _defineProperty3.default)(_extends3, 'module_' + _this.state.index + '_component', _this.props.modules[_this.state.index].component), _extends3));
      _this.setState(function (state) {
        return {
          data: (0, _extends10.default)({}, state.data, newData, {
            mutations: mutations
          }),
          componentState: {},
          index: index
        };
      }, function () {
        document.querySelector('.main').scrollTop = 0;
        history.pushState(_this.state.index, _this.state.title, '?index=' + _this.state.index);
        sessionStorage.setItem(_this.state.index, (0, _stringify2.default)(_this.state));
        var endpoint = (0, _echo2.default)(_this.state.data.endpoint, _this.state.data);
        try {
          (0, _firePush2.default)(endpoint, _this.state.data.fireKey, newData, index);
        } catch (e) {
          console.error(e);
          _this.setState({
            data: (0, _extends10.default)({}, _this.state.data, {
              firefail: true
            })
          });
        }
      });
    };

    _this.renderlessPush = function (response) {
      var _extends5;

      var index = _this.state.index + 1;
      var mutations = _this.state.data ? _this.state.data.mutations ? _this.state.data.mutations : {} : {};
      for (var k in response) {
        if (k in _this.state.data) {
          mutations[k] = (0, _extends10.default)({}, mutations[k], (0, _defineProperty3.default)({}, Date.now(), _this.state.data[k]));
        }
      }
      var newData = (0, _extends10.default)({}, response, (_extends5 = {}, (0, _defineProperty3.default)(_extends5, 'module_' + _this.state.index + '_t', Date.now()), (0, _defineProperty3.default)(_extends5, 'module_' + _this.state.index + '_component', _this.props.modules[_this.state.index].component), _extends5));
      _this.setState(function (state) {
        return {
          data: (0, _extends10.default)({}, state.data, newData, {
            mutations: mutations
          }),
          index: index
        };
      }, function () {
        try {
          var endpoint = (0, _echo2.default)(_this.state.data.endpoint, _this.state.data);
          (0, _firePush2.default)(endpoint, _this.state.data.fireKey, newData, index);
        } catch (e) {
          console.error(e);
          _this.setState({
            data: (0, _extends10.default)({}, _this.state.data, {
              firefail: true
            })
          });
        }
      });
    };

    _this.set = function (data) {
      _this.setState(function (state) {
        return {
          componentState: (0, _extends10.default)({}, state.componentState, data)
        };
      });
    };

    _this.simulateTo = function (index, withData) {
      _this.setState(function (state) {
        var _this$props = _this.props,
            modules = _this$props.modules,
            components = _this$props.components;

        var simulated = (0, _simulateOver2.default)(state.data, modules.slice(0, index), components);
        return {
          data: (0, _extends10.default)({}, simulated, withData),
          index: simulated.index
        };
      });
    };

    _this.state = {
      index: 0,
      title: 'Survey',
      componentState: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Container, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var params = (0, _lodash2.default)(location.search.slice(1).split('&')).map(function (item) {
        return item.split('=');
      }).fromPairs().value();

      this.setState({
        data: (0, _extends10.default)({
          start: Date.now(),
          endpoint: null
        }, this.props.state, params)
      });

      window.onpopstate = function (event) {
        var backState = JSON.parse(sessionStorage.getItem(event.state));
        var browserHistory = _this2.state.data ? _this2.state.data.browserHistory ? _this2.state.data.browserHistory : {} : {};

        var mutations = _this2.state.data ? _this2.state.data.mutations ? _this2.state.data.mutations : {} : {};
        for (var k in backState.data) {
          if (_this2.state.data[k] !== backState.data[k] && k !== 'mutations') {
            console.log(k, _this2.state.data[k], backState.data[k]);
            mutations[k] = (0, _extends10.default)({}, mutations[k], (0, _defineProperty3.default)({}, Date.now(), _this2.state.data[k]));
          }
        }

        _this2.setState((0, _extends10.default)({}, backState, {
          data: (0, _extends10.default)({}, backState.data, {
            mutations: mutations,
            browserHistory: (0, _extends10.default)({}, browserHistory, (0, _defineProperty3.default)({}, Date.now(), {
              pop: event.state
            }))
          })
        }));
      };

      if (+params.simto) {
        this.simulateTo(params.simto, params);
      }

      if (params.index) {
        var backState = JSON.parse(sessionStorage.getItem(params.index));
        var browserHistory = this.state.data ? this.state.data.browserHistory ? this.state.data.browserHistory : {} : {};
        this.setState((0, _extends10.default)({}, backState, {
          data: (0, _extends10.default)({}, backState.data, {
            browserHistory: (0, _extends10.default)({}, browserHistory, (0, _defineProperty3.default)({}, Date.now(), {
              load: params.index
            }))
          })
        }));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      document.title = this.state.title;
      history.pushState(this.state.index, this.state.title, location.search);
      sessionStorage.setItem(this.state.index, (0, _stringify2.default)(this.state));(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var endpoint, fireKey;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this3.state.data.endpoint) {
                  _context.next = 5;
                  break;
                }

                console.log('Warning! No endpoint');
                if (_this3.state.data.endpoint === false) {
                  _this3.setState({
                    data: (0, _extends10.default)({}, _this3.state.data, {
                      fireKey: 500
                    })
                  });
                }
                _context.next = 18;
                break;

              case 5:
                if (_this3.state.data.fireKey) {
                  _context.next = 18;
                  break;
                }

                _context.prev = 6;
                endpoint = (0, _echo2.default)(_this3.state.data.endpoint, _this3.state.data);
                _context.next = 10;
                return (0, _firePush2.default)(endpoint, _this3.state.data.fireKey, _this3.state.data);

              case 10:
                fireKey = _context.sent;

                _this3.setState({
                  data: (0, _extends10.default)({}, _this3.state.data, {
                    fireKey: fireKey
                  })
                });
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](6);

                console.error(_context.t0);
                _this3.setState({
                  data: (0, _extends10.default)({}, _this3.state.data, {
                    firefail: true
                  })
                });

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this3, [[6, 14]]);
      }))();
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
      var props = (0, _extends10.default)({}, (0, _echo2.default)((0, _extends10.default)({}, Component.defaultProps, modules[index], componentState), (0, _extends10.default)({}, state, this.state.data, componentState)));

      var Wrapper = wrapper || Wrap;

      return _react2.default.createElement(
        Wrapper,
        {
          state: this.state,
          length: modules.length,
          simulatePush: function simulatePush() {
            return _this4.push(Component.simulate(props));
          }
        },
        this.state.data.fireKey ? _react2.default.createElement(Component, (0, _extends10.default)({}, props, {
          key: index,
          index: index,
          data: this.state.data,
          set: this.set,
          push: this.push,
          renderlessPush: this.renderlessPush
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