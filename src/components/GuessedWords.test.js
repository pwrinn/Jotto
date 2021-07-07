import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from '../../test/testUtils';
import GuessedWords from './GuessedWords';

const defaultProps = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }]
};

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
}

it('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  it('renders without error', () => {
    expect(wrapper.find(".component-guessed-words").length).toBe(1);
  });

  it('renders instructions to guess a word', () => {
    expect(wrapper.find(".guess-instructions").text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  it('renders without error', () => {
    expect(wrapper.find(".component-guessed-words").length).toBe(1);
  });

  it('renders "guessed words" section', () => {
    expect(wrapper.find(".guessed-words").length).toBe(1);
  });

  it('displays the correct number of guessed words', () => {
    expect(wrapper.find(".guessed-word").length).toBe(guessedWords.length);
  });

  it('includes guess word index for each word', () => {
    const indexTextSet = new Set(wrapper.find('.guessed-word-index').map(wrapper => wrapper.text()));
    const expectedSet = new Set(guessedWords.map((word, index) => (index + 1).toString()));
    expect(indexTextSet).toEqual(expectedSet);
  });
});