import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  div1Visible: boolean = true;
  buttonDisabled: boolean[] = [true, false];


  loginUser = {
    email: 'victor@email.com', //victor@email.com
    password: '12345' //12345
  };

  registerUser : Usuario = {
    email: 'test',
    password: '12345',
    nombre: 'Test',
    avatar: 'av-1.png'

  };

  constructor(
    private usuarioService: UsuarioService,
    private navcontroller:NavController,
    private uiService: UiServiceService,
    
    ) {}

  ngOnInit() { 

  }

  toggleDivs(divNumber: number) {
    if (divNumber === 1) {
      this.div1Visible = true;
      this.buttonDisabled = [true, false];
    } else {
      this.div1Visible = false;
      this.buttonDisabled = [false, true];
    }
  }

  async login( fLogin: NgForm){
    // si login invalid te comes una *****
    if(fLogin.invalid) {return;}

    const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password)

    if (valido) {
      //navegar al tabs
      this.navcontroller.navigateRoot('main/tabs/tab1', {animated: true})
    } else {
      //Mostrar alerta de fallo en login
      this.uiService.alertaInformativa('Usuario o contraseña incorrectos')
    }

    console.log(fLogin.valid)
  }




  async registro(fRegistro: NgForm){

    if( fRegistro.invalid){return;}

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      //navegar al tabs
      this.navcontroller.navigateRoot('main/tabs/tab1', {animated: true})
    } else {
      //Mostrar alerta de fallo en login
      this.uiService.alertaInformativa('Ese correo electrónico ya está en uso')
    }

    this.usuarioService.registro( this.registerUser)
  }


}
