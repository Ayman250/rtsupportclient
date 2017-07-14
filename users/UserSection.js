import React, {Component} from 'react';
import UserList from './UserList.js'
import UserForm from './UserForm.js'

class UserSection extends Component {
    render() {
        return (
            <div className="support panel panel-primary">
                <div className="panel-heading">
                    <strong>Users</strong>
                </div>
                <div className="panel-body users">
                    <UserList {...this.props} />
                    <UserForm {...this.props} />
                </div>
            </div>
        )
    }
}

UserSection.PropTypes = {
    setUserName: React.PropTypes.func.isRequired,
    users: React.PropTypes.array.isRequired
};

export default UserSection