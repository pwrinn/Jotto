import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from "../../test/testUtils";
import TotalGuesses from './TotalGuesses';

const defaultProps = { guessCount: 0 };

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuesses {...setupProps} />)
}

it('renders without error', () => {
  const wrapper = setup();
  expect(wrapper.find('.component-total-guesses').length).toBe(1);
});

it('does not throw warning with expected props', () => {
  checkProps(TotalGuesses, defaultProps);
});

it('renders the number of guesses', () => {
  const guessCount = 8;
  const wrapper = setup({ guessCount });
  expect(wrapper.find('.component-total-guesses').text()).toContain(guessCount.toString());
});