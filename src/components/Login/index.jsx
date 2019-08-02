import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Form, Icon, Input, Checkbox, message} from 'antd';
import './index.css';
import globalConfig from '../../config';
import ajax from '../../utils/ajax';
import {loginSuccessActionCreator} from '../../acirs/User';


class Login extends React.PureComponent {
    emptyUsername = () => {
        this.props.form.setFieldsValue({
            username: '',
        });
    };

    async login(username, password) {
        try {
            return await ajax.login(username, password);
        } catch (e) {
            console.log(e);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        message.destroy();
        const hide = message.loading('正在验证...', 0);
        const {getFieldsValue} = this.props.form;
        this.login(getFieldsValue().username, getFieldsValue().password).then(
            res => {
                this.props.form.setFieldsValue({
                    password: ''
                });
                hide();
                if (res.success) {
                    message.destroy();
                    message.success('登录成功', 1);
                    this.props.handleLoginSuccess(res.username, res.token);
                } else {
                    message.destroy();
                    message.error('登录失败: 用户或密码错误');
                }
            }
        ).catch(
            () => {
                this.props.form.setFieldsValue({
                    password: ''
                });
                hide();
                message.destroy();
                message.error('网络请求出错!', 1);
            }
        );
    };

    render() {
        const {getFieldDecorator, getFieldsValue} = this.props.form;
        const usernameSuffix = getFieldsValue().username ?
            <Icon type="close-circle" onClick={this.emptyUsername}/> : null;
        return (
            <div id="loginDIV">
                {globalConfig.debug &&
                <a href={globalConfig.github}>
                    <img className="github"
                         src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
                         alt="Fork me on GitHub"
                         data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
                </a>}
                <div className="login">
                    <h1>{globalConfig.name}</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户!'}],
                            })(
                                <Input
                                    placeholder="用户: admin"
                                    required="required"
                                    prefix={<Icon type="user"/>}
                                    size="large"
                                    suffix={usernameSuffix}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码！'}],
                            })(
                                <Input.Password
                                    placeholder="密码: 123456"
                                    required="required"
                                    prefix={<Icon type="lock"/>}
                                    autoComplete={"off"}
                                    size="large"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <Button type="primary"
                                    block size={"large"}
                                    htmlType={"submit"}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLoginSuccess: bindActionCreators(loginSuccessActionCreator, dispatch),
    };
};

const WrappedLogin = Form.create({name: 'login'})(Login);

export default connect(null, mapDispatchToProps)(WrappedLogin);
