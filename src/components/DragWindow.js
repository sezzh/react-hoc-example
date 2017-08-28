import React from 'react'
import { getDisplayName } from 'recompose'
import Draggable from 'react-draggable'

import DragWindowSystemCore from './DragWindowSystemCore'

const DragWindow = (WrappedComponent) => {
  return class DragWindowHOC extends DragWindowSystemCore {

    static displayName = `DragWindow${getDisplayName(WrappedComponent)}`

    defaultWindowStyles = {
      boxSizing: 'border-box',
      borderRadius: '.3rem',
      boxShadow: '0 0 1rem rgba(4, 4, 4, .3)',
      transition: `opacity .25s ease-in-out, visibility .25s ease-in-out`,
      overflow: 'hidden'
    }

    defaultHeaderStyle = {
      boxSizing: 'border-box',
      width: '100%',
      padding: '.5rem',
      cursor: '-webkit-grab',
      backgroundColor: 'olive'
    }

    openStyle = {
      visibility: 'visible',
      opacity: '1'
    }

    closeStyle = {
      visibility: 'hidden',
      opacity: '0'
    }

    defaultButtonStyle = {
      backgroundColor: 'teal',
      cursor: 'pointer'
    }

    stateStyles = {
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
    }

    constructor (props) {
      super(props)
      this.state = {
        pos: 'auto',
        open: false
      }
    }

    getWindowStyles = () => {
      if (this.state.open) {
        return Object.assign(
          {}, this.stateStyles[this.state.pos],
          this.props.windowStyles || this.defaultWindowStyles,
          this.openStyle
        )
      }

      return Object.assign(
        {}, this.stateStyles[this.state.pos],
        this.props.windowStyles || this.defaultWindowStyles,
        this.closeStyle
      )
    }

    getHeaderStyles = () => {
      if (this.props.headerClass === void (0)) {
        return Object.assign(
          {}, this.defaultHeaderStyle
        )
      }
    }

    getButtonStyles = () => {
      if (this.props.headerClass === void (0)) {
        return Object.assign(
          {}, this.defaultButtonStyle
        )
      }
    }

    componentDidMount () {
      this.refComponentHeader = this.refComponent.querySelector('.dragWindowHandler')
      this.componentChannel.emit(
        'register-component', this.refComponent.dataset.name
      )
      this.componentChannel.addListener('update-window-state', this.updateWindowState)
      this.componentChannel.addListener('handle-window-state', this.handlerWindow)
    }

    componentWillUnmount () {
      this.windowOnClose()
    }

    handlerStart = (event) => {
      this.componentChannel.emit(
      'active-window', this.refComponent.dataset.name
      )
    }

    handlerOnClick = (event) => {
      if (event.target.dataset.dragwindow) {
        if (event.target.dataset.dragwindow === 'close') {
          this.windowOnClose()
        }
      } else {
        if (!this.refComponentHeader.contains(event.target)) {
          this.handlerStart(event)
        }
      }
    }

    updateWindowState = (windowsState) => {
      this.setState({pos: windowsState[this.props.name]})

    }

    handlerWindow = (dragWindowName) => {
      if (dragWindowName === this.props.name) {
        this.setState({open: !this.state.open})
      }
    }

    windowOnClose = () => {
      this.componentChannel.emit(
        'unregister-component', this.refComponent.dataset.name
      )
      this.setState({open: false})
    }

    render () {
      return (
        <Draggable
          handle={'.dragWindowHandler'}
          onStart={this.handlerStart}>
          <div
            onClick={this.handlerOnClick}
            style={this.getWindowStyles()}
            ref={(component) => {this.refComponent = component}}
            data-name={this.props.name}>
            <div className='dragWindowHandler'>
              {
                (this.props.headerComponent)
              ? this.props.headerComponent
              : (<header
                  style={this.getHeaderStyles()}>
                  <h2>{this.props.title}</h2>
                  <div data-dragwindow='close' style={this.getButtonStyles()}>
                  x
                  </div>
                </header>)
              }
            </div>
            <WrappedComponent
              {...this.props}
              closeWindow={this.windowOnClose.bind(this)} />
          </div>
        </Draggable>
      )
    }
  }
}

export default DragWindow
