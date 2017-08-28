import React, { Component } from 'react';

import DragWindowSystem from './components/DragWindowSystem'
import DragWindow from './components/DragWindow'

import logo from './logo.svg';
import './App.css';

class DummyComponent extends Component {
  render () {
    return (
      <div>
        <div className={'dragExampleContent  contentP'}>{this.props.name}</div>
        <div>Yo también quiero una mac :c</div>
        <div>{this.props.content}</div>
      </div>
    )
  }
}

class Nomina extends Component {

  handlerClick = () => {
    console.log('clicked');
  }
  render () {
    return (
      <div>
        <div className={'dragExampleContent  contentP'}>{this.props.name}</div>
        <div>esto es un contenido de nomina</div>
        <button onClick={this.handlerClick}>botoncito</button>
      </div>
    )
  }
}

const Dummy = DragWindow(DummyComponent)

const NominaWindow = DragWindow(Nomina)


class App extends Component {

  state = {
    testingProp : 'esto es content por default'
  }

  testingBubling = (event) => {
    this.setState({'testingProp': 'este es el nuevo content'})
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
        <DragWindowSystem>
          <div>
            <h1>Botonera</h1>
            <div>
              <button onClick={this.testingBubling} data-dragwindow='DragExample1'>
                abre DragExample1
              </button>
            </div>
          </div>

          <div>
            <Dummy
              name={'DragExample1'}
              title='Esto es un titulo'
              content={this.state.testingProp} />
          </div>
          <div>
            <Dummy
              name={'DragExample2'}
              headerComponent={(
                <div>
                  <h2>Header Component as prop</h2>
                  <button data-drag-window='close'>close</button>
                </div>
              )} />
          </div>
          <div>
            <NominaWindow
              name={'DragExample3'} />
          </div>
          <div>
            <NominaWindow
              name={'DragExample4'} />
          </div>
        </DragWindowSystem>
      </div>
    );
  }
}

export default App;
