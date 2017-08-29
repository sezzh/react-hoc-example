'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _DragWindowSystemCore2 = require('../DragWindowSystemCore/DragWindowSystemCore');

var _DragWindowSystemCore3 = _interopRequireDefault(_DragWindowSystemCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragWindow = function DragWindow(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_DragWindowSystemCore) {
    _inherits(DragWindowHOC, _DragWindowSystemCore);

    function DragWindowHOC(props) {
      _classCallCheck(this, DragWindowHOC);

      var _this = _possibleConstructorReturn(this, (DragWindowHOC.__proto__ || Object.getPrototypeOf(DragWindowHOC)).call(this, props));

      _this.defaultWindowStyles = {
        backgroundColor: '#fefefe',
        boxSizing: 'border-box',
        borderRadius: '.3rem',
        boxShadow: '0 0 1rem rgba(4, 4, 4, .3)',
        transition: 'opacity .25s ease-in-out, visibility .25s ease-in-out',
        overflow: 'hidden'
      };
      _this.defaultHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        padding: '1rem',
        cursor: '-webkit-grab',
        borderBottom: '0.06rem solid #9F9F9F'
      };
      _this.openStyle = {
        visibility: 'visible',
        opacity: '1'
      };
      _this.closeStyle = {
        visibility: 'hidden',
        opacity: '0'
      };
      _this.defaultButtonStyle = {
        color: '#094FA4',
        cursor: 'pointer',
        padding: '0 .25rem'
      };
      _this.defaultTitleStyles = {
        fontSize: '.88rem',
        textTransform: 'uppercase',
        margin: '0',
        color: '#094FA4'
      };
      _this.stateStyles = {
        auto: {
          position: 'fixed',
          zIndex: 'auto'
        },
        active: {
          position: 'fixed',
          zIndex: '10'
        },
        prev: {
          position: 'fixed',
          zIndex: '5'
        }
      };

      _this.getWindowStyles = function () {
        if (_this.state.open) {
          return Object.assign({}, _this.stateStyles[_this.state.pos], _this.props.windowStyles || _this.defaultWindowStyles, _this.openStyle);
        }

        return Object.assign({}, _this.stateStyles[_this.state.pos], _this.props.windowStyles || _this.defaultWindowStyles, _this.closeStyle);
      };

      _this.getHeaderStyles = function () {
        if (_this.props.headerComponent === void 0) {
          return Object.assign({}, _this.defaultHeaderStyle);
        }
      };

      _this.getTitleStyles = function () {
        if (_this.props.headerComponent === void 0) {
          return Object.assign({}, _this.defaultTitleStyles);
        }
      };

      _this.getButtonStyles = function () {
        if (_this.props.headerClass === void 0) {
          return Object.assign({}, _this.defaultButtonStyle);
        }
      };

      _this.handlerStart = function (event) {
        _this.componentChannel.emit('active-window', _this.refComponent.dataset.name);
      };

      _this.handlerOnClick = function (event) {
        if (event.target.dataset.dragwindow) {
          if (event.target.dataset.dragwindow === 'close') {
            _this.windowOnClose();
          }
        } else {
          if (!_this.refComponentHeader.contains(event.target)) {
            _this.handlerStart(event);
          }
        }
      };

      _this.updateWindowState = function (windowsState) {
        _this.setState({ pos: windowsState[_this.props.name] });
      };

      _this.handlerWindow = function (dragWindowName) {
        if (dragWindowName === _this.props.name) {
          if (_this.state.open) {
            _this.windowOnClose();
          } else {
            _this.handlerStart();
            _this.setState({ open: !_this.state.open });
          }
        }
      };

      _this.windowOnClose = function () {
        _this.componentChannel.emit('unregister-component', _this.refComponent.dataset.name);
        _this.setState({ open: false });
      };

      _this.state = {
        pos: 'auto',
        open: true
      };
      return _this;
    }

    _createClass(DragWindowHOC, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.refComponentHeader = this.refComponent.querySelector('.dragWindowHandler');
        this.componentChannel.emit('register-component', this.refComponent.dataset.name);
        this.componentChannel.addListener('update-window-state', this.updateWindowState);
        this.componentChannel.addListener('handle-window-state', this.handlerWindow);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.windowOnClose();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          _reactDraggable2.default,
          {
            handle: '.dragWindowHandler',
            onStart: this.handlerStart },
          _react2.default.createElement(
            'div',
            {
              onClick: this.handlerOnClick,
              style: this.getWindowStyles(),
              ref: function ref(component) {
                _this2.refComponent = component;
              },
              'data-name': this.props.name },
            _react2.default.createElement(
              'div',
              { className: 'dragWindowHandler' },
              this.props.headerComponent ? this.props.headerComponent : _react2.default.createElement(
                'header',
                {
                  style: this.getHeaderStyles() },
                _react2.default.createElement(
                  'h2',
                  { style: this.getTitleStyles() },
                  this.props.title
                ),
                _react2.default.createElement(
                  'div',
                  { 'data-dragwindow': 'close', style: this.getButtonStyles() },
                  'X'
                )
              )
            ),
            _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
              closeWindow: this.windowOnClose.bind(this) }))
          )
        );
      }
    }]);

    return DragWindowHOC;
  }(_DragWindowSystemCore3.default), _class.displayName = 'DragWindow' + (0, _recompose.getDisplayName)(WrappedComponent), _temp;
};

exports.default = DragWindow;