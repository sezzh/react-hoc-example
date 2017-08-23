import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
      this.forceUpdate()
    }

    render () {
      const newProps = Object.assign({}, this.props, {ref: this.getRef.bind(this)})
      return (
        <WrappedComponent {...newProps} {...this.title} />
      )
    }
  }
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



ReactDOM.render(<ComponentePP title={'bebi'} />, document.getElementById('root'))
ReactDOM.render(<ComponenteII title={'bebiII'} anotherProp={'anotherProp'} />, document.getElementById('root-ii'))
registerServiceWorker();
