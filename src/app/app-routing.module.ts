import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AvenantComponent } from './demo/components/admin/avenant/avenant.component';
import { AuthModule } from './demo/components/auth/auth.module';
import { AuthGuard } from './guard/auth.guard';
import { RechercheComponent } from './demo/components/admin/recherche/recherche.component';
const routes: Routes = [
     {
        path: '',
        component: AppLayoutComponent,
        children: [
             { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'admin', loadChildren: () => import('./demo/components/admin/admin.module').then(m => m.AdminModule) },
        ],
        canActivate: [AuthGuard]
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }