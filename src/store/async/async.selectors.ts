import { AsyncState } from './async.reducer';
import { AsyncActionTypes } from '../helpers';

const getRequestName = (actions: AsyncActionTypes) => actions.REQUEST.replace('_REQUEST', '');

export const asyncSelectors = {
  isFetching: (actions: AsyncActionTypes[]) => (state: AsyncState): boolean => actions.some((action) => {
    const requestName = getRequestName(action);
    if (state[requestName]) { return state[requestName].isFetching || false; }
    return false;
  }),
  error: (actions: AsyncActionTypes[]) => (state: AsyncState): string => actions.reduce((acc, cur) => {
    const requestName = getRequestName(cur);
    if (state[requestName] && state[requestName].error) { acc.push(state[requestName].error); }
    return acc;
  }, []).shift(),
};

export default asyncSelectors;
