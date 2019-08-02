import React from 'react';
import CommunityList from "./components/CommunityList";
import CommunityTab from './components/CommunityTab'

class Community extends React.PureComponent {

    render() {
        return (
            <div>
                <CommunityTab/>
                <CommunityList/>
            </div>
        );
    }
}

export default Community;
