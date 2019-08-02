import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Card} from 'antd';
import CountUp from 'react-countup';
import './index.css';

const NumberCard = ({icon, color, title, number}) => {
    return (
        <Card className={"numberCard"}>
            <Icon className={"numberCardIconWarp"} style={{color}} type={icon}/>
            <div className={"numberCardContent"}>
                <p className={"numberCardTitle"}>{title}</p>
                <p className={"numberCardNumber"}>
                    <CountUp
                        start={0}
                        end={number}
                        duration={2.75}
                        useEasing
                        useGrouping
                        separator=","
                    />
                </p>
            </div>
        </Card>
    )
};

NumberCard.propTypes = {
    icon: PropTypes.string, // 图标 pay-circle
    color: PropTypes.string, // 颜色 #64EA91
    title: PropTypes.string, // 标题 Total Money
    number: PropTypes.number, // 数字 1000
};

export default NumberCard
