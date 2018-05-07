import {Component} from 'react';
import GetFakeMembers from './GetFakeMembers';
import Member from './Member';

class MemberList extends Component {
    constructor() {
        super();
        this.state = {
            members: [],
            loading: false,
            error: null
        };
    }

    // 更新生命周期
    // 1.constructor()
    // 2.componentWillMount()
    // 3.render()
    // 4.componentDidMount()
    // 5.componentWillUnmount()

    componentWillMount() {
        this.setState({loading: true});
        GetFakeMembers(this.props.count).then(
            members => {
                this.setState({members, loading: false})
            },
            error => {
                this.setState({error, loading: false})
            }
        );
    }

    // 挂载生命周期
    // 1.componentWillReceiveProps()
    // 2.shouldComponentUpdate()
    // 3.componentWillUpdate()
    // 4.componentDidUpdate()

    componentWillUpdate() {
        console.log("updating lifecycle");
    }

    render() {
        const {members, loading, error} = this.state;
        return (
            <div className="member-list">
                {
                    (loading) ? <span>Loading Members</span> :
                        (members.length) ?
                            members.map((user, i) =>
                                <Member key={i} {...user} />
                            )
                            :
                            <span>0 members loaded...</span>
                }
                {
                    (error) ? <p>Error When Loading Members: {error.message}</p> : ""}
                }
            </div>
        );
    }
}

export default MemberList;
