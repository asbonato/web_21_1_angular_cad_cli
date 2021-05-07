import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes:Cliente[] = [];
  private clientesSubscription!: Subscription;
  public estaCarregando: boolean = false;
  totalDeClientes: number = 10;
  totalDeClientesPorPagina: number = 2;
  opcoesTotalDeClientesPorPagina = [2, 5, 10]
  paginaAtual: number = 1;


  constructor(public clienteService: ClienteService) { }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((dados: {clientes: [], maxClientes: number}) => {
        this.estaCarregando = false;
        this.clientes = dados.clientes;
        this.totalDeClientes = dados.maxClientes;
      });
  }
  onDelete (id: string){
    this.clienteService.removerCliente(id).subscribe(() => {
        this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    });
  }

  onPaginaAlterada (dadosPagina: PageEvent){
    this.estaCarregando = true;
    this.paginaAtual = dadosPagina.pageIndex + 1;
    this.totalDeClientesPorPagina = dadosPagina.pageSize;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
  }

}

