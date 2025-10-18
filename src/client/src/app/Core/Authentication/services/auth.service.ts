import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: 'https://localhost:5001', // IdentityServer authority accessed outside docker
  redirectUri: window.location.origin,
  requireHttps: false, 
  clientId: 'angular-client',
  responseType: 'code',
  scope: 'openid profile ProductsAPI.fullaccess',
  showDebugInformation: true
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  get token() {
    return this.oauthService.getAccessToken();
  }

get name(): string | null {
  return this.identityClaims ? this.identityClaims['name'] : null;
}

get email(): string | null {
  return this.identityClaims ? this.identityClaims['email'] : null;
}
}