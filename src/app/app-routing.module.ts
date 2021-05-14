import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ClienteInserirComponent } from "./clientes/cliente-inserir/cliente-inserir.component";
import { ClienteListaComponent } from "./clientes/cliente-lista/cliente-lista.component";

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "" , component: ClienteListaComponent},
  { path: "criar", component: ClienteInserirComponent, canActivate:[AuthGuard]},
  { path: "editar/:idCliente", component: ClienteInserirComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule{

}
