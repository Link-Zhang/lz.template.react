import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Spin, Layout, message} from 'antd';
import Bread from '../Bread';
import Foot from '../Foot';
import Head from '../Head';
import Login from '../Login';
import Sidebar from '../Side';
import ajax from '../../utils/ajax';
import {loginSuccessActionCreator} from '../../acirs/User';
import {appLoadedActionCreator} from '../../acirs/App';
import './index.css';

const {Content} = Layout;

class App extends React.Component {
    static async wait(seconds) {
        try {
            await new Promise(resolve => setTimeout(resolve, seconds * 1000));
        } catch (e) {
            console.log(e);
        }
    }

    static async validate(token) {
        try {
            return await ajax.validation(token);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        App.wait(0.5).then(
            res => {
                const token = window.localStorage.getItem('jwt');
                if (token) {
                    message.destroy();
                    const hide = message.loading('正在验证用户信息...', 0);
                    App.validate(token).then(
                        res => {
                            hide();
                            if (res.success) {
                                message.destroy();
                                message.success('用户信息验证成功', 1);
                                this.props.handleLoginSuccess(res.username, res.token);
                            } else {
                                message.destroy();
                                message.error('用户信息验证失败: 请重新登录！');
                            }
                        }
                    ).catch(
                        () => {
                            hide();
                            message.destroy();
                            message.error('无法验证用户信息， 请重新登录！');
                        }
                    )
                }
                this.props.handleAppLoaded();
            }
        );
    }

    renderContent() {
        return (
            <Content style={
                {margin: '0px 16px', overflow: 'initial'}
            }>
                <Bread routes={this.props.routes}/>
                <div style={{minHeight: 750}}>
                    {this.props.children}
                </div>
            </Content>
        );
    }

    render() {
        if (!this.props.loading) {
            //加载成功
            // if (!this.props.authorization || !this.props.username || this.props.username === '未登录') {
            //     //需要登录
            //     return <Login/>
            // }
            return (
                <Layout style={{minHeight: '100vh'}}>
                    <Sidebar/>
                    <Layout>
                        <Head/>
                        {this.renderContent()}
                        <Foot/>
                    </Layout>
                </Layout>
            );
        }
        return <div className="center-div"><Spin spinning={true} size="large"/></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.App.loading,//应用加载中
        authorization: state.User.authorization, //授权情况
        username: state.User.username, //用户名
        token: state.User.token, // token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLoginSuccess: bindActionCreators(loginSuccessActionCreator, dispatch), //用户登录
        handleAppLoaded: bindActionCreators(appLoadedActionCreator, dispatch), //应用加载
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
