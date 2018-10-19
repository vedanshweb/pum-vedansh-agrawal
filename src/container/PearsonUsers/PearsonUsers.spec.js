import React from "react";
import { shallow } from "enzyme";

import { PearsonUsers } from "./index";
import PearsonUser from '../../components/PearsonUser';
import MockPearsonUsers from '../../mockdata/PearsonUsers.json';

describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
    component.setState({
      loading: false,
      error: false
    });
  });

  afterEach(() => {
    component = null;
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it('should render PearsonUser component based on state', () => {
    component.setState({ loading: true });
    const usersCount = component.state().users.length;

    expect(component.find(PearsonUser)).toHaveLength(usersCount);
  });

  it('should return PearsonUser component list when data is loaded', () => {
    const spy = jest.spyOn(component.instance(), '_renderUserList');
    component.setState({ loading: true });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.find(PearsonUser).exists()).toBeTruthy();
  });

  it('should remove the duplicate users', () => {
    const allUsers = [...component.state().users, ...MockPearsonUsers];
    const filteredUsers = component.instance().removeDuplicateUser(allUsers);

    const arrUserIds = filteredUsers.map((user) => user.id);
    const isDuplicate = arrUserIds.some((id, index) => arrUserIds.indexOf(id) != index);

    expect(filteredUsers.length).toBe(10);
    expect(isDuplicate).toBeFalsy();
  });

  it('should delete user by id', () => {
    component.setState({ users: [...MockPearsonUsers] });
    const userId = component.state().users[0].id;
    component.instance().deleteUser(userId);

    const isUserExist = component.state().users.some((user) => user.id === userId);
    expect(isUserExist).toBeFalsy();
  });
});