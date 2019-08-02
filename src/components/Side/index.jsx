import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Layout, Menu, Icon} from 'antd';
import Logo from '../Logo'
import {sideCollapseActionCreator} from '../../acirs/Side';
import sidebarMenu from './menu';

const {Sider} = Layout;
const {SubMenu} = Menu;

class Side extends React.PureComponent {
    static translateMenuItem(object, path) {
        const parentPath = path.join('/');
        return (
            <Menu.Item key={object.key}>
                {object.icon && <Icon type={object.icon}/>}
                <span>{object.name}</span>
                <Link to={`/${parentPath}`}/>
            </Menu.Item>
        );
    }

    constructor() {
        super();
        const pathStack = [];
        const fistItem = [];
        const l1Menu = sidebarMenu.map((l1) => {
            // 1级菜单
            pathStack.push(l1.key);
            if (l1.child) {
                const l2Menu = l1.child.map((l2) => {
                    // 2级菜单
                    pathStack.push(l2.key);
                    const tmp = Side.translateMenuItem(l2, pathStack);
                    pathStack.pop();
                    return tmp;
                });
                pathStack.pop();
                return (
                    <SubMenu key={l1.key} title={
                        <span>
                            <Icon type={l1.icon}/>
                            <span>{l1.name}</span>
                        </span>
                    }>
                        {l2Menu}
                    </SubMenu>
                )
            }
            else {
                if (fistItem.length === 0) {
                    fistItem.push(l1.key);
                }
                const tmp = Side.translateMenuItem(l1, pathStack);
                pathStack.pop();
                return tmp;
            }
        });
        this.l1Menu = l1Menu;
        this.fistItem = fistItem; // 第一个无child的1级菜单将被选中
    }

    render() {
        return (
            <Sider collapsible collapsed={this.props.collapse} onCollapse={this.props.handleClickCollapse}>
                <Logo/>
                <Menu theme="dark" defaultSelectedKeys={this.fistItem} mode="inline">
                    {this.l1Menu}
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        collapse: state.Side.collapse
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClickCollapse: bindActionCreators(sideCollapseActionCreator, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Side);

