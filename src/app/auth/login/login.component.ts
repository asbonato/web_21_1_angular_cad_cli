import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  estaCarregando: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onLogin (form: NgForm): void {
    console.log(form.value);
  }

}
