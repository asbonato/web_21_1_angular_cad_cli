import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class ClienteService {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>();

  constructor(private httpClient: HttpClient, private router: Router){

  }

  getClientes(): void {
      this.httpClient.get <{mensagem: string, clientes: any}>('http://localhost:3000/api/clientes')
        .pipe(map((dados) => {
          return dados.clientes.map((cliente:any) => {
            return {
              id: cliente._id,
              nome: cliente.nome,
              fone: cliente.fone,
              email: cliente.email,
              imagemURL: cliente.imagemURL
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

  adicionarCliente(id: string, nome:string, fone:string, email:string, imagem: File){
    /*const cliente: Cliente = {
      id: id,
      nome: nome,
      fone: fone,
      email: email
    };*/
    const dadosCliente = new FormData();
    dadosCliente.append("nome", nome);
    dadosCliente.append("fone", fone);
    dadosCliente.append("email", email);
    dadosCliente.append("imagem", imagem);

    this.httpClient.post<{mensagem: string, cliente: Cliente}>('http://localhost:3000/api/clientes',
      dadosCliente).subscribe(
        (dados) => {
          /*cliente.id = dados.id;*/
          const cliente: Cliente = {
            id: dados.cliente.id,
            nome: nome,
            fone: fone,
            email: email,
            imagemURL: dados.cliente.imagemURL
          };
          this.clientes.push(cliente);
          this.listaClientesAtualizada.next([...this.clientes]);
          this.router.navigate(['/']);
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
    //return{...this.clientes.find((cli) => cli.id === idCliente)}
    return this.httpClient.get<{_id: string, nome: string, fone: string, email:string, imagemURL:string}>
    (`http://localhost:3000/api/clientes/${idCliente}`);
  }

  atualizarCliente (id: string, nome: string, fone: string, email: string, imagem: File | string){
    //const cliente: Cliente = {id, nome, fone, email, imagemURL: ""};
    let clienteData: Cliente | FormData;
    if(typeof(imagem)==='object'){ //é um arquivo, montar um form data
      clienteData = new FormData();
      clienteData.append("id", id);
      clienteData.append("nome", nome),
      clienteData.append("fone", fone),
      clienteData.append("email", email),
      clienteData.append("imagem", imagem, nome); //chave, foto e nome para o arquivo
    } else {
      //enviar um JSON comum
      clienteData = {
        id: id,
        nome: nome,
        fone: fone,
        email: email,
        imagemURL: imagem
      }
    }
    console.log(typeof(clienteData));

    this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, clienteData).
    subscribe((res => {
      const copia = [...this.clientes];
      const indice = copia.findIndex (cli => cli.id === id);
      const cliente: Cliente = {
        id: id,
        nome: nome,
        fone: fone,
        email: email,
        imagemURL: ""
      }
      copia[indice] = cliente;
      this.clientes = copia;
      this.listaClientesAtualizada.next([...this.clientes]);
      this.router.navigate(['/']);
    }));
  }
}

