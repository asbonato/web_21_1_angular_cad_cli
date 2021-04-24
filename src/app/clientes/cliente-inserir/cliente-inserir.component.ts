import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css'],
})

export class ClienteInserirComponent implements OnInit {
  private modo = "criar";
  private idCliente: any;
  public cliente: any;
  public estaCarregando: boolean = false;

  constructor(
    public clienteService: ClienteService,
    public route: ActivatedRoute
  ) {

  }
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idCliente")){
        this.modo = "editar";
        this.idCliente = paramMap.get("idCliente");
        this.estaCarregando = true;
        this.cliente = this.clienteService.getCliente(this.idCliente).subscribe( dadosCli => {
          this.estaCarregando = false;
          this.cliente = {
            id: dadosCli._id,
            nome: dadosCli.nome,
            fone: dadosCli.fone,
            email: dadosCli.email
          };
        });
      }
      else{
        this.modo = "criar";
        this.idCliente = null;
      }
    })
  }


  onSalvarCliente(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar"){
      this.clienteService.adicionarCliente(
        form.value.id,
        form.value.nome,
        form.value.fone,
        form.value.email
      );
    } else {
      this.clienteService.atualizarCliente(
        this.idCliente,
        form.value.nome,
        form.value.fone,
        form.value.email
      )
    }
    //this.estaCarregando = false;
    form.resetForm();
  }
}
