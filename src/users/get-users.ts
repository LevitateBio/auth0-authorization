import { get } from '../common/request';
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

    const getPaged: any = function(page: number) {
      return get({
        accessToken,
        url: `${authorizationExtensionUrl}/users`,
        queryParams: {
          page: `${options.page}`,
          per_page: `${options.perPage}`,
        }
      }).then((result: any) => {
        const total_pages = Math.ceil(result.total / options.perPage);
        if (total_pages > page + 1) {
          return getPaged(page + 1).then((p: any) => {
            result.users = result.users.concat(p.users);
            return result;
          })
        }
        return result;
      });
    };
    return getPaged(0);
  }
}
