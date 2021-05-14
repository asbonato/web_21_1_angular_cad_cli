import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (
    private usuarioService: UsuarioService
  ){

  }

  intercept (req: HttpRequest <any>, next: HttpHandler){
    const token = this.usuarioService.getToken();
    const copia = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(copia);
  }
}
