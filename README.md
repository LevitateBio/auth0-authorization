# auth0-authorization

Auth0 Authorization Extension API client library

## Installation

```bash
  npm install @cyrusbio/auth0-authorization
```

## AuthorizationClient

Use this client to access the [Auth0 Authorization Extension API](https://auth0.com/docs/api/authorization-extension).

```ts
import { AuthorizationClient } from '@cyrusbio/auth0-authorization';

const authorization = new AuthorizationClient({
  clientId: `${CLIENT_ID}`,
  clientSecret: `${CLIENT_SECRET}`,
  domain: `${TENANT}.auth0.com`,
  extensionUrl: `https://${TENANT}.us.webtask.io/xxx/api`,
});
```

Behind the scenes the client obtains an access token, caches it, and automatically refreshes it if it expires.

Each method returns a promise.

```ts
const groups = await authorization.getGroups();
```

## Types

[TypeScript](https://www.typescriptlang.org) types are included.

```ts
import { IAuth0AuthorizationApiGroup } from '@cyrusbio/auth0-authorization';

let group: IAuth0AuthorizationApiGroup;
```



## Testing

All tests run against a live Auth0 tenant instance.

### Configuration

First you need to set up a `.env` file containing the Auth0 configuration. Here is an example `.env` that includes
all non-secret values (`cyrusbio-identity-lib` is an Auth0 tenant made specifically for testing this library):

```bash
cat <<'EOF' > .env
AUTH0_DOMAIN=xxx
AUTH0_CLIENT_ID=xxx
AUTH0_CLIENT_SECRET=xxx
AUTH0_EXTENSION_URL=xxx
EOF
```

### Run all tests

```bash
env $(cat .env | xargs) npm test
```

### Run individual test

```bash
npm run testbuild
env $(cat .env | xargs) node_modules/.bin/ava test/[test-name].spec.js
```

### Logging in tests

Logging in tests should use ava `t.log` instead of `console.log`.
Those logs will appear only when running ava in verbose mode:

```bash
env $(cat .env | xargs) node_modules/.bin/ava test/[test-name].spec.js --verbose
```