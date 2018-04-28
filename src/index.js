import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import css from './index.css';
import Greeter from './Greeter';

ReactDOM.render(
    <div className={css.index}><h1>Hello, React!</h1></div>,
    document.getElementById('root')
);
ReactDOM.render(<App/>, document.getElementById('app'));
ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

if (module.hot) {
    module.hot.accept();
}
