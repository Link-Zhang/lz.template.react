import React from 'react';
import {Tabs} from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from "lodash";
import houseDistrictMenu from './district';
import ajax from "../../../../utils/ajax";
import {houseDataDoneActionCreator} from "../../../../acirs/House";

class HouseTab extends React.PureComponent {
    async house(district) {
        try {
            return await ajax.house(district);
        } catch (e) {
            console.log(e);
        }
    }

    handleTabClick = key => {
        this.house(key).then(
            res => {
                let data = _.get(res, "houseVOList");
                this.props.handleDataDone(data);
            }
        );
    };

    constructor() {
        super();
        this.tabMenu = houseDistrictMenu.map(
            (item) => {
                return (
                    <Tabs.TabPane
                        tab={item}
                        key={item}
                    />
                );
            }
        );
        // 初始化时获取第一个tab的数据
        this.handleTabClick(houseDistrictMenu[0]);
    }

    render() {
        return (
            <Tabs onChange={this.handleTabClick} defaultActiveKey={houseDistrictMenu[0]}>
                {this.tabMenu}
            </Tabs>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDataDone: bindActionCreators(houseDataDoneActionCreator, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(HouseTab);
