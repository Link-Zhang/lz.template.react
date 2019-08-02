import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import NumberCard from "../Numbercard";

class TotalHouse extends React.PureComponent {
    render() {
        return (
            <NumberCard icon={"home"} color={"#64EA91"} title={"房屋总数"}
                        number={this.props.number || 0}/>
        );
    }
}

TotalHouse.propTypes = {
    number: PropTypes.number,
};

const mapStateToProps = (state) => {
    return {
        number: state.Dashboard.totalHouse,
    }
};

export default connect(mapStateToProps, null)(TotalHouse);
