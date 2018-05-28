import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListacategoriasPage } from '../pages/listacategorias/listacategorias';
import { ListacontasPage } from '../pages/listacontas/listacontas';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  DATA_URL_CAMERA: string = '';

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public _camera: Camera,
    public _storage: Storage,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Conta', component: ListacontasPage },
      { title: 'Categoria', component: ListacategoriasPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.buscaFoto().then((value) =>{
      if(value != null){
        this.DATA_URL_CAMERA = value;
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  buscaFoto() {

    let chave = 'camera';

    return this._storage.get(chave)
    .then((value) => {
        return value
    });
  }

  salvaFoto(caminho: string){
    this._storage.set('camera',caminho);
  }

  catchPhoto() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300      
    }


    this._camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.DATA_URL_CAMERA = base64image;
        this.salvaFoto(base64image);
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
