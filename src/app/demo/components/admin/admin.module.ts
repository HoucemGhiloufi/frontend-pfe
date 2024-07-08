import { NgModule , APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { PasswordModule } from "primeng/password";
import { WidgetsComponent } from './widgets/widgets.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AvenantComponent } from './avenant/avenant.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ChartModule } from 'primeng/chart';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth.service'; // Adjust path as needed
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    WidgetsComponent,
    RechercheComponent,
    AvenantComponent,
    LoginComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    ColorPickerModule,
    CascadeSelectModule,
    MultiSelectModule,
    ToggleButtonModule,
    SliderModule,
    InputTextareaModule,
    RadioButtonModule,
    InputTextModule,
    RatingModule,
    ChipModule,
    KnobModule,
    InputSwitchModule,
    ListboxModule,
    SelectButtonModule,
    CheckboxModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    TableModule,
    RippleModule,
    ProgressBarModule,
    ToastModule,
    CommonModule,
    ChartModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    CommonModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => authService.initializeKeycloak(),
      multi: true,
      deps: [AuthService, KeycloakService]
}],

})
export class AdminModule { }
