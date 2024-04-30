import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: any = null;
 private usuario: Usuario = {};

  constructor( private http: HttpClient, private storage: Storage, private navCtrl: NavController) {}

  login(email:string, password: string){

    const data = {email, password};

    return new Promise(resolve =>{

      this.http.post(`${URL}/user/login`,data).subscribe((resp:any) =>{
        console.log(resp);
  
         if(resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear()
          resolve(false);
        } 
  
      })

    })

  }
  registro (usuario:Usuario){

    return new Promise ( resolve => {
      this.http.post(`${URL}/user/create`, usuario)
      .subscribe((resp:any) =>{
        console.log(resp)

        if(resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear()
          resolve(false);
        } 
      })
    })
  }

  getUsuario(){

    if (!this.usuario._id){
      this.validaToken();
    }

    return {...this.usuario}
  }



 async guardarToken (token:string){
    this.token = token;
   await this.storage.set('token',token)
  }

  async cargarToken(){
    this.token = await this.storage.get ('token') || null;
  }

 async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if (!this.token){
      this.navCtrl.navigateRoot('/login')
      return Promise.resolve(false);
    }

    return new Promise(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.get(`${URL}/user/`, {headers})
      .subscribe((resp: any) => {

       if (resp['ok']){
        this.usuario = resp['usuario']
        resolve(true)

       }else{
        this.navCtrl.navigateRoot('/login')
        resolve(false);
       }

      })

    });
  }
  actualizarUsuario(usuario:Usuario){

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    console.log(usuario)

    return new Promise (resolve =>{

      this.http.put(`${URL}/user/update`, usuario, {headers})
    .subscribe((resp:any) =>{

      console.log(resp)

      if (resp['ok']){
        this.guardarToken( resp['token']);
        resolve(true);
      }else{
        resolve(false);

      }

    })

    })
  }
} 