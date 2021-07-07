import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { storeFactory, checkProps } from '../../test/testUtils';
import Input from './Input';

// mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: initialState => [initialState, mockSetCurrentGuess]
// }));

const setup = (initialState={}, secretWord='party') => {
  const store = storeFactory(initialState);
  return mount(<Provider store={store}><Input secretWord={secretWord}/></Provider>);
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ success: true });
    })

    it('renders without error', () => {
      const wrapper = setup({ secretWord: '' });
      expect(wrapper.find('.component-input').length).toBe(1);
    });

    it('input box does not appear', () => {
      expect(wrapper.find('.input-box').exists()).toBe(false);
    });

    it('submit button does not appear', () => {
      expect(wrapper.find('.submit-button').exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ success: false });
    })

    it('renders without error', () => {
      const wrapper = setup({ secretWord: '' });
      expect(wrapper.find('.component-input').length).toBe(1);
    });

    it('input box appears', () => {
      expect(wrapper.find('.input-box').exists()).toBe(true);
    });

    it('submit button appears', () => {
      expect(wrapper.find('.submit-button').exists()).toBe(true);
    });
  });
});

it('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({ success: false })
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  it('state updates with value of input box upon change', () => {
    const mockEvent = { target: { value: 'train' } };
    wrapper.find('.input-box').simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  it('field is cleared upon submit button click', () => {
    wrapper.find('.submit-button').simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
})