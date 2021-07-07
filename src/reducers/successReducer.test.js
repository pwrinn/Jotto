import { actionTypes } from '../actions';
import successReducer from './successReducer';

it('when previous state is undefined, return false', () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

it('when unknown action type, return previous state', () => {
  const newState = successReducer(false, { type: 'unknown'});
  expect(newState).toBe(false);
});

it('when action type `CORRECT_GUESS`, return true', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});