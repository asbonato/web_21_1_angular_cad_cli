import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private autenticado: boolean = false;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusSubject = new Subject <boolean>();
  private idUsuario: string;

  public isAutenticado(): boolean{
    return this.autenticado;
  }

  public getStatusSubject (){
    return this.authStatusSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  public getToken (): string{
    return this.token;
  }

  public logout(): void{
    this.token = null;
    this.authStatusSubject.next(false);
    this.autenticado = false;
    clearTimeout(this.tokenTimer);
    this.idUsuario = null;
    this.removerDadosDeAutenticacao();
    this.router.navigate(['/']);
  }

  criarUsuario(email: string, senha: string){
    const authData: AuthData = {
      email: email,
      password: senha
    }
    this.httpClient.post("http://localhost:3000/api/usuario/signup", authData).
      subscribe({
        //vamos para página principal quando o usuário é criado com sucesso
        next: () => this.router.navigate(['/']),
        //notificamos todos os componentes que não há usuário autenticado
        error: () => this.authStatusSubject.next(false)
      });
  }

  public getIdUsuario(){
    return this.idUsuario;
  }

  login (email: string, senha: string){
    const authData: AuthData = {
      email: email,
      password: senha
    }
    this.httpClient.post<{ token: string, expiresIn: number, idUsuario:string}>
    ("http://localhost:3000/api/usuario/login", authData).
      subscribe(resposta => {
        this.token = resposta.token;
        if (this.token){
          const tempoValidadeToken = resposta.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, tempoValidadeToken * 1000);
          console.log(resposta);
          this.autenticado = true;
          this.idUsuario = resposta.idUsuario;
          this.authStatusSubject.next(true);
          this.salvarDadosDeAutenticacao(this.token, new Date(new Date().getTime() + tempoValidadeToken * 1000)
            , this.idUsuario);
          this.router.navigate(['/']);
        }
      })
  }

  private salvarDadosDeAutenticacao (token: string, validade: Date, idUsuario: string){
    localStorage.setItem ('token', token);
    localStorage.setItem ('validade', validade.toISOString());
    localStorage.setItem ('idUsuario', idUsuario);
  }

  private removerDadosDeAutenticacao (){
    localStorage.removeItem ('token');
    localStorage.removeItem ('validade');
    localStorage.removeItem ('idUsuario');
  }

  public autenticarAutomaticamente (): void{
    const dadosAutenticacao = this.obterDadosDeAutenticacao();
    if (dadosAutenticacao){
      const agora = new Date();
      const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
      if (diferenca > 0){
        this.token = dadosAutenticacao.token;
        this.autenticado = true;
        this.idUsuario = dadosAutenticacao.idUsuario;
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, diferenca);
        this.authStatusSubject.next(true);
      }
    }
  }

  private obterDadosDeAutenticacao(){
    const token = localStorage.getItem ('token');
    const validade = localStorage.getItem ('validade');
    const idUsuario = localStorage.getItem ('idUsuario');
    if (token && validade) {
      return {token: token, validade: new Date(validade), idUsuario: idUsuario}
    }
    return null;
  }

}
