import { Component } from '@angular/core';
import { Cliente } from './clientes/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cadcli01';
  clientes: Cliente[] = [];

  onClienteAdicionado(cliente: Cliente) {
    this.clientes = [...this.clientes, cliente];
    console.log(this.clientes);
  }
}
