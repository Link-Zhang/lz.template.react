import React from 'react';
import {render} from 'react-dom';
import Test from './Test';

const target = document.getElementById('root');

window.React = React;

render(
    <Test/>,
    target
);

if (module.hot) {
    module.hot.accept();
}
