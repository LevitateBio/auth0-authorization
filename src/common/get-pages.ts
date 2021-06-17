import { get } from './request';

export interface Options {
  page: number;
  perPage: number;
}

export function getPages(url: string, accessToken: string, options: Options, topic: string) {
  const getPaged: any = function(page: number) {
    return get({
      accessToken,
      url,
      queryParams: {
        page: `${page}`,
        per_page: `${options.perPage}`
      }
    }).then((result: any) => {
      const total_pages = Math.ceil(result.total / options.perPage);
      if (total_pages > page) {
        return getPaged(page + 1).then((p: any) => {
          result[topic] = result[topic].concat(p[topic]);
          return result;
        })
      }
      return result;
    });
  };
  return getPaged(1);
}