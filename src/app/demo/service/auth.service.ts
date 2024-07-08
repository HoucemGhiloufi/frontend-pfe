import { Injectable } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) {}

  initializeKeycloak(): void {
    this.keycloakService.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'master',
        clientId: 'avenant-app',
        
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      bearerPrefix: 'Bearer',
    }).then(authenticated => {
      console.log(authenticated ? 'User is authenticated' : 'User is not authenticated');
     
    }).catch(error => {
      console.error('Keycloak initialization failed', error);
    });

    // Subscribe to Keycloak events
   
  }
}
