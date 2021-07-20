import React from 'react'
import { Theme } from './Theme'
import Right_top from './Right_top'
import Right_down from './Right_down'
const right_top = Theme.Right_top
const right_down = Theme.Right_down
export default class Right extends React.Component {
  render() {
    const { width, height, float, fontfamily, marginleft, margintop } = this.props
    return (
      <div id="Right" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'marginLeft': marginleft,
        'marginTop': margintop,
      }}>
        <Right_top {...right_top} index={this.props.index}></Right_top>
        {/* <Right_down {...right_down}></Right_down> */}
      </div>
    )
  }
}