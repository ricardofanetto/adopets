import api from '../../../services/api'

import { IOrganizationUser } from './../../../interfaces/IOrganizationUser';
import { IUser } from './../../../interfaces/IUser';
import { ITypes } from './types'

import { StoreKeys } from './../../../shared/constants';

export const login = (user: IUser) => async (dispatch: any) => {
  const sender: IOrganizationUser = { organization_user: user };
  const { data } = await api.post(`auth/session-register`, sender);
  if (data.code === 200) {
    const token = data.data.access_key;
    const user = data.data.organization_user;
    localStorage.setItem(StoreKeys.TOKEN, token)
    localStorage.setItem(StoreKeys.USER, JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch({ type: ITypes.LOGIN, payload: { token, user } })
  }
  return { data };
}