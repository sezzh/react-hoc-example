import React, { Component } from 'react';

import { DragWindow, DragWindowSystem } from './dist/index'

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


class WithHeader extends Component {
  render () {
    return (
      <div>
        <header>nuestro lazo que motiva dar paso mas<button data-dragwindow='close'>close</button></header>
        <div>
          component content
        </div>
        <div>
          component content3
        </div>
      </div>
    )
  }
}

class AnotherComponent extends Component {
  render () {
    return (
      <div>
        <h1>Esto es otro componente</h1>
        <button onClick={this.props.closeWindow}>testing</button>
      </div>
    )
  }
}

class Panel extends Component {
  render () {
    return (
      <div>
        <h1>Una en el día y la otra en la noche</h1>
        <section>
          botonera más anidada
          <div>
            <button data-dragwindow='DragExample2'>abre DragExample2</button>
          </div>
        </section>
      </div>
    )
  }
}


const Dummy = DragWindow(DummyComponent)

const NominaWindow = DragWindow(Nomina)

const AnotherComponentWindow = DragWindow(AnotherComponent)

const WithHeaderWindow = DragWindow(WithHeader)


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
              <button data-dragwindow='DragExample3'>abre DragExample3</button>
              <button data-dragwindow='DragExample4'>abre DragExample3</button>
              <button data-dragwindow='DragExample5'>abre DragExample5</button>
            </div>
            <Panel />
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
                  <button data-dragwindow='close'>close</button>
                </div>
              )} />
          </div>
          <div>
            <AnotherComponentWindow
              name={'DragExample3'} />
          </div>
          <div>
            <NominaWindow
              name={'DragExample4'} />
          </div>
          <WithHeaderWindow name={'DragExample5'}/>
        </DragWindowSystem>
      </div>
    );
  }
}

export default App;
