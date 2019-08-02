import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import NumberCard from "../Numbercard";

class AvgTotalPrice extends React.PureComponent {
    render() {
        return (
            <NumberCard icon={"dollar"} color={"#f69899"} title={"平均总价(万元/间)"}
                        number={this.props.number || 0}/>
        );
    }
}

AvgTotalPrice.propTypes = {
    number: PropTypes.number,
};

const mapStateToProps = (state) => {
    return {
        number: state.Dashboard.avgTotalPrice,
    }
};

export default connect(mapStateToProps, null)(AvgTotalPrice);


