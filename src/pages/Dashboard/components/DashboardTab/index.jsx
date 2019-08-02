import React from 'react';
import {Tabs} from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from "lodash";
import dashboardDistrictMenu from './district';
import ajax from "../../../../utils/ajax";
import {dashboardDataDoneActionCreator} from "../../../../acirs/Dashboard";

class DashboardTab extends React.PureComponent {
    async statistic(district) {
        try {
            return await ajax.statistic(district);
        } catch (e) {
            console.log(e);
        }
    }

    handleTabClick = key => {
        this.statistic(key).then(
            res => {
                let data = _.get(res, "statisticVOList");
                let theLast = _.last(data);
                let totalHouse = _.get(theLast, "saleCount");
                let avgTotalPrice = _.get(theLast, "avgTotalPrice");
                let avgUnitPrice = _.get(theLast, "avgUnitPrice");
                let sortedData = _.sortBy(data, function (item) {
                    return item.id;
                });
                this.props.handleDataDone(totalHouse, avgTotalPrice, avgUnitPrice, sortedData);
            }
        );
    };

    constructor() {
        super();
        this.tabMenu = dashboardDistrictMenu.map(
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
        this.handleTabClick(dashboardDistrictMenu[0]);
    }

    render() {
        return (
            <Tabs onChange={this.handleTabClick} defaultActiveKey={dashboardDistrictMenu[0]}>
                {this.tabMenu}
            </Tabs>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDataDone: bindActionCreators(dashboardDataDoneActionCreator, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(DashboardTab);
