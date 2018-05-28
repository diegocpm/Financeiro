import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriaDaoProvider } from '../../providers/categoria-dao/categoria-dao';
import { Categoria } from '../../modelos/categoria';
import { ListacategoriasPage } from '../listacategorias/listacategorias';

@IonicPage()
@Component({
  selector: 'page-cadastrocategoria',
  templateUrl: 'cadastrocategoria.html',
})
export class CadastrocategoriaPage {

  public nome: string = '';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _categoriaDao: CategoriaDaoProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CadastrocategoriaPage');
  }

  salvarCategoria(){
    let categoria: Categoria = {
      nome: this.nome
    };

    this._categoriaDao.ehDuplicado(categoria).then((value) =>{
      if(value != null){
        let alert = this._alertCtrl.create({
          title: 'Já existe um cadastro com este nome!',
          buttons: ['OK']
        });
        alert.present();
      }else{
        this._categoriaDao.salva(categoria);

        let alert = this._alertCtrl.create({
          title: 'Cadastro Realizado',
          subTitle: categoria.nome,
          buttons: ['OK']
        });
        alert.present();

        this.navCtrl.setRoot(ListacategoriasPage);
      }
    });
  }
}
