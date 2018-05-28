import { Injectable } from '@angular/core';
import { Transacao } from '../../modelos/transacao';
import { Storage } from '@ionic/storage';

@Injectable()
export class TransacaoDaoProvider {

  constructor(public _storage: Storage) {
  }

  salva(chave: string, transacao: Transacao){
    this._storage.set(chave,transacao);
  }

  deletar(chave: string){
    this._storage.remove(chave);
  }

  atualiza(transacao: Transacao){
    this._storage.set(transacao.chave,transacao);
  }

  listaTodos(nomeconta: string) {
    let transacoes: Transacao[] = [];

    this._storage.forEach((transacao: Transacao, chave: string) => {
      if(transacao != null){
        if(transacao.conta != null){
          if (chave.includes('transacao-') && transacao.conta.nome === nomeconta){
            transacoes.push(transacao);
          }
        }
      }
    });

    return transacoes;
  }


  listaAgrupandoContas() {
    let contasAgrupadas = [];
    let posicao = -1;
    let cont = -1;

    this._storage.forEach((transacao: Transacao, chave: string) => {
      if(transacao != null){
        if(transacao.conta != null){

          posicao = -1;
          cont = -1;
          contasAgrupadas.forEach(function (id) {
            cont++;
            if (id.nome.trim() == transacao.conta.nome.trim()) {
              posicao = cont;
            }
          });

          if (posicao != -1){
//            console.log(contasAgrupadas[posicao]);
            contasAgrupadas[posicao].valor += ((transacao.tipo == 1 ? -1 : 1) * transacao.valor);
          }else{
            var dado = {nome: transacao.conta.nome, valor: ((transacao.tipo == 1 ? -1 : 1) * transacao.valor)}
            contasAgrupadas.push(dado);
          }
        }
      }
    });
    console.log(contasAgrupadas);
    
    return contasAgrupadas;
  }
}
