import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swiper from 'swiper';
import { SwiperContainer, SwiperSlide } from 'swiper/element';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { UsuarioService } from '../../services/usuario.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  avatars = [
    { img: 'av-1.png', seleccionado: true },
    { img: 'av-2.png', seleccionado: false },
    { img: 'av-3.png', seleccionado: false },
    { img: 'av-4.png', seleccionado: false },
    { img: 'av-5.png', seleccionado: false },
    { img: 'av-6.png', seleccionado: false },
    { img: 'av-7.png', seleccionado: false },
    { img: 'av-8.png', seleccionado: false },
  ];

  loginUser = {
    email: 'victor@email.com',
    password: '12345'
  }

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() { 

  }

  login( fLogin: NgForm){
    // si login invalid te comes una *****
    if(fLogin.invalid) {return;}

    this.usuarioService.login(this.loginUser.email,this.loginUser.password)


    console.log(fLogin.valid)
  }

  registro(fRegistro: NgForm){
    console.log(fRegistro.valid)
  }

  seleccionarAvatar( avatar :any ){
    this.avatars.forEach( av => av.seleccionado = false);
    avatar.seleccionado = true;
  }
}
