import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Transacao } from '../../modelos/transacao';
import { Categoria } from '../../modelos/categoria';
import { Conta } from '../../modelos/conta';
import { TransacaoDaoProvider } from '../../providers/transacao-dao/transacao-dao';
import { ContaDaoProvider } from '../../providers/conta-dao/conta-dao';
import { CategoriaDaoProvider } from '../../providers/categoria-dao/categoria-dao';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-cadastrotransacao',
  templateUrl: 'cadastrotransacao.html',
})
export class CadastrotransacaoPage {

  categorias: Categoria[];
  contas: Conta[];
  transacao: Transacao;

  public teste: string = 'Conta 1';
  public descricao: string = '';
  public tipo: string = '1';
  public valor: string = '0.00';
  public nomecategoria: string = '';
  public nomeconta: string = '';
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _contaDao: ContaDaoProvider,
              private _categoriaDao: CategoriaDaoProvider,
              private _transacaoDao: TransacaoDaoProvider) {

      this.transacao = this.navParams.get('transacao');

      if(this.transacao != null){
        this.descricao = this.transacao.descricao;
        this.tipo = this.transacao.tipo.toString();
        this.valor = this.transacao.valor.toString();
        this.nomecategoria = this.transacao.categoria.nome;
        this.nomeconta = this.transacao.conta.nome;
        this.data = this.transacao.data;
      }
  }

  ionViewDidLoad() {
    this.contas = this._contaDao.listaTodos();
    this.categorias = this._categoriaDao.listaTodos();
  }

  salvarTrancacao(){

    let contaSalvar: Conta = null;
    let categoriaSalvar: Categoria = null;

    this.contas.forEach((dado: Conta) => {
      if(dado.nome == this.nomeconta){
        contaSalvar = dado;
      }
    });

    this.categorias.forEach((dado: Categoria) => {
      if(dado.nome == this.nomecategoria){
        categoriaSalvar = dado;
      }
    });

    if(this.transacao != null){
      this.transacao.descricao = this.descricao;
      this.transacao.valor = parseFloat(this.valor);
      this.transacao.tipo = parseInt(this.tipo);
      this.transacao.categoria = categoriaSalvar;
      this.transacao.conta = contaSalvar;
      this.transacao.data = new Date(this.data).toISOString();
      
      this._transacaoDao.atualiza(this.transacao);
      
      let alert = this._alertCtrl.create({
        title: 'Atualização realizada',
        subTitle: this.transacao.descricao,
        buttons: ['OK']
      });
      alert.present();

    }else{

          let dataSalvar : string = new Date(this.data).toISOString();
          let chave: string = '';
          chave = 'transacao-'+dataSalvar;

          let transacao: Transacao = {
            chave: chave,
            descricao : this.descricao,
            valor : parseFloat(this.valor),
            tipo : parseInt(this.tipo),
            categoria : categoriaSalvar,
            conta : contaSalvar,
            data : dataSalvar
          };

          this._transacaoDao.salva(chave,transacao);
      
          let alert = this._alertCtrl.create({
            title: 'Cadastro Realizado',
            subTitle: transacao.descricao,
            buttons: ['OK']
          });
          alert.present();
        }
        this.navCtrl.setRoot(HomePage);
    }
}
