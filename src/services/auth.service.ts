import { UserManager, WebStorageStateStore, User } from 'oidc-client';

export default class AuthService {
    private userManager: UserManager;

    constructor() {
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
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(returnPath?: string): Promise<void> {
        if ((returnPath || "") !== "")
            return this.userManager.signinRedirect({ state: returnPath });

        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public getAccessToken(): Promise<string> {
        return this.userManager.getUser().then((data: any) => {
            return data.access_token;
        });
    }

    public signinRedirectCallback(): Promise<User> {
        return this.userManager.signinRedirectCallback();
    }
}
