import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getDisplayName } from 'recompose'

class Bebi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unValor: 'el valor'
    }
  }

  bebiMethod = () => {
    console.log('esto es bebi method');
    return this.state.unValor
  }

  render () {
    return (
      <div>{this.props.title}</div>
    )
  }
}

class Main extends React.Component {
    constructor (props) {
    super(props)
  }
  render () {
    return (
      ppHOC(Bebi)
    )
  }
}

// HOC by PP Proxy Properties
function ppHOC (WrappedComponent) {
  return class Hocquito extends React.Component {
    // this renames the component cuz its name is lost when you pass it as argument.
    static displayName = `HOC${getDisplayName(WrappedComponent)}`
    constructor (props) {
      super(props)
    }

    getRef (componentInstance) {
      this.componentChild = componentInstance
      //this.componentChild.props.title = 'holi boli'
    }

    componentDidMount () {
      console.log('componente montado')
      console.log(this.componentChild)

      this.title = {
        title: 'un nuevo titulo'
      }
    }

    render () {
      const newProps = Object.assign({}, this.props, {ref: this.getRef.bind(this)})
      return (
        <WrappedComponent {...newProps} {...this.title} />
      )
    }
  }
}

function HOCFactoryFactory (factoryParam, b, ...params) {
  return ppHOC
}

// HOc by II Inheritance Inversion
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {

    componentDidMount () {
    }

    render () {
      return super.render()
    }
  }
}

const ComponenteII = iiHOC(Bebi)

const ComponentePP = ppHOC(Bebi)
const ComponentePPWithFactory = HOCFactoryFactory(
  'parametro1', {'parametro2': 'valor parametro2'}, 'parametro 3'
)(Bebi)



ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();
