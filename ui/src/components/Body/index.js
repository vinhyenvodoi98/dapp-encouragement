import React from 'react';
import { Tabs } from 'antd';
import Encouragement from '../Encouragement';
import Debug from '../Debug';

const { TabPane } = Tabs;

export default function Body() {
  return (
    <div className='container' style={{ textAlign: 'start' }}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Encourage' key='1'>
          <Encouragement />
        </TabPane>
        <TabPane tab='Debug' key='2'>
          <Debug />
        </TabPane>
      </Tabs>
    </div>
  );
}
