export interface IAuth0AuthorizationApiGroup {
  _id: string; // 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  name: string;
  description: string;
  members: string[];
}

export interface IAuth0AuthorizationApiRole {
  _id: string; // 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  name: string;
  description: string;
  applicationType: string; // 'client'
  applicationId: string; // 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  permissions: []; // list of ids
}

export interface IAuth0AuthorizationApiPermission {
  _id: string; // 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  name: string;
  description: string;
  applicationType: string; // 'client'
  applicationId: string; // 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
}

export interface IAuth0AuthorizationApiError {
  statusCode: number;// 400
  error: string; // 'Bad Request'
  message: string; // 'id must be a valid GUID'
  // validation: {}
}

export interface IAuth0AuthorizationApiUser {
  email: string;
  name: string;
  picture: string; // https://...
  user_id: string; // 'auth0|xxxxxxxxxxxxxxxxxxxxxxxx',
  last_login: string; // '2018-06-01T22:34:36.240Z',
  logins_count: number; // integer
}

export interface IAuth0AuthorizationApiConnection {
  name: string;
  display_name: string;
  id: string;
  enabled_clients: string[];
}