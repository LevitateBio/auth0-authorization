import { get } from '../common/request';
import { IAuth0AuthorizationApiGroup, IAuth0AuthorizationApiUser } from '../interfaces';

export interface Input {
  groupId: string;
}

export interface Response {
  nested: {
    user: IAuth0AuthorizationApiUser;
    group: IAuth0AuthorizationApiGroup;
  }[];
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

export function getNestedGroupMembers(extensionUrl: string, accessToken: string) {
  return (input: Input, options?: Options): Promise<Response> => {
    options = {
      ...defaultOptions,
      ...options
    };
    return get({
      accessToken,
      url: `${extensionUrl}/groups/${input.groupId}/members/nested`,
      queryParams: {
        page: `${options.page}`,
        per_page: `${options.perPage}`,
      }
    });
  }
}
