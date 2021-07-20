import React from 'react'
import ReactDOM from 'react-dom'
import Heading from './Heading'
import { Theme } from './Theme'
import Net1 from './data/Graph/American75.json'
import Net2 from './data/Graph/Caltech36.json'
import Net3 from './data/Graph/Bowdoin47.json'
import Net4 from './data/Graph/Wellesley22.json'
import Net5 from './data/Graph/USFCA72.json'
import Net6 from './data/Graph/Hamilton46.json'
import Net7 from './data/Graph/DE.json'

import SampledNet1 from './data/SampledGraph/American75_BFS.json'
// import SampledNet1 from './data/SampledGraph/American75_TIES.json'
// import SampledNet3 from './data/SampledGraph/Bowdoin47_BFS.json'
// import SampledNet3 from './data/SampledGraph/Bowdoin47_TIES.json'
import NodeProperty from './data/Node_Property/Node_Property_American75.json'
// import NodeProperty from './data/Node_Property/Node_Property_Bowdoin47.json'
// import NodeProperty from './data/Node_Property/Node_Property_Caltech36.json'
// import NodeProperty from './data/Node_Property/Node_Property_USFCA72.json'
// import NodeProperty from './data/SampledNode_Property/SampledNode_Property_Bowdoin47.json'
const heading = Theme.Heading
// const Node = Net['node']
// const Link = Net['edges']
export default class Right_top extends React.Component {
  state = {
    'Net': [Net1, Net2, Net3, Net4, Net5, Net6, Net7],
    'index': 0
  }
  constructor(props) {
    super(props)
    // this.canvas = React.createRef()
  }
  render() {

    const { width, height, float, fontfamily, border, borderradius, canvaswidth, canvasheight, svgheight, svgwidth } = this.props
    // const index = this.props.index
    const index = this.props.index
    const Net = this.state['Net'][6]
    // const Net = SampledNet3
    return (
      <div id="right_top" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'border': border,
        'borderRadius': borderradius,
      }}>
        <Heading title={'Node-Link Diagram'} data={heading}></Heading>
        {/* <canvas ref={this.canvas} width={canvaswidth} height={canvasheight}></canvas> */}
        <NetCanvas id="Canvas" onClick={this.change} svgwidth={svgwidth} svgheight={svgheight} canvaswidth={canvaswidth} canvasheight={canvasheight} Net={Net} index={index}></NetCanvas>
      </div>
    )
  }
  change = () => {
    console.log('Canvas Change!')
  }
}
class NetCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }
  componentDidMount() {
    const canvas = this.canvas.current
    const { Net } = this.props
    // 点位置
    const Node = Net['node']
    const Link = Net['link']
    // 点下标
    // const node_index = SampledNet3['nodes']
    const node_index = SampledNet1['nodes']
    // 边连接关系
    // const Link = SampledNet3['edges']
    // const Link = SampledNet1['edges']
    const { svgwidth, svgheight, canvaswidth, canvasheight } = this.props
    //  canvas = <canvas ref={this.canvas} width={canvaswidth} height={canvasheight}></canvas>

    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      (function () {
        // 画线
        Object.getPrototypeOf(ctx).line = function (x1, y1, x2, y2) {
          this.save();
          this.beginPath();
          this.moveTo(x1, y1);
          this.lineTo(x2, y2);
          this.stroke();
          this.restore();
        };
        // 画点
        Object.getPrototypeOf(ctx).dot = function (cx, cy, r) {
          this.save();
          this.beginPath();
          this.arc(cx, cy, r, 0, 2 * Math.PI);
          this.fill();
          this.stroke();
        }
      })();
      ctx.strokeStyle = 'lightgray'
      ctx.fillStyle = 'darkgrey'
      ctx.lineWidth = 0.04
      const padding = {
        'left': canvaswidth / 2 - svgwidth / 2,
        'top': canvasheight / 2 - svgheight / 2
      }
      // 绘制连线
      Link.map(item => {
        ctx.line(
          Node[item[0]][0] * svgwidth + padding['left'],
          Node[item[0]][1] * svgheight + padding['top'],
          Node[item[1]][0] * svgwidth + padding['left'],
          Node[item[1]][1] * svgheight + padding['top']
        )
      })
      // 绘制节点
      // 采样后
      // node_index.map((item, i) => {
      //   const x = Node[item][0] * svgwidth + padding['left']
      //   const y = Node[item][1] * svgheight + padding['top']
      //   const radius = 4
      //   ctx.fillStyle = NodeProperty[item][1] == 1 ? 'rgb(160,215,242)' : NodeProperty[item][1] == 2 ? '	rgb(217,179,221)' : 'darkgray'
      //   ctx.dot(x, y, radius)
      // })

      //  采样前
      Node.map((item, i) => {
        const x = item[0] * svgwidth + padding['left']
        const y = item[1] * svgheight + padding['top']
        const radius = 4
        // 渐变
        // const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        // const color_inner = NodeProperty[i][1] == 1 ? 'rgba(0,255,0,1)' : 'rgba(255,0,0,1)'
        // const color_outer = NodeProperty[i][1] == 1 ? 'rgba(0,255,0,0)' : 'rgba(255,0,0,0)'
        // gradient.addColorStop(0, color_inner)
        // gradient.addColorStop(1, color_outer)
        // ctx.fillStyle = gradient
        // ctx.fillStyle = NodeProperty[i][1] == 1 ? 'rgb(160,215,242)' : NodeProperty[i][1] == 2 ? 'rgb(217,179,221)' : 'darkgray'
        // ctx.globalAlpha = 0.4
        ctx.dot(x, y, radius)
      })

      // Node.map((item, i) => {
      //   const x = item[0] * svgwidth + padding['left']
      //   const y = item[1] * svgheight + padding['top']
      //   const radius = 4
      //   ctx.fillStyle = 'darkgray'
      //   ctx.globalAlpha = 0.4
      //   ctx.dot(x, y, radius)
      // })
    }
  }
  render() {
    const { canvaswidth, canvasheight, index } = this.props
    console.log('Canvas---render')
    return (
      <canvas ref={this.canvas} width={canvaswidth} height={canvasheight}></canvas>
    )
  }
}