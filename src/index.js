import React from 'react';
import {render} from 'react-dom';
import App from './color/App'

window.React = React;

render(<App/>, document.getElementById('react-container'));

if (module.hot) {
    module.hot.accept();
}
