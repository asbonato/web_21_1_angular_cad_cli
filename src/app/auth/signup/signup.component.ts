import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  estaCarregando: boolean = false;
  private authObserver: Subscription;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.authObserver = this.usuarioService.getStatusSubject().
      subscribe(
        authStatus => this.estaCarregando = false
      )
  }

  onSignup(form: NgForm): void {
    if (form.invalid) return;
    this.usuarioService.criarUsuario(form.value.email, form.value.password);
  }

  ngOnDestroy(): void {
    this.authObserver.unsubscribe();
  }

}
