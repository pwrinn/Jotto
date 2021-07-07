import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { storeFactory } from '../test/testUtils';
import App from './App';
import { getSecretWord as mockGetSecretWord } from './actions';

// activate global mock for getSecretWord
jest.mock('./actions');

const setup = () => {
  const store = storeFactory();
  return mount(<Provider store={store}><App /></Provider>);
};

it('renders without error', () => {
  const wrapper = setup();
  expect(wrapper.find('.component-app').length).toBe(1);
});

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });

  it('getSecretWord on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  it('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
