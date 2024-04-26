import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: any = null;

  constructor(private http: HttpClient,
    private storage: Storage) { }

  login(email: string, password: string) {

    const data = { email: email, password: password };

    return new Promise(resolve => {

      this.http.post(`${url}/user/login`, data)
        .subscribe((resp: any) => {
          console.log(resp);

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true)
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false)
          }

        })
    });
  }

  registro (usuario:Usuario){

    return new Promise( resolve => {

      this.http.post(`${url}/user/create`, usuario)
      .subscribe( (resp: any) =>{
        
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true)
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false)
        }
      })
    })
    

  }

  

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);
  }

}
