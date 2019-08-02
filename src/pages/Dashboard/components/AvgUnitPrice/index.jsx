import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import NumberCard from "../Numbercard";

class AvgUnitPrice extends React.PureComponent {
    render() {
        return (
            <NumberCard icon={"transaction"} color={"#EE82EE"} title={"平均单价(元/平)"}
                        number={this.props.number || 0}/>
        );
    }
}

AvgUnitPrice.propTypes = {
    number: PropTypes.number,
};

const mapStateToProps = (state) => {
    return {
        number: state.Dashboard.avgUnitPrice,
    }
};

export default connect(mapStateToProps, null)(AvgUnitPrice);
