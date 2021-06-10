
import test from 'ava';
import { getAccessToken, IGetAccessTokenOptions } from './get-access-token';
import { getEnvironmentVariable } from './get-environment-variable';

test('getAccessToken should request an access token from Auth0', async (t) => {
  const config: IGetAccessTokenOptions = {
    domain: getEnvironmentVariable('AUTH0_DOMAIN'),
    clientId: getEnvironmentVariable('AUTH0_CLIENT_ID'),
    clientSecret: getEnvironmentVariable('AUTH0_CLIENT_SECRET'),
  };
  const accessToken = await getAccessToken(config);
  t.is(typeof accessToken, 'string');
})
