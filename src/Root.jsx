import React from 'react'
import { Theme } from './Theme'
import Left from './Left'
import Right from './Right'
const root = Theme.Root
const left = Theme.Left
const right = Theme.Right
export default class Root extends React.Component {
  state = { 'index': 0 }
  render() {
    const { width, height, position, fontfamily } = root
    return (
      <div className="Root" style={{
        'width': width,
        'height': height,
        'position': position,
        'fontFamily': fontfamily
      }}>
        <Left {...left} callback={this.getVal}></Left>
        <Right {...right} index={this.state['index']}></Right>
      </div>
    )
  }
  getVal = (d) => {
    const { index } = d
    this.setState({ 'index': index })
  }
}