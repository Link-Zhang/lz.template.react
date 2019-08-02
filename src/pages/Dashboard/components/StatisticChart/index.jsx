import React from 'react';
import {Row, Col, Card} from 'antd';
import {connect} from "react-redux";
import {Line, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Brush, AreaChart, Area, Legend} from 'recharts';
import ChartContainer from '../ChartContainer';

class StatisticChart extends React.PureComponent {
    render() {
        return (
            <Card>
                <Row gutter={24}>
                    <Col lg={12} md={24} span={12}>
                        <Card title="房屋总数" bordered={false}>
                            <ChartContainer>
                                <LineChart data={this.props.data}
                                           margin={{
                                               top: 16, right: 16, left: 16, bottom: 16,
                                           }}
                                           syncId="StatisticChart"
                                >
                                    <Line type="monotone" dataKey="saleCount" stroke="#7BE895"
                                          strokeWidth={2} activeDot={{r: 5, fill: '#fff', stroke: "#7BE895"}}
                                    />
                                    <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5"/>
                                    <XAxis dataKey="updateTime" tickLine={false}/>
                                    <YAxis domain={['auto', 'auto']} tickLine={false}/>
                                    <Tooltip/>
                                    <Legend/>
                                </LineChart>
                            </ChartContainer>
                        </Card>
                    </Col>
                    <Col lg={12} md={24} span={12}>
                        <Card title="平均总价" bordered={false}>
                            <ChartContainer>
                                <LineChart data={this.props.data}
                                           margin={{
                                               top: 16, right: 16, left: 16, bottom: 16,
                                           }}
                                           syncId="StatisticChart"
                                >
                                    <Line type="monotone" dataKey="avgTotalPrice" stroke="#f69899"
                                          strokeWidth={2}
                                          activeDot={{r: 5, fill: '#fff', stroke: "#f69899"}}
                                    />
                                    <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5"/>
                                    <XAxis dataKey="updateTime" tickLine={false}/>
                                    <YAxis domain={['auto', 'auto']} tickLine={false}/>
                                    <Tooltip/>
                                    <Legend/>
                                </LineChart>
                            </ChartContainer>
                        </Card>
                    </Col>
                    <Col lg={24} md={24} span={12}>
                        <Card title="平均单价" bordered={false}>
                            <ChartContainer>
                                <AreaChart data={this.props.data}
                                           margin={{
                                               top: 16, right: 16, left: 16, bottom: 16,
                                           }}
                                           syncId="StatisticChart"
                                >
                                    <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="3 3"/>
                                    <XAxis dataKey="updateTime" tickLine={false}/>
                                    <YAxis domain={['auto', 'auto']} tickLine={false}/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="avgUnitPrice" stroke="#EE82EE" fill="#EE82EE"
                                          strokeWidth={2}
                                          dot={{fill: '#fff'}}
                                          activeDot={{r: 5, fill: '#fff', stroke: "#EE82EE"}}
                                    />
                                    <Brush/>
                                </AreaChart>
                            </ChartContainer>
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Dashboard.data,
    }
};

export default connect(mapStateToProps, null)(StatisticChart);
