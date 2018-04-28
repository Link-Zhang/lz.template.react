import React from 'react';
import logo from './logo.svg';
import css from './App.css';

class App extends React.Component {
    render() {
        return (
            <div className={css.app}>
                <header className={css.header}>
                    <img src={logo} className={css.logo} alt="logo"/>
                    <h1 className={css.title}>Welcome to React</h1>
                </header>
                <p className={css.intro}>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
