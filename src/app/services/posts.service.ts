import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Post } from '../interfaces/interfaces';

const url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPosts = new EventEmitter<Post>;

  constructor(private http: HttpClient,
    private  usuarioService: UsuarioService) {  }

  getPost( pull: boolean = false ) {

    if ( pull ) {
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;

    return this.http.get(`${url}/posts/?pagina=${this.paginaPosts}`)
  }

  crearPost( post :any ){

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise (resolve =>{

      this.http.post(`${url}/posts`,post ,{headers})
      .subscribe((resp : any) => {
        
        this.nuevoPosts.emit(resp['post']);
        resolve(true)
        
      });

    })
    
  };
}
