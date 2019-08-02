import React from 'react';
import {Row, Col} from 'antd';
import DashboardTab from './components/DashboardTab';
import TotalHouse from './components/TotalHouse';
import AvgTotalPrice from './components/AvgTotalPrice';
import AvgUnitPrice from './components/AvgUnitPrice';
import StatisticChart from './components/StatisticChart';
import StockChart from './components/StockChart';

class Dashboard extends React.PureComponent {
    render() {
        return (
            <div>
                <DashboardTab/>
                <div>
                    <Row gutter={24}>
                        <Col key={"totalHouse"} lg={8} md={8}>
                            <TotalHouse/>
                        </Col>
                        <Col key={"avgTotalPrice"} lg={8} md={8}>
                            <AvgTotalPrice/>
                        </Col>
                        <Col key={"avgUnitPrice"} lg={8} md={8}>
                            <AvgUnitPrice/>
                        </Col>

                    </Row>
                </div>
                <div>
                    <Row gutter={24}>
                        <Col lg={24} md={24}>
                            <StatisticChart/>
                        </Col>
                    </Row>
                </div>
                <div style={{marginBottom: '16px', marginTop: '16px'}}>
                    <Row>
                        <Col lg={24} md={24}>
                            <StockChart/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Dashboard;
