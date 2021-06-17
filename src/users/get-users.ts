import { getPages } from '../common/get-pages';
import { IAuth0AuthorizationApiUser } from '../interfaces';

export interface Response {
  start: number;
  limit: number;
  length: number;
  users: IAuth0AuthorizationApiUser[];
  total: number;
}

export interface Options {
  page: number;
  perPage: number;
}

const getUsersDefaultOptions: Options = {
  page: 0,
  perPage: 25,
};

export function getUsers(authorizationExtensionUrl: string, accessToken: string) {
  return (options?: Options): Promise<Response> => {
    options = {
      ...getUsersDefaultOptions,
      ...options
    };
    return getPages(`${authorizationExtensionUrl}/users`, accessToken, options, 'users');
  }
}
