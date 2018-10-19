import React, { Component } from "react";

import Users from '../../api/usersApi';
import { PearsonUser, AlertModal, ErrorNotification, Spinner } from '../../components';
import { getUniqueArray } from '../../lib/helper';
import Languages from '../../common/Languages';
import '../../assets/styles/css/PearsonUsers.css';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ],
      loading: false,
      error: false
    };
  }

  /**
   * Fetch data from users API on component mount
   */
  componentDidMount() {
    Users.getAllUsers()
      .then((response) => {
        const allUsers = [...this.state.users, ...response.data];
        const uniqueUsers = this.removeDuplicateUser(allUsers);

        this.setState({ users: uniqueUsers, loading: true });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  /**
   * Prompt delete alert confirmation box
   */
  confirmDeleteAction(userId) {
    AlertModal("confirm", Languages.Confirm, () => this.deleteUser(userId));
  }

  /**
   * Deleting the user by user id
   */
  deleteUser(id) {
    const users = [...this.state.users];
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);

    this.setState({ users });
  }

  /**
   * Returns unique users array
   */
  removeDuplicateUser(allUsers) {
    return getUniqueArray(allUsers);
  }

  /**
   * Returns the <PearsonUser /> component user list
   */
  _renderUserList() {
    const { users } = this.state;
    return (
      <section className="pearson-user-container">
        {
          users.length ? users.map((user) => {
            return (
              <PearsonUser key={user.id} onDelete={() => this.confirmDeleteAction(user.id)} {...user} />
            );
          }) : <ErrorNotification message={Languages.EmptyError}/>
        }
      </section>
    );
  }

  /**
   * Returns the error notification
   */
  _renderError(message) {
    return (
      <ErrorNotification message={message} />
    );
  }

  /**
   * Returns component to render
   */
  _renderUsers() {
    let element = <Spinner />;

    if (this.state.loading) {
      element = this._renderUserList();
    }

    if (this.state.error) {
      element = this._renderError(Languages.Error);
    }

    return element;
  }

  render() {
    return (
      <div className="pearson-users">
        <h1>{Languages.Title}</h1>
        {this._renderUsers()}
      </div>
    );
  }
}
