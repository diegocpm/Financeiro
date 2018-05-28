import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Conta } from '../../modelos/conta';

@Injectable()
export class ContaDaoProvider {

  
  constructor(public _storage: Storage) {
  }

  ehDuplicado(conta: Conta) {

    let chave = 'conta-'+conta.nome;

    return this._storage.get(chave)
    .then((value) => {
        return value
    });
  }

  salva(conta: Conta){
    this._storage.set('conta-'+conta.nome,conta);
  }

  listaTodos() {
    let contas: Conta[] = [];

    this._storage.forEach((conta: Conta, chave: string) => {
      if (chave.includes('conta-')){
        contas.push(conta);
      }
    });
    //console.log(contas);
    return contas;
  }

}
