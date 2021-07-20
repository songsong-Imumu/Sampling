import React from 'react'
import Heading from './Heading'
import { Theme } from './Theme'
const heading = Theme.Heading
export default class Left_down extends React.Component {
  render() {
    const { width, height, float, fontfamily, border, margintop, borderradius } = this.props
    return (
      <div id="left_down" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'border': border,
        'marginTop': margintop,
        'borderRadius': borderradius,
      }}>
        <Heading title={'Metric Difference'} data={heading}></Heading>
      </div>
    )
  }
}