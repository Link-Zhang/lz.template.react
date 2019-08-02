import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import _ from 'lodash';
import {connect} from "react-redux";
import moment from 'moment';
import {Card} from 'antd';

class StockChart extends React.PureComponent {
    render() {
        const data = this.props.data;

        // fixedData
        const fixedData = _.map(data,
            function (value) {
                //挑选出需要的列
                let pickedData = _.pick(value, ["avgUnitPrice", "updateTime"]);
                //时间格式转换成需要的unix时间戳
                let unixDateData = _.update(pickedData, 'updateTime', function (date) {
                    return moment(date).utcOffset("-00:00", true).valueOf();
                });
                return (_.reverse(_.values(unixDateData)));
            }
        );

        // ohlc
        const ohlc = [];
        let open = _.get(fixedData, '0.1');
        for (let i = 0; i < fixedData.length; i += 1) {
            const temp = [open, fixedData[i][1]];
            ohlc.push([
                fixedData[i][0], // date
                open, // open
                _.max(temp) + 10, // high
                _.min(temp) - 10, // low
                fixedData[i][1], // close
            ]);
            open = fixedData[i][1];
        }

        // peak && valley
        const peakValleyValue = _.map(data,
            function (value) {
                //挑选出需要的列
                let pickedData = _.pick(value, ["avgUnitPrice"]);
                return (_.values(pickedData));
            }
        );
        const peakValue = _.max(peakValleyValue);
        const valleyValue = _.min(peakValleyValue);

        const groupingUnits = [[
            'week',             // unit name
            [1]               // allowed multiples
        ], [
            'month',
            [1, 3, 6, 12]
        ]];

        const config = {
            chart: {
                height: 800
            },
            credits: {
                enabled: false
            },
            rangeSelector: {
                buttons: [
                    {
                        type: 'week',
                        count: 1,
                        text: '1w'
                    },
                    {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    },
                    {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    },
                    {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    },
                    {
                        type: 'year',
                        count: 1,
                        text: '1y'
                    },
                    {
                        type: 'all',
                        count: 1,
                        text: 'All'
                    }
                ],
                selected: 3,
            },
            title: {
                text: '历史均价',
            },
            yAxis: [
                {
                    title: {
                        text: 'OHLC'
                    },
                    resize: {
                        enabled: true
                    },
                    height: '40%',
                },
                {
                    title: {
                        text: 'AVG'
                    },
                    resize: {
                        enabled: true
                    },
                    plotLines: [
                        {
                            value: valleyValue,
                            color: 'green',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: {
                                text: '最低单价'
                            }
                        },
                        {
                            value: peakValue,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: {
                                text: '最高单价'
                            }
                        }
                    ],
                    top: '45%',
                    height: '55%',
                    offset: 0,
                }
            ],
            tooltip: {
                split: true
            },
            series: [
                {
                    type: 'candlestick',
                    name: 'AVG',
                    data: ohlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                },
                {
                    name: 'AVG',
                    data: fixedData,
                    tooltip: {
                        valueDecimals: 0,
                    },
                    dataGrouping: {
                        units: groupingUnits
                    },
                    yAxis: 1,
                },
            ],
        };

        return (
            <Card>
                <ReactHighstock config={config}/>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Dashboard.data,
    }
};

export default connect(mapStateToProps, null)(StockChart);
