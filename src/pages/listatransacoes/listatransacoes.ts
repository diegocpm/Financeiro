import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrotransacaoPage } from '../cadastrotransacao/cadastrotransacao';
import { Transacao } from '../../modelos/transacao';
import { TransacaoDaoProvider } from '../../providers/transacao-dao/transacao-dao';
import { ActionSheetController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-listatransacoes',
  templateUrl: 'listatransacoes.html',
})
export class ListatransacoesPage {
  transacoes: Transacao[];
  conta: string = '';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private _transacaoDao: TransacaoDaoProvider) {
      this.conta = this.navParams.get('conta');
  }

  ionViewDidLoad() {
    this.transacoes = this._transacaoDao.listaTodos(this.conta);
  }

  telaCadastro(){
    this.navCtrl.push(CadastrotransacaoPage,{
      transacao: null
    });
  }

  selecionatransacao(transacao){
    this.navCtrl.push(CadastrotransacaoPage, {
      transacao: transacao
    });
  }

  presentActionSheet(transacao) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            //console.log('Destructive clicked');
            this.selecionatransacao(transacao);
          }
        },
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {
            //console.log('Archive clicked');
            if(transacao != null){
              this._transacaoDao.deletar(transacao.chave);
              this.transacoes = this._transacaoDao.listaTodos(this.conta);
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'Cancelar',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
