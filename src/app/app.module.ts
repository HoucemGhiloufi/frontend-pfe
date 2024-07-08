import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { AuthService } from './demo/service/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakAngularModule } from 'keycloak-angular';

export function initializeKeycloak(authService: AuthService) {
  return () => authService.initializeKeycloak();
}

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule, KeycloakAngularModule],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    ProductService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
