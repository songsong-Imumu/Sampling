import React from 'react'
import { Theme } from './Theme'
import Left_top from './Left_top'
import Left_mid from './Left_mid'
import Left_down from './Left_down'
const left_top = Theme.Left_top
const left_mid = Theme.Left_mid
const left_down = Theme.Left_down
export default class Left extends React.Component {
  state = { 'index': 0 }
  render() {
    const { width, height, float, fontfamily, marginleft, margintop } = this.props
    return (
      <div id="Left" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'marginLeft': marginleft,
        'marginTop': margintop,
      }}>
        <Left_top {...left_top} callback={this.getVal}></Left_top>
        <Left_mid {...left_mid}></Left_mid>
        <Left_down {...left_down}></Left_down>
      </div>
    )
  }
  // 收到子组件的值
  getVal = (d) => {
    const { index } = d
    this.setState({ 'index': index })
    this.props.callback({ 'index': index })
  }
}