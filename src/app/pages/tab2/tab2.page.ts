import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages:string[] =[];
  cargandoGeo = false;

  post ={
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(
    private postsService:PostsService,
    private route: Router,
    private geolocation: Geolocation
    ) {}

  async crearPost(  ){

    const creado = await this.postsService.crearPost(this.post)

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  };

  async getGeo() {
    if (this.post.posicion) {
      this.post.coords = null;
    }
  
    this.cargandoGeo = true;
  
    try {
      const resp = await Geolocation.getCurrentPosition();
      // resp.coords.latitude
      // resp.coords.longitude
  
      this.cargandoGeo = false;
    } catch (error) {
      console.log('Error al obtener la ubicación', error);
      this.cargandoGeo = false;
    }
  }
  

  

 printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
};

}
