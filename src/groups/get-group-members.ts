import { getPages } from '../common/get-pages';
import { IAuth0AuthorizationApiUser } from '../interfaces';

export interface Input {
  groupId: string;
}

export interface Response {
  users: IAuth0AuthorizationApiUser[];
  total: number;
}

export interface Options {
  page: number;
  perPage: number;
}

const defaultOptions: Options = {
  page: 0,
  perPage: 25,
};

export function getGroupMembers(extensionUrl: string, accessToken: string) {
  return (input: Input, options?: Options): Promise<Response> => {
    options = {
      ...defaultOptions,
      ...options
    };
    return getPages(`${extensionUrl}/groups/${input.groupId}/members`, accessToken, options);
  }
}
