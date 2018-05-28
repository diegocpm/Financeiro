import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ContaDaoProvider } from '../../providers/conta-dao/conta-dao';
import { Conta } from '../../modelos/conta';
import { ListacontasPage } from '../listacontas/listacontas';

@IonicPage()
@Component({
  selector: 'page-cadastroconta',
  templateUrl: 'cadastroconta.html',
})
export class CadastrocontaPage {

  public nome: string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    public _contaDao: ContaDaoProvider ) {
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad CadastrocontaPage');
  }

  salvarConta(){
    let conta: Conta = {
      nome: this.nome
    };

    this._contaDao.ehDuplicado(conta).then((value) =>{
      if(value != null){
        let alert = this._alertCtrl.create({
          title: 'Já existe um cadastro com este nome!',
          buttons: ['OK']
        });
        alert.present();
      }else{
        this._contaDao.salva(conta);

        let alert = this._alertCtrl.create({
          title: 'Cadastro Realizado',
          subTitle: conta.nome,
          buttons: ['OK']
        });
        alert.present();

        this.navCtrl.setRoot(ListacontasPage);
      }
    });


  }
}
