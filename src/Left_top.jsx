import React from 'react'
import Heading from './Heading'
import { Table } from 'antd'
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css'
import { Theme } from './Theme'

import Net1 from './data/Graph/American75.json'
import Net2 from './data/Graph/Caltech36.json'
import Net3 from './data/Graph/Bowdoin47.json'
import Net4 from './data/Graph/Wellesley22.json'
import Net5 from './data/Graph/USFCA72.json'
import Net6 from './data/Graph/Hamilton46.json'

import SampledNet1 from './data/SampledGraph/American75_BFS.json'
// import SampledNet1 from './data/SampledGraph/American75_TIES.json'
// import SampledNet3 from './data/SampledGraph/Bowdoin47_BFS.json'
// import SampledNet3 from './data/SampledGraph/Bowdoin47_TIES.json'

const heading = Theme.Heading
export default class Left_top extends React.Component {
  state = {
    'Net': [Net1, Net2, Net3, Net4, Net5, Net6],
    'index': 0,
  }
  change = () => {
    const index = this.selectOption.selectedIndex
    this.setState({ 'index': index })
    // 子组件向父组件传值
    this.props.callback({ 'index': index })
  }
  render() {
    const { index } = this.state
    const Net = this.state['Net'][index]
    const Node = Net['node']
    const Link = Net['link']
    const SampledNode = SampledNet1['nodes']
    const SampledLink = SampledNet1['edges']
    const dataSource = [
      {
        key: '1',
        situa: 'Origin:',
        nodes: Node.length,
        edges: Link.length,
        community: '',
      },
      {
        key: '2',
        situa: 'Sample:',
        nodes: SampledNode.length,
        edges: SampledLink.length,
        community: ''
      }
    ];

    const columns = [
      {
        title:
          <select outline="none" id="select" ref={value => this.selectOption = value} onChange={this.change}>
            <option>American75</option>,
            <option>Caltech36</option>,
            <option selected>Bowdoin47</option>,
            <option>USFCA72</option>,
            <option>Wellesley22</option>,
            <option>Hamilton46</option>
          </select>,
        dataIndex: 'situa',
        key: 'situa'
      },
      {
        title: 'Nodes',
        dataIndex: 'nodes',
        key: 'nodes',
      },
      {
        title: 'Edges',
        dataIndex: 'edges',
        key: 'edges',
      },
      {
        title: 'Community',
        dataIndex: 'community',
        key: 'community',
      },
    ];


    const { width, height, float, fontfamily, border, borderradius } = this.props
    return (
      <div id="left_top" style={{
        'width': width,
        'height': height,
        'float': float,
        'fontFamily': fontfamily,
        'border': border,
        'borderRadius': borderradius,
      }}><Heading title={'Data View'} data={heading}></Heading>
        {/* <Button onClick={this.change}>Hello world</Button> */}
        {/* <Button type="primary">Primary Button</Button>
        <Switch checkedChildren="☀" unCheckedChildren="🌙" defaultChecked /> */}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    )
  }
}