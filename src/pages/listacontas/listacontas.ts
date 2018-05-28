import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Conta } from '../../modelos/conta';
import { CadastrocontaPage } from '../cadastroconta/cadastroconta';
import { ContaDaoProvider } from '../../providers/conta-dao/conta-dao';

@IonicPage()
@Component({
  selector: 'page-listacontas',
  templateUrl: 'listacontas.html',
})
export class ListacontasPage {
  contas: Conta[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _contaDao: ContaDaoProvider) {
  }

  ionViewDidLoad() {
    this.contas = this._contaDao.listaTodos();
  }

  telaCadastro(){
    this.navCtrl.push(CadastrocontaPage);
  }
}
