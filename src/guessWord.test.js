import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { storeFactory } from '../test/testUtils';
import App from './App';

jest.mock('./actions');

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(<Provider store={store}><App /></Provider>);
  wrapper.find('.input-box').simulate('change', { target: { value: 'train' } });
  wrapper.find('.submit-button').simulate('click', { preventDefault() {} });
  return wrapper;
};

describe('no words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: []
    });
  });

  it('creates GuessedWords table with one row', () => {
    expect(wrapper.find('.guessed-word')).toHaveLength(1);
  });
});

describe('some words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    });
  });

  it('adds row to GuessedWords table', () => {
    expect(wrapper.find('.guessed-word')).toHaveLength(2);
  });
});

describe('guess secret word', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    });

    wrapper.find('.input-box').simulate('change', { target: { value: 'party' } });
    wrapper.find('.submit-button').simulate('click', { preventDefault() {} });
  });

  it('adds row to GuessedWords table', () => {
    expect(wrapper.find('.guessed-word')).toHaveLength(3);
  });

  it('displays congrats component', () => {
    expect(wrapper.find('.component-congrats').text().length).toBeGreaterThan(0);
  });

  it('does not display input component contents', () => {
    expect(wrapper.find('.input-box').exists()).toBe(false);
    expect(wrapper.find('.submit-button').exists()).toBe(false);
  });
});