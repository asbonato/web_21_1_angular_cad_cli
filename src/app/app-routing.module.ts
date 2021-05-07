import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ClienteInserirComponent } from "./clientes/cliente-inserir/cliente-inserir.component";
import { ClienteListaComponent } from "./clientes/cliente-lista/cliente-lista.component";

const routes: Routes = [
  { path: "" , component: ClienteListaComponent},
  { path: "criar", component: ClienteInserirComponent},
  { path: "editar/:idCliente", component: ClienteInserirComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{

}