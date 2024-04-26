import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private storage : Storage) { }

    login( email: string, password:string){

      const data = {email: email, password: password};
      this.http.post(`${ url }/user/login`, data)
      .subscribe( (resp:any ) =>{
        console.log(resp);
        
      })
    }
}
