import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

test('Should render App.js', () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot();
});
