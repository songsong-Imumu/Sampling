import React from 'react'
export default class Heading extends React.Component {
  render() {
    const { height, width, background, color, float, fontSize, padding, fontweight } = this.props.data
    return (
      <div className="Heading" style={{
        'height': height,
        'width': width,
        'background': background,
        'color': color,
        'float': float,
        'fontSize': fontSize,
        'padding': padding,
        'fontWeight': fontweight
      }}><span style={{ 'marginLeft': '5px', 'marginTop': '15px' }}>{this.props.title}</span>
      </div>
    )
  }
}