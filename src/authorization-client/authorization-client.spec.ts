
import test from 'ava';
import { AuthorizationClient as AuthorizationClientClass, IAuthorizationClientOptions } from './authorization-client';
import { getEnvironmentVariable } from '../common/get-environment-variable';
const proxyquire = require('proxyquire').noPreserveCache();

// TODO: fix these tests
// test('AuthorizationClient.getAccessToken should cache access token', async (t) => {
//   const { authorizationClient, counter } = setupTest();
//   await authorizationClient.getAccessToken(); // this call should get fresh token
//   await authorizationClient.getAccessToken(); // this call should reuse cached token
//   await authorizationClient.getAccessToken(); // this call should reuse cached token
//   t.is(counter.count, 1);
// });

// test('AuthorizationClient.getAccessToken should wait for pending calls to finish', async (t) => {
//   const { authorizationClient, counter } = setupTest();
//   // Although these requests are initiated at the same time,
//   // they should execute one at a time so that all calls hit
//   // the cache after the first call.
//   const promise1 = authorizationClient.getAccessToken();
//   const promise2 = authorizationClient.getAccessToken();
//   const promise3 = authorizationClient.getAccessToken();
//   await Promise.all([promise1, promise2, promise3]);
//   t.is(counter.count, 1);
// });

test('AuthorizationClient.getGroupMembers should get group members', async (t) => {
  const { authorizationClient, counter } = setupTest();
  const response = await authorizationClient.getGroupMembers({
    groupId: '7ca3a45c-ab8a-4cde-a1af-ccb489642c12',
  },
  {
    page: 0,
    perPage: 25
  });
  const uniqueUsers = new Set(response.users);
  t.truthy(response.users);
  // Testing that pagination works
  t.true(response.users!.length > 25);
  t.true(uniqueUsers.size == response.users!.length);
});

test('AuthorizationClient.getConnections should get connections', async (t) => {
  const { authorizationClient, counter } = setupTest();
  const response = await authorizationClient.getConnections();
  t.truthy(response.connections);
});


// Returns a new instance of AuthorizationClient and a counter counting the number of times getAccessToken is called.
function setupTest() {
  const dummyAccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFWXlNVEV3UWtFNVJrVTVNVVU1TXpaQ1JFRkdNMEl3UTBNM05EY3hNRFExUXpZd01USTJNZyJ9.eyJpc3MiOiJ4eHgiLCJzdWIiOiJ4eHgiLCJhdWQiOiJ4eHgiLCJpYXQiOjE1NTg1MDQ2NjMsImV4cCI6MTU1ODUwNDY2Mywibm9uY2UiOiJYWFgifQ.iPNiKdnMfuSz6GD83FfKqB2dMmvlrFtCjDiQ7pgN0Qpyk1XyO0z72ZMG88yH1OGZCGswdw-f8KRjOZ5lSLeiXfePjOYGkPT9izBjYJtzzOBAQ4mx936BwFK8NB204AhhqpTsC7JYsw4vm7r1EjUcN1fMmCSAqxOrPNmq0R9lOiN_aSkQdJlCcqTkUlEorufqjRr_uUbNKHHcx93PhFKezTAbiIOA910yUFbCiDLIYwTkmdbkFZSyeDA12Pl9ZFW9v61k3azmH9AhyDc6QKPLb92CX7k7ZKnJw0GQ5wf5j2wfxtYjRGz7CPNwNXPVUJu67w7HuBCDT8unI-rO7W2okA';
  // Track number of calls to mocked getAccessToken
  const counter = { count: 0 };
  // Import AuthorizationClient but mock its import of getAccessToken
  const AuthorizationClientModule = proxyquire('./authorization-client', {
    './common/get-access-token': {
      getAccessToken: async function getAccessTokenMock(): Promise<string> {
        counter.count++;
        return dummyAccessToken;
      }
    }
  });
  const AuthorizationClient: {new (config: IAuthorizationClientOptions): AuthorizationClientClass} = AuthorizationClientModule.AuthorizationClient;
  // Expose protected _getAccessToken for testing
  class TestAuthorizationClient extends AuthorizationClient {
    public async getAccessToken(): Promise<string> {
      return this._getAccessToken();
    }
  }
  const config: IAuthorizationClientOptions = {
    domain: getEnvironmentVariable('AUTH0_DOMAIN'),
    clientId: getEnvironmentVariable('AUTH0_CLIENT_ID'),
    clientSecret: getEnvironmentVariable('AUTH0_CLIENT_SECRET'),
    extensionUrl: getEnvironmentVariable('AUTH0_EXTENSION_URL'),
  };
  const authorizationClient = new TestAuthorizationClient(config);
  return { authorizationClient, counter };
}
