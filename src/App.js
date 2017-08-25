import React, { Component } from 'react';
import Draggable from 'react-draggable'
import { getDisplayName } from 'recompose'
import logo from './logo.svg';
import './App.css';

const DragWindow = (WrappedComponent) => {
  return class DragWindowHOC extends Component {

    static displayName = `DragWindow${getDisplayName(WrappedComponent)}`

    constructor (props) {
      super(props)
    }

    handlerStart = (event) => {
      this.props.handlerDragStart(this.refComponent.dataset.name)
    }

    componentDidMount () {
      this.props.register(this.refComponent)
    }

    componentWillUnmount () {
      this.windowOnClose()
    }

    windowOnClose = () => {
      this.props.unregister(this.props.name)
    }

    render () {
      const pos = this.props.drags[this.props.name]
      const selectedStyle = {
        zIndex: '10'
      }
      const prevStyle = {
        zIndex: '9'
      }
      return (
        <Draggable
          handle={'.handler'}
          onStart={this.handlerStart}>
          <div
            onClick={this.handlerStart}
            style={
              (pos === 'active')
              ? selectedStyle
              : (pos === 'prev')
              && prevStyle
            }
            ref={(component) => {this.refComponent = component}}
            data-name={this.props.name}
            className={
              (pos === 'active')
                ? `dragExampleContainer primary isDragging`
                : `dragExampleContainer primary`
            }>
            <div className={'handler'}>Drag from here</div>
            <WrappedComponent {...this.props} />
          </div>
        </Draggable>
      )
    }
  }
}





class DummyComponent extends Component {
  render () {
    return (
      <div>
        <div className={'dragExampleContent  contentP'}>{this.props.name}</div>
        <div>Yo también quiero una mac :c</div>
      </div>
    )
  }
}

class Nomina extends Component {
  render () {
    return (
      <div>
        <div className={'dragExampleContent  contentP'}>{this.props.name}</div>
        <div>Componente de Nomina</div>
      </div>
    )
  }
}

const Dummy = DragWindow(DummyComponent)

const NominaWindow = DragWindow(Nomina)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      drags: {}
    }
    this.drags = {}
  }

  register = (node) => {
    if (!this.drags.hasOwnProperty(node.dataset.name)) {
      this.drags[node.dataset.name] = 'auto'
    }
  }

  handlerDragStart = (nodeName) => {
    this.buildDragState(nodeName)
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
    this.setState({drags: this.drags})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="draggableSpace">
          <div>
            <Dummy
              name={'DragExample1'}
              drags={this.state.drags}
              handlerDragStart={this.handlerDragStart}
              register={this.register} />
          </div>
          <div>
            <Dummy
              name={'DragExample2'}
              drags={this.state.drags}
              handlerDragStart={this.handlerDragStart}
              register={this.register}  />
          </div>
          <div>
            <NominaWindow
              name={'DragExample3'}
              drags={this.state.drags}
              handlerDragStart={this.handlerDragStart}
              register={this.register}  />
          </div>
          <div>
            <NominaWindow
              name={'DragExample4'}
              drags={this.state.drags}
              handlerDragStart={this.handlerDragStart}
              register={this.register}  />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
