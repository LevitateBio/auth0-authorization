import { getPages } from '../common/get-pages';
import { IAuth0AuthorizationApiUser } from '../interfaces';

export interface Response {
  connections: IAuth0AuthorizationApiUser[];
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

export function getConnections(extensionUrl: string, accessToken: string) {
  return (options?: Options): Promise<Response> => {
    options = {
      ...defaultOptions,
      ...options
    };
    return getPages(`${extensionUrl}/connections`, accessToken, options, 'connections');
  }
}
