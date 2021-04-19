import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class ClienteService {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>();

  constructor(private httpClient: HttpClient){

  }

  getClientes(): void {
      this.httpClient.get <{mensagem: string, clientes: any}>('http://localhost:3000/api/clientes')
        .pipe(map((dados) => {
          return dados.clientes.map((cliente:any) => {
            return {
              id: cliente._id,
              nome: cliente.nome,
              fone: cliente.fone,
              email: cliente.email
            }
          })
        }))
        .subscribe(
          (clientes) => {
            this.clientes = clientes;
            this.listaClientesAtualizada.next([...this.clientes]);
          }
        )
  }

  getListaDeClientesAtualizadaObservable(){
    return this.listaClientesAtualizada.asObservable();
  }

  adicionarCliente(id: string, nome:string, fone:string, email:string){
    const cliente: Cliente = {
      id: id,
      nome: nome,
      fone: fone,
      email: email
    };
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/clientes',
      cliente).subscribe(
        (dados) => {
          console.log(dados.mensagem);
          this.clientes.push(cliente);
          this.listaClientesAtualizada.next([...this.clientes]);
        }
      )
  }
}
