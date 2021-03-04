# vue-js-oidc-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Config connection SSO with FFI Login Service (DNA)
```
 // host authority FFI Login Service (Development)
const URL_AOTHORIRY: string = 'https://devapps.frisianflag.co.id/dna';

// host authority FFI Login Service (Production)
//const URL_AOTHORIRY: string = 'https://dna.frisianflag.co.id';

// host app
const URL_HOST: string = 'https://localhost:44357';

const settings: any = {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: URL_AOTHORIRY,
    client_id: 'vuejs_client',
    redirect_uri: `${URL_HOST}/callback`,
    response_type: 'code',
    scope: 'openid profile email',
    post_logout_redirect_uri: URL_HOST,
    automaticSilentRenew: false,
    silent_redirect_uri: `${URL_HOST}/silent-renew.html`,
    filterProtocolClaims: true,
};

this.userManager = new UserManager(settings);
let _userManager = this.userManager;

// handle single signout
this.userManager.events.addUserSignedOut(function () {
    _userManager.removeUser();
    window.location.reload();
});
```

## Changes to Vue.js CLI package.json (SSO only works on HTTPS) 

change the project.json file to use HTTPS

vue-cli-service serve --https --port 44357

### Dependencies
This is reqired dependencies to implement SSO FFI Login Service.
* axios please refer to the [Documentation](https://github.com/axios/axios)
  ```sh
  $ npm install axios
  ```
* oidc-client please refer to the [Documentation](https://github.com/IdentityModel/oidc-client-js)
  ```sh
  $ npm install oidc-client
  ```