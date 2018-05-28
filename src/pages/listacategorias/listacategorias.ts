import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../../modelos/categoria';
import { CadastrocategoriaPage } from '../cadastrocategoria/cadastrocategoria';
import { CategoriaDaoProvider } from '../../providers/categoria-dao/categoria-dao';

@IonicPage()
@Component({
  selector: 'page-listacategorias',
  templateUrl: 'listacategorias.html',
})
export class ListacategoriasPage {
  categorias: Categoria[];
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _categoriaDao: CategoriaDaoProvider) {
  }

  ionViewDidLoad() {
    this.categorias = this._categoriaDao.listaTodos();
  }

  telaCadastro(){
    this.navCtrl.push(CadastrocategoriaPage);
  }

}
