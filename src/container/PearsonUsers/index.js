import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PearsonUser } from '../../components';
import { getUniqueArray } from '../../lib/helper';
import Languages from '../../common/Languages';
import { loadUsers, deleteUser } from '../../actions/userActions';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
    };

    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  /*
  * Load users once component is loaded
  */
  componentDidMount() {
    this.props.loadUsers();
  }

  /*
  * Returns unique users array
  */
  removeDuplicateUser(allUsers) {
    return getUniqueArray(allUsers);
  }

  /*
  * Deleting the user by user id
  */
  deleteUser(id) {
    const users = [...this.state.users];
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);

    this.setState({ users });
  }

  /*
  * Delete user using Redux action
  */
  handleDeleteUser(index) {
    this.props.deleteUser(index);
  }

  /*
  * Renders list of users using PearsonUser component
  */
  _renderUserList() {
    const { users, loading } = this.props;
    return (
      <div className='pearson-user-list'>
        {typeof users !== undefined && users.length ?
          users.map((user, index) => <PearsonUser key={user.id} user={user} deleteUser={() => this.handleDeleteUser(index)} />)
          : loading ? 'Loading...' : Languages.EmptyError}
      </div>
    );
  }

  /*
  * Renders title and list of users
  */
  render() {
    return (
      <div className='pearson-container'>
        <h1>{Languages.Title}</h1>
        {this._renderUserList()}
      </div>
    );
  }
}

PearsonUsers.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

PearsonUsers.defaultProps = {
  actions: {},
  users: [],
};

const mapStateToProps = ({ users }) => {
  return {
    users: users.users
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadUsers,
  deleteUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PearsonUsers);