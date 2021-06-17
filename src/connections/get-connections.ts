import { getPages } from '../common/get-pages';
import { IAuth0AuthorizationApiConnection } from '../interfaces';

export interface Options {
  page: number;
  perPage: number;
}

const defaultOptions: Options = {
  page: 0,
  perPage: 25,
};

export function getConnections(extensionUrl: string, accessToken: string) {
  return (options?: Options): Promise<IAuth0AuthorizationApiConnection[]> => {
    options = {
      ...defaultOptions,
      ...options
    };
    return getPages(`${extensionUrl}/connections`, accessToken, options, 'connections');
  }
}
