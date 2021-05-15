import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {
  mensagem: string = "Erro";

  constructor() { }

  ngOnInit(): void {
  }

}
