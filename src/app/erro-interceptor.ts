import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroComponent } from './erro/erro.component';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req).pipe(
      catchError((erro: HttpErrorResponse) => {
        this.dialog.open(ErroComponent);
        console.log("ErroInterceptor: " + JSON.stringify(erro));
        return throwError(erro);
      })
    );
  }
}
