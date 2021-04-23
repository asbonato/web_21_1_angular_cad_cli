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
    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/clientes',
      cliente).subscribe(
        (dados) => {
          console.log(dados.mensagem);
          cliente.id = dados.id;
          this.clientes.push(cliente);
          this.listaClientesAtualizada.next([...this.clientes]);
        }
      )
  }

  removerCliente (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
      this.clientes = this.clientes.filter((cli) => {
        return cli.id !== id
      });
      this.listaClientesAtualizada.next([...this.clientes]);
    })
  }
  getCliente (idCliente: any){
    return{
      ...this.clientes.find((cli) => cli.id === idCliente)
    }
  }
}

