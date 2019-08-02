import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import history from './redux/History';
import store from './redux/Store';
import App from './components/App';
import Dashboard from './pages/Dashboard';
import House from './pages/House';
import Community from './pages/Community';

const root = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" exact component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="house" component={House}/>
                <Route path="community" component={Community}/>
            </Route>
        </Router>
    </Provider>
);

render(
    root,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
