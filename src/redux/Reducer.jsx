import {combineReducers} from 'redux';
import App from '../acirs/App';
import Community from '../acirs/Community';
import Dashboard from '../acirs/Dashboard';
import House from '../acirs/House';
import Side from '../acirs/Side';
import User from '../acirs/User';

export default (history) => combineReducers({
    App: App.reducer,
    Community: Community.reducer,
    Dashboard: Dashboard.reducer,
    House: House.reducer,
    Side: Side.reducer,
    User: User.reducer,
});
