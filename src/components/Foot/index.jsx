import React from 'react';
import {BackTop, Layout} from 'antd';

const {Footer} = Layout;

const Foot = () =>
    <div>
        <BackTop/>
        <Footer style={{textAlign: 'center', background: '#fff'}}>Link Zhang ©2019-2099</Footer>
    </div>
;

export default Foot;
