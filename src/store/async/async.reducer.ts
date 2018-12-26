import { AnyAction, Reducer } from 'redux';
import { AxiosError } from 'axios';

interface AsyncStateItem {
  isFetching: boolean;
  error?: string;
}

export interface AsyncState {
  [key: string]: AsyncStateItem;
}

const asyncActionRegex = /(.*)_(REQUEST|SUCCESS|FAILURE)$/;

function extractErrorMessage(error: AxiosError): string {
  if (error.response && error.response.data && error.response.data.message) {
    // data의 타입이 any이므로 message가 없거나 string이 아닐 수도 있음. => 에러 발생
    return error.response.data.message as string;
  } else if (error.response && error.response.statusText) {
    return error.response.statusText;
  }
  return error.message;
}

const asyncReducer: Reducer<AsyncState, AnyAction> = (state = {}, action): AsyncState => {
  const matches = asyncActionRegex.exec(action.type);

  // not a *_REQUEST / *_SUCCESS / *_FAILURE actions, so we ignore them
  if (!matches) { return state; }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: {
      isFetching: requestState === 'REQUEST',
      error: requestState === 'FAILURE' ? extractErrorMessage(action.payload) : null,
    },
  };
};

export default asyncReducer;
