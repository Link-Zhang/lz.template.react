import React from 'react';
import {bindActionCreators} from "redux";
import _ from "lodash";
import {connect} from "react-redux";
import Highlighter from 'react-highlight-words';
import {Table, Input, Button, Icon} from 'antd';
import ajax from "../../../../utils/ajax";
import {communitySubDataDoneActionCreator} from "../../../../acirs/Community";


class CommunityList extends React.PureComponent {
    state = {
        searchText: '',
        expandVisible: {},
        expandedRowRenders: {},
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} size="small"
                        style={{width: 90, marginRight: 8}}>
                    搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        render: (text) => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text || ""}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    async houseByCommunityId(communityId) {
        try {
            return await ajax.houseByCommunityId(communityId);
        } catch (e) {
            console.log(e);
        }
    }

    onExpandedRowRender = (expanded, record) => {
        const subColumns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                render: (text, record) => <a target="_blank" rel="noopener noreferrer"
                                             href={`${record.url}`}>{text}</a>,
            },
            {
                title: '楼层',
                dataIndex: 'floor',
                key: 'floor',
            },
            {
                title: '电梯',
                dataIndex: 'hasElevator',
                key: 'hasElevator',
            },
            {
                title: '朝向',
                dataIndex: 'direction',
                key: 'direction',
            },
            {
                title: '装修',
                dataIndex: 'decoration',
                key: 'decoration',
            },
            {
                title: '户型',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {
                        text: '1室0厅',
                        value: '1室0厅',
                    },
                    {
                        text: '1室1厅',
                        value: '1室1厅',
                    },
                    {
                        text: '2室0厅',
                        value: '2室0厅',
                    },
                    {
                        text: '2室1厅',
                        value: '2室1厅',
                    },
                ],
                onFilter: (value, record) => record.type.indexOf(value) === 0,
            },
            {
                title: '面积',
                dataIndex: 'structureArea',
                key: 'structureArea',
                sorter: (a, b) => a.structureArea - b.structureArea,
                filters: [
                    {
                        text: '[0,30)平',
                        value: '0-30',
                    },
                    {
                        text: '[30,40)平',
                        value: '30-40',
                    },
                    {
                        text: '[40,50)平',
                        value: '40-50',
                    },
                    {
                        text: '[50,60)平',
                        value: '50-60',
                    },
                    {
                        text: '[60,70)平',
                        value: '60-70',
                    },
                    {
                        text: '[70,80)平',
                        value: '70-80',
                    },
                    {
                        text: '[80,200)平',
                        value: '80-200',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.structureArea - minValue >= 0) && (record.structureArea - maxValue < 0);
                }
            },
            {
                title: '总价',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                sorter: (a, b) => a.totalPrice - b.totalPrice,
                filters: [
                    {
                        text: '[0,50)万',
                        value: '0-50',
                    },
                    {
                        text: '[50,100)万',
                        value: '50-100',
                    },
                    {
                        text: '[100,150)万',
                        value: '100-150',
                    },
                    {
                        text: '[150,200)万',
                        value: '150-200',
                    },
                    {
                        text: '[200,250)万',
                        value: '200-250',
                    },
                    {
                        text: '[250,300)万',
                        value: '250-300',
                    },
                    {
                        text: '[300,350)万',
                        value: '300-350',
                    },
                    {
                        text: '[350,400)万',
                        value: '350-400',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.totalPrice - minValue >= 0) && (record.totalPrice - maxValue < 0);
                }
            },
            {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
            },
            {
                title: '抵押',
                dataIndex: 'mortgage',
                key: 'mortgage',
            },
        ];
        if (expanded) {
            this.houseByCommunityId(record.id).then(
                res => {
                    this.props.handleSubDataDone(_.get(res, 'houseVOList'));
                    this.setState({
                        expandVisible: {
                            ...this.state.expandVisible,
                            [record.id]: true,
                        },
                        expandedRowRenders: {
                            ...this.state.expandedRowRenders,
                            [record.id]: <Table columns={subColumns} dataSource={this.props.subData}
                                                rowKey={record => {
                                                    return record.id || ""
                                                }}
                            />,
                        },
                    });
                }
            );
        } else {
            this.setState({
                expandVisible: {
                    ...this.state.expandVisible,
                    [record.id]: false,
                },
                expandedRowRenders: {
                    ...this.state.expandedRowRenders,
                    [record.id]: null,
                }
            });
        }
    };

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                ...this.getColumnSearchProps('id'),
                render: (text, record) => {
                    return <div>{text}</div>;
                }
            },
            {
                title: '小区',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
                render: (text, record) => {
                    let GaoDeBaseURL = `https://ditu.amap.com/search?query=`;
                    let GaoDeURL = GaoDeBaseURL + `${record.name}`;
                    return <a target="_blank" rel="noopener noreferrer"
                              href={GaoDeURL}>{text}</a>;
                }
            },
            {
                title: '在售房屋',
                dataIndex: 'houseCount',
                key: 'houseCount',
                sorter: (a, b) => a.houseCount - b.houseCount,
            },
            {
                title: '平均总价',
                dataIndex: 'avgTotalPrice',
                key: 'avgTotalPrice',
                sorter: (a, b) => a.avgTotalPrice - b.avgTotalPrice,
                filters: [
                    {
                        text: '[0,50)万',
                        value: '0-50',
                    },
                    {
                        text: '[50,100)万',
                        value: '50-100',
                    },
                    {
                        text: '[100,150)万',
                        value: '100-150',
                    },
                    {
                        text: '[150,200)万',
                        value: '150-200',
                    },
                    {
                        text: '[200,250)万',
                        value: '200-250',
                    },
                    {
                        text: '[250,300)万',
                        value: '250-300',
                    },
                    {
                        text: '[300,350)万',
                        value: '300-350',
                    },
                    {
                        text: '[350,400)万',
                        value: '350-400',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.avgTotalPrice - minValue >= 0) && (record.avgTotalPrice - maxValue < 0);
                }
            },
            {
                title: '平均单价',
                dataIndex: 'avgUnitPrice',
                key: 'avgUnitPrice',
                sorter: (a, b) => a.avgUnitPrice - b.avgUnitPrice,
                filters: [
                    {
                        text: '[0,20000)',
                        value: '0-20000',
                    },
                    {
                        text: '[20000,30000)',
                        value: '20000-30000',
                    },
                    {
                        text: '[30000,40000)',
                        value: '30000-40000',
                    },
                    {
                        text: '[40000,50000)',
                        value: '40000-50000',
                    },
                    {
                        text: '[50000,60000)',
                        value: '50000-60000',
                    },
                    {
                        text: '[60000,70000)',
                        value: '60000-70000',
                    }, {
                        text: '[70000,100000)',
                        value: '70000-100000',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.avgUnitPrice - minValue >= 0) && (record.avgUnitPrice - maxValue < 0);
                }
            },
            {
                title: '最大面积',
                dataIndex: 'maxStructureArea',
                key: 'maxStructureArea',
                sorter: (a, b) => a.maxStructureArea - b.maxStructureArea,
                filters: [
                    {
                        text: '[0,30)平',
                        value: '0-30',
                    },
                    {
                        text: '[30,40)平',
                        value: '30-40',
                    },
                    {
                        text: '[40,50)平',
                        value: '40-50',
                    },
                    {
                        text: '[50,60)平',
                        value: '50-60',
                    },
                    {
                        text: '[60,70)平',
                        value: '60-70',
                    },
                    {
                        text: '[70,80)平',
                        value: '70-80',
                    },
                    {
                        text: '[80,200)平',
                        value: '80-200',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.maxStructureArea - minValue >= 0) && (record.maxStructureArea - maxValue < 0);
                }
            },
            {
                title: '最高总价',
                dataIndex: 'maxTotalPrice',
                key: 'maxTotalPrice',
                sorter: (a, b) => a.maxTotalPrice - b.maxTotalPrice,
                filters: [
                    {
                        text: '[0,50)万',
                        value: '0-50',
                    },
                    {
                        text: '[50,100)万',
                        value: '50-100',
                    },
                    {
                        text: '[100,150)万',
                        value: '100-150',
                    },
                    {
                        text: '[150,200)万',
                        value: '150-200',
                    },
                    {
                        text: '[200,250)万',
                        value: '200-250',
                    },
                    {
                        text: '[250,300)万',
                        value: '250-300',
                    },
                    {
                        text: '[300,350)万',
                        value: '300-350',
                    },
                    {
                        text: '[350,400)万',
                        value: '350-400',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.maxTotalPrice - minValue >= 0) && (record.maxTotalPrice - maxValue < 0);
                }
            },
            {
                title: '最小面积',
                dataIndex: 'minStructureArea',
                key: 'minStructureArea',
                sorter: (a, b) => a.minStructureArea - b.minStructureArea,
                filters: [
                    {
                        text: '[0,30)平',
                        value: '0-30',
                    },
                    {
                        text: '[30,40)平',
                        value: '30-40',
                    },
                    {
                        text: '[40,50)平',
                        value: '40-50',
                    },
                    {
                        text: '[50,60)平',
                        value: '50-60',
                    },
                    {
                        text: '[60,70)平',
                        value: '60-70',
                    },
                    {
                        text: '[70,80)平',
                        value: '70-80',
                    },
                    {
                        text: '[80,200)平',
                        value: '80-200',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.minStructureArea - minValue >= 0) && (record.minStructureArea - maxValue < 0);
                }
            },
            {
                title: '最低总价',
                dataIndex: 'minTotalPrice',
                key: 'minTotalPrice',
                sorter: (a, b) => a.minTotalPrice - b.minTotalPrice,
                filters: [
                    {
                        text: '[0,50)万',
                        value: '0-50',
                    },
                    {
                        text: '[50,100)万',
                        value: '50-100',
                    },
                    {
                        text: '[100,150)万',
                        value: '100-150',
                    },
                    {
                        text: '[150,200)万',
                        value: '150-200',
                    },
                    {
                        text: '[200,250)万',
                        value: '200-250',
                    },
                    {
                        text: '[250,300)万',
                        value: '250-300',
                    },
                    {
                        text: '[300,350)万',
                        value: '300-350',
                    },
                    {
                        text: '[350,400)万',
                        value: '350-400',
                    },
                ],
                onFilter: (value, record) => {
                    const minValue = value.split("-")[0];
                    const maxValue = value.split("-")[1];
                    return (record.minTotalPrice - minValue >= 0) && (record.minTotalPrice - maxValue < 0);
                }
            },
            {
                title: '最高单价',
                dataIndex: 'maxUnitPrice',
                key: 'maxUnitPrice',

            },
            {
                title: '最低单价',
                dataIndex: 'minUnitPrice',
                key: 'minUnitPrice',
            },
            {
                title: '最高首付',
                dataIndex: 'maxDownPayment',
                key: 'maxDownPayment',
            },
            {
                title: '最低首付',
                dataIndex: 'minDownPayment',
                key: 'minDownPayment',
            },
        ];

        const paginationProps = {
            defaultPageSize: 10,
            simple: true,
        };

        return (
            <div>
                <Table
                    dataSource={this.props.data} columns={columns}
                    rowKey={record => {
                        return record.id || ""
                    }}
                    pagination={paginationProps}
                    bordered={true}
                    expandedRowRender={(record) => this.state.expandVisible[record.id] === true ? this.state.expandedRowRenders[record.id] : true}
                    onExpand={this.onExpandedRowRender.bind(this)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Community.data,
        subData: state.Community.subData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubDataDone: bindActionCreators(communitySubDataDoneActionCreator, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
