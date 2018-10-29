import React from 'react';
import { shallow, render } from 'enzyme';
import { PearsonUsers } from './index';
import PearsonUser from '../../components/PearsonUser';
import initialState from '../../reducers/initialState';
import MockPearsonUsers from '../../mockdata/PearsonUsers.json';

describe('PearsonUsers', () => {
  let component;
  let loadUsers;

  beforeEach(() => {
    loadUsers = jest.fn().mockImplementation(() => (initialState));
    component = shallow(<PearsonUsers loadUsers={loadUsers} users={initialState.users} deleteUser={jest.fn()}/>);
  });

  it('renders a h1', () => {
    const h1 = component.find('h1');

    expect(h1.text()).toEqual('Pearson User Management');
  });

  it('should render PearsonUser component based on state', () => {
    const usersCount = initialState.users.length;

    expect(component.find(PearsonUser)).toHaveLength(usersCount);
  });

  it('should return PearsonUser component list when data is loaded', () => {
    const spy = jest.spyOn(component.instance(), '_renderUserList');
    component.setState({ loading: true });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.find(PearsonUser).exists()).toBeTruthy();
  });

  it('should remove the duplicate users', () => {
    const duplicateUsers = [...component.state().users, ...MockPearsonUsers];
    const uniqueUsers = component.instance().removeDuplicateUser(duplicateUsers);

    expect(uniqueUsers.length).toBe(10);

    const arrUserIds = uniqueUsers.map((user) => user.id);
    const isDuplicateExist = arrUserIds.some((id, index) => arrUserIds.indexOf(id) != index);
    
    expect(isDuplicateExist).toBeFalsy();
  });

  it('should delete user by id', () => {
    component.setState({ users: [...MockPearsonUsers] });
    const userId = component.state().users[0].id;
    
    component.instance().deleteUser(userId);

    const isUserExist = component.state().users.some((user) => user.id === userId);

    expect(isUserExist).toBeFalsy();
  });

});