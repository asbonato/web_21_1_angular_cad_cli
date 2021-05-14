import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";

import { Observable } from 'rxjs';
import { UsuarioService } from "./usuario.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){

  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable <boolean | UrlTree> | Promise <boolean | UrlTree>{
      const estaAutenticado = this.usuarioService.isAutenticado();
      if (!estaAutenticado){
        this.router.navigate(['/login']);
      }
      return estaAutenticado;
    }

}
