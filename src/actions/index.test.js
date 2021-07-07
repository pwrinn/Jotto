import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './index';

// describe('correctGuess', () => {
//   it('returns an action with type `CORRECT_GUESS`', () => {
//     const action = correctGuess();
//     expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
//   });
// });

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it('secretWord is returned', () => {
    const store = storeFactory()

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    });

    return store.dispatch(getSecretWord())
      .then(() => {
        const newState = store.getState();
        expect(newState.secretWord).toBe('party');
      });
  });
});