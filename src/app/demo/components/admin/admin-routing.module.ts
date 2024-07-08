import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AvenantComponent } from './avenant/avenant.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: 'widget', component: WidgetsComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'avenant', component: AvenantComponent },
  { path: 'widget/:policyNumber', component: WidgetsComponent },
  { path: 'avenant/:policyNumber', component: AvenantComponent },
  {path:'',redirectTo:'/login',pathMatch:'full'},//Default redirect
  { path: '**', redirectTo: '/widget' } // Handle other unmatched routes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
