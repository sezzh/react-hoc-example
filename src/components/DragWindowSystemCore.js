import React, { Component } from 'react'
import ee from '../lib/emitter'

export default class DragWindowSystemCore extends Component {
  constructor(props) {
    super(props)
    this.componentChannel = ee
  }
}
