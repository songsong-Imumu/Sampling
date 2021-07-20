import React from 'react'
export default class Circle extends React.Component {
  render() {
    const svgheight = parseInt(this.props.svgheight)
    const svgwidth = parseInt(this.props.svgwidth)
    const x = this.props[0] * svgwidth
    const y = this.props[1] * svgheight
    return <circle className="node" cx={x} cy={y} r={4} fill={'darkgray'}></circle>;
  }
}