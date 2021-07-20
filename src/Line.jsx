import React from 'react'
class Line extends React.Component {
  render() {
    const svgheight = parseInt(this.props.svgheight)
    const svgwidth = parseInt(this.props.svgwidth)
    const position = this.props.position
    const source = position[this.props[0]]
    const target = position[this.props[1]]
    const x1 = svgwidth * source[0]
    const y1 = svgheight * source[1]
    const x2 = svgwidth * target[0]
    const y2 = svgheight * target[1]
    return <line className="link" x1={x1} y1={y1} x2={x2} y2={y2} stroke={'lightgray'} strokeWidth={0.5}></line>
  }
}