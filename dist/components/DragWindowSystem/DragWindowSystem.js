'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DragWindowSystemCore2 = require('../DragWindowSystemCore/DragWindowSystemCore');

var _DragWindowSystemCore3 = _interopRequireDefault(_DragWindowSystemCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragWindowSystem = function (_DragWindowSystemCore) {
  _inherits(DragWindowSystem, _DragWindowSystemCore);

  function DragWindowSystem(props) {
    _classCallCheck(this, DragWindowSystem);

    var _this = _possibleConstructorReturn(this, (DragWindowSystem.__proto__ || Object.getPrototypeOf(DragWindowSystem)).call(this, props));

    _this.handlerWindow = function (event) {
      if (event.target.dataset.dragwindow) {
        _this.componentChannel.emit('handle-window-state', event.target.dataset.dragwindow);
      }
    };

    _this.register = function (nodeName) {
      if (!_this.drags.hasOwnProperty(nodeName)) {
        _this.drags[nodeName] = 'auto';
      }
    };

    _this.unregister = function (nodeName) {
      delete _this.drags[nodeName];
    };

    _this.buildDragState = function (nodeName) {
      for (var prop in _this.drags) {
        if (_this.drags[prop] === 'prev') {
          _this.drags[prop] = 'auto';
        }
        if (_this.drags[prop] === 'active') {
          _this.drags[prop] = 'prev';
        }
      }
      _this.drags[nodeName] = 'active';
      _this.componentChannel.emit('update-window-state', _this.drags);
    };

    _this.drags = {};
    return _this;
  }

  _createClass(DragWindowSystem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.componentChannel.addListener('register-component', this.register);
      this.componentChannel.addListener('active-window', this.buildDragState);
      this.componentChannel.addListener('unregister-component', this.unregister);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { onClick: this.handlerWindow },
        this.props.children
      );
    }
  }]);

  return DragWindowSystem;
}(_DragWindowSystemCore3.default);

exports.default = DragWindowSystem;