import React from 'react'
import DragWindowSystemCore from './DragWindowSystemCore'

export default class DragWindowSystem extends DragWindowSystemCore {
  constructor(props) {
    super(props)
    this.drags = {}
  }

  componentWillMount () {
    this.componentChannel.addListener('register-component', this.register)
    this.componentChannel.addListener('active-window', this.buildDragState)
    this.componentChannel.addListener('unregister-component', this.unregister)
  }

  handlerWindow = (event) => {
    if (event.target.dataset.dragwindow) {
      this.componentChannel.emit(
        'handle-window-state', event.target.dataset.dragwindow
      )
    }
  }

  register = (nodeName) => {
    if (!this.drags.hasOwnProperty(nodeName)) {
      this.drags[nodeName] = 'auto'
    }
  }

  unregister = (nodeName) => {
    delete this.drags[nodeName]
  }

  buildDragState = (nodeName) => {
    for (var prop in this.drags) {
      if (this.drags[prop] === 'prev') {
        this.drags[prop] = 'auto'
      }
      if (this.drags[prop] === 'active') {
        this.drags[prop] = 'prev'
      }
    }
    this.drags[nodeName] = 'active'
    this.componentChannel.emit('update-window-state', this.drags)
  }

  render () {
    return (
      <div onClick={this.handlerWindow}>
        {this.props.children}
      </div>
    )
  }

}
