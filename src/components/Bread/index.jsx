import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import sidebarMenu from '../Side/menu';

class Bread extends React.PureComponent {
    constructor() {
        super();
        const iconMap = new Map();
        const nameMap = new Map();

        const browseMenu = (item) => {
            nameMap.set(item.key, item.name);
            iconMap.set(item.key, item.icon);
            if (item.child) {
                item.child.forEach(browseMenu);
            }
        };
        sidebarMenu.forEach(browseMenu);
        this.iconMap = iconMap;
        this.nameMap = nameMap;
    }

    render() {
        const breadItemArray = [];

        breadItemArray.push(
            <Breadcrumb.Item key="dashboard" href="/#"><Icon type="dashboard"/>仪表盘</Breadcrumb.Item>
        );

        for (const route of this.props.routes) {
            const name = this.nameMap.get(route.path);
            if (name) {
                const icon = this.iconMap.get(route.path);
                if (icon) {
                    breadItemArray.push(
                        <Breadcrumb.Item key={name}><Icon type={icon}/> {name}
                        </Breadcrumb.Item>
                    );
                } else {
                    breadItemArray.push(
                        <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>
                    );
                }
            }
        }

        return (
            <Breadcrumb style={{margin: '16px 0px'}}>{breadItemArray}</Breadcrumb>
        );
    }
}

export default Bread;
