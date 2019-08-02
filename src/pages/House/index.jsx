import React from 'react';
import HouseTab from './components/HouseTab'
import HouseList from "./components/HouseList";

class House extends React.PureComponent {

    render() {
        return (
            <div>
                <HouseTab/>
                <HouseList/>
            </div>
        );
    }
}

export default House;
