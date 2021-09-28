import { IAuth0AuthorizationApiConnection } from '../interfaces';
import { patch } from '../common/request';

export interface Input {
  connectionId: string;
  applicationId: string;
}

export function enableConnection(extensionUrl: string, accessToken: string) {
  return (input: Input): Promise<IAuth0AuthorizationApiConnection> => {
    console.log("!!!" + `${extensionUrl}/connections/${input.connectionId}`)
    return patch({
      accessToken,
      url: `${extensionUrl}/connections/${input.connectionId}`,
      body: {
        "enabled_clients": [`"${input.applicationId}"`]
      }
    });
  }
}
