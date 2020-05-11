import React from 'react';

import { Layout } from 'antd';

import Navbar from './components/Navbar';
import Body from './components/Body';
import Application from './contexts/Application';

import './App.css';

const { Header, Content } = Layout;
function App() {
  return (
    <Layout className='App'>
      {/* Setup for socket */}
      <Application />
      {/* UI */}
      <Header>
        <Navbar />
      </Header>
      <Layout>
        <Content>
          <Body />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
