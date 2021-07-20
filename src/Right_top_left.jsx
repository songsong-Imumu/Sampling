import React from 'react'
import Heading from './Heading'
import { Theme } from './Theme'
const heading = Theme.Heading
export default class Right_top_left extends React.Component {
  render() {
    const { width, height, float, fontfamily, border, borderradius } = this.props
    return (
      <div id="right_top_left" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'border': border,
        'borderRadius': borderradius,
      }}>
        <Heading title={'2'} data={heading}></Heading>
      </div>
    )
  }
}