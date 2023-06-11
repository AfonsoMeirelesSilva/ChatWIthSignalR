import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as signair from '@microsoft/signalr';
import { promises } from 'dns';
import Swal from 'sweetalert2';


interface BatePapo {
  usuario: string,
  mensagem: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'BatePapo';
  usuario = "Afonshow";
  mensagens: BatePapo[] = [];
  inputMensagem = new FormControl('');
  connection = new signair.HubConnectionBuilder()
    // .withUrl("http://ec2-52-14-219-20.us-east-2.compute.amazonaws.com:5003/batepapo") //DNS AWS
    .withUrl("http://192.168.1.74:5000/batepapo") //DNS LOCAL
    .build();

  constructor() {
    this.iniciarConexao();
  }
  ngOnInit(): void {
    this.login().then(res => {
      this.usuario = res
    });
    console.log(this.mensagens)
  }

  iniciarConexao() {
    this.connection.on("sendMessage",(usuario: string, mensagem: string) => {
      this.mensagens.push({
        usuario: usuario,
        mensagem: mensagem
      });
    });
    this.connection.start();
  }
  sendMessage() {

    this.connection.send("sendMessage", this.usuario, this.inputMensagem.value)
      .then(() => {
        this.inputMensagem.setValue('')
      })
  }

  private async login() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
     return text
    }
  }

}
