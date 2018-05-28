import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListatransacoesPage } from '../listatransacoes/listatransacoes';
import { TransacaoDaoProvider } from '../../providers/transacao-dao/transacao-dao';
import { CadastrotransacaoPage } from '../cadastrotransacao/cadastrotransacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contasAgrupadas = [];
    
  constructor(public navCtrl: NavController,
    private _transacaoDao: TransacaoDaoProvider) {

  }

  ionViewDidLoad() {
    this.contasAgrupadas = this._transacaoDao.listaAgrupandoContas();
    
  }

  telatransacao(conta){
    //this.navCtrl.push(ListatransacoesPage);
    this.navCtrl.push(ListatransacoesPage, {
      conta: conta.nome
    });
  }

  cadastrotransacao(){
    this.navCtrl.push(CadastrotransacaoPage);
  }

}
