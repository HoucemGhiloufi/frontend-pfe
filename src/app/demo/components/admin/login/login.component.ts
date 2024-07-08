import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { LayoutService } from 'src/app/demo/service/app.layout.service'; // Adjust path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];
  password!: string;

  constructor(
    private keycloakService: KeycloakService,
    public layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeKeycloak();
  }

  initializeKeycloak(): void {
    this.keycloakService.init({
      config: {
        url: 'http://localhost:8080/auth',
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
      if (authenticated) {
        this.router.navigate(['/admin/recherche']);
      }
    }).catch(error => {
      console.error('Keycloak initialization failed', error);
    });

    // Subscribe to Keycloak events
    this.keycloakService.keycloakEvents$.subscribe(event => {
      if (event.type === KeycloakEventType.OnAuthSuccess) {
        console.log('User is authenticated');
        this.router.navigate(['/admin/recherche']);
      }
    });
  }

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
