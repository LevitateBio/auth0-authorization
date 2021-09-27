import { IAuth0AuthorizationApiConnection } from '../interfaces';
import { patch } from '../common/request';

export interface Input {
  connectionId: string;
}

export function disableConnection(extensionUrl: string, accessToken: string) {
  return (input: Input): Promise<IAuth0AuthorizationApiConnection[]> => {
    return patch({
      accessToken,
      url: `${extensionUrl}/connections/${input.connectionId}`,
      body: {
        "enabled_clients": [""]
      }
    });
  }
}
