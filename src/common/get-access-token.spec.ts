
import test from 'ava';
import { getAccessToken, IGetAccessTokenOptions } from './get-access-token';
import { getEnvironmentVariable } from './get-environment-variable';
import { setupTest } from '../authorization-client.spec';

test('getAccessToken should request an access token from Auth0', async (t) => {
  const config: IGetAccessTokenOptions = {
    domain: getEnvironmentVariable('AUTH0_DOMAIN'),
    clientId: getEnvironmentVariable('AUTH0_CLIENT_ID'),
    clientSecret: getEnvironmentVariable('AUTH0_CLIENT_SECRET'),
  };
  const accessToken = await getAccessToken(config);
  t.is(typeof accessToken, 'string');
})

test('AuthorizationClient.getGroupMembers should get group members', async (t) => {
  const { authorizationClient, counter } = setupTest();
  // Although these requests are initiated at the same time,
  // they should execute one at a time so that all calls hit
  // the cache after the first call.
  const response = await authorizationClient.getGroupMembers({
    groupId: '7ca3a45c-ab8a-4cde-a1af-ccb489642c12',
  },
  {
    page: 0,
    perPage: 25
  });
  t.log(response);
  t.truthy(response.users);
  // Testing that pagination works
  t.true(response.users!.length > 25);
});


