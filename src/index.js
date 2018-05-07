import React, {Children} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

// import App from './app/App'

// import MemberList from './memberlist/MemberList';

// import Menu from './menu/Menu';
// import data from './menu/data';

// import Clock from './clock/Clock';

// import HiddenMessages from './hiddenmessages/HiddenMessages';

import Display from './display/Display';
import WhenTruthy from './display/WhenTruthy';
import WhenFalsy from './display/WhenFalsy';

const target = document.getElementById('react-container');

window.React = React;

// render(
//     <App/>,
//     target
// );

// render(
//     <MemberList count={5}/>,
//    target
// );

// render(
//     <Menu recipes={data}/>,
//     target
// );

// render(
//     <Clock onClose={() => unmountComponentAtNode(target)}/>,
//     target
// );

// render(
//     <HiddenMessages/>,
//     target
// );

const age = 22;

render(
    <Display ifTruthy={age >= 21}>
        <WhenTruthy>
            <h1>You can enter</h1>
        </WhenTruthy>
        <WhenFalsy>
            <h1>Beat it kid</h1>
        </WhenFalsy>
    </Display>,
    target
);


if (module.hot) {
    module.hot.accept();
}
