import { Reducer } from 'redux';

import { StoreKeys } from './../../../shared/constants';
import { ITypes, IUserState, IUserAuthInfo } from './types';

const userLocalStorage = localStorage.getItem(StoreKeys.USER);

const INITIAL_STATE: IUserState = {
  isLogged: !!localStorage.getItem(StoreKeys.TOKEN),
  token: localStorage.getItem(StoreKeys.TOKEN) || '',
  user: (userLocalStorage ? JSON.parse(userLocalStorage) : {}) as IUserAuthInfo
};

const reducer: Reducer<IUserState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ITypes.LOGIN: {
      return {
        ...state,
        isLogged: true,
        user: payload.user,
        token: payload.token
      }
    }
    case ITypes.LOGOUT: {
      localStorage.removeItem(StoreKeys.TOKEN);
      localStorage.removeItem(StoreKeys.USER);
      return {
        isLogged: false,
        token: '',
        user: {} as IUserAuthInfo
      };
    }
    default:
      return state
  }
}

export default reducer;
