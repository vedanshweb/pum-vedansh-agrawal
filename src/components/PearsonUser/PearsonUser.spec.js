import React from 'react';
import { shallow } from 'enzyme';
import PearsonUser from './index';

const mockUser = {
  id: 4,
  first_name: "Eve",
  last_name: "Holt",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
};

describe('PearsonUser', () => {
  let component;
  const deleteUser = jest.fn();

  beforeEach(() => {
    component = shallow(<PearsonUser user={mockUser} deleteUser={deleteUser} />);
  });


  it('renders avatar for a user', () => {
    const avatar = component.find('img').prop('src');
    expect(avatar).toEqual(mockUser.avatar);
  });

  it('renders full name for a user', () => {
    let avatar = component.find('.pearson-user-fullname').text();
    expect(avatar).toEqual(`${mockUser.first_name} ${mockUser.last_name}`);
  });

  it('simulates delete button click', () => {
    component.find('button').simulate('click');
    expect(deleteUser).toHaveBeenCalledTimes(1);
  });

});