export enum ITypes {
  LOGIN = 'user/LOGIN',
  LOGOUT = 'user/LOGOUT'
}

export interface IUserState {
  readonly isLogged: boolean;
  readonly token: string;
  readonly user: IUserAuthInfo;
}

export interface IUserAuthInfo {
  uuid: string;
  well_come: boolean;
  email: string;
  title?: any;
  first_name: string;
  last_name: string;
  pronoun_key: string;
  birthday?: any;
  avatar?: string;
  created_date: string;
  role: string;
}