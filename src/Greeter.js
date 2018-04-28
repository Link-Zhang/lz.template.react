import React, {Component} from 'react';
import json from './Greeter.json';
import css from './Greeter.css';

class Greeter extends Component {
    render() {
        return (
            <div className={css.root}>
                {json.greetText}
            </div>
        );
    }
}

export default Greeter
