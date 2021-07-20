import React from 'react'
import Heading from './Heading'
import { Theme } from './Theme'
import { Button } from 'antd'
import 'antd/dist/antd.css'
const heading = Theme.Heading
export default class Left_mid extends React.Component {
  render() {
    const { width, height, float, fontfamily, border, margintop, borderradius } = this.props
    return (
      <div id="left_mid" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'border': border,
        'marginTop': margintop,
        'borderRadius': borderradius,
      }}>
        <Heading title={'Control Panel'} data={heading}></Heading>
        <select style={{ 'marginTop': '5px', 'marginLeft': '5px', 'width': "200px", 'float': 'left' }}>
          <option>Random Node</option>
          <option>Random Edge</option>
          <option>Random Walk</option>
          <option>BFS</option>
          <option>MHRW</option>
          <option>TIES</option>
        </select>
        <Button type="" style={{ 'width': '220px', 'height': '30px', 'marginTop': '226px', 'float': 'right', 'marginRight': '5px', 'textAlign': 'center' }}>Sampling</Button>
        <Button type="" style={{ 'width': '220px', 'height': '30px', 'marginTop': '196px', 'float': 'left', 'marginLeft': '5px', 'textAlign': 'center' }}>Draw</Button>
      </div>
    )
  }
}