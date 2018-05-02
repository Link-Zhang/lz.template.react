import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import data from './data';

window.React = React;

ReactDOM.render(
    <Menu recipes={data}/>,
    document.getElementById("react-container")
);

if (module.hot) {
    module.hot.accept();
}
