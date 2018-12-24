import { createStandardAction } from 'typesafe-actions';
// tslint:disable-next-line:no-submodule-imports
import { B, FsaBuilder, StringType } from 'typesafe-actions/src/types';

export interface AsyncActionTypes {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

export const createAsyncActionTypes = (type: string): AsyncActionTypes => ({
  REQUEST: type + '_REQUEST',
  SUCCESS: type + '_SUCCESS',
  FAILURE: type + '_FAILURE',
});

export type AsyncActionBuilder<P1, M1, P2, M2, P3, M3> = {
  request: FsaBuilder<StringType, B<P1>, B<M1>>;
  success: FsaBuilder<StringType, B<P2>, B<M2>>;
  failure: FsaBuilder<StringType, B<P3>, B<M3>>;
};

export interface CreateAsyncAction {
  // tslint:disable-next-line:callable-types
  <P1, M1, P2, M2, P3, M3>(): AsyncActionBuilder<P1, M1, P2, M2, P3, M3>;
}

export const createAsyncAction = (types: AsyncActionTypes): CreateAsyncAction => {
  // typesafe-actions의 createAsyncAction은 meta 프로퍼티를 지원하지 않으므로 직접 구현
  // return _createAsyncAction(types.REQUEST, types.SUCCESS, types.FAILURE);

  function constructor<T extends StringType, P1, M1, P2, M2, P3, M3>(): AsyncActionBuilder<P1, M1, P2, M2, P3, M3> {
    return {
      request: createStandardAction(types.REQUEST)<P1, M1>() as FsaBuilder<T, B<P1>, B<M1>>,
      success: createStandardAction(types.SUCCESS)<P2, M2>() as FsaBuilder<T, B<P2>, B<M2>>,
      failure: createStandardAction(types.FAILURE)<P3, M3>() as FsaBuilder<T, B<P3>, B<M3>>,
    };
  }

  return constructor;
};
