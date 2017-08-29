'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emitter = require('./lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragWindowSystemCore = function (_Component) {
  _inherits(DragWindowSystemCore, _Component);

  function DragWindowSystemCore(props) {
    _classCallCheck(this, DragWindowSystemCore);

    var _this = _possibleConstructorReturn(this, (DragWindowSystemCore.__proto__ || Object.getPrototypeOf(DragWindowSystemCore)).call(this, props));

    _this.componentChannel = _emitter2.default;
    return _this;
  }

  return DragWindowSystemCore;
}(_react.Component);

exports.default = DragWindowSystemCore;