import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Categoria } from '../../modelos/categoria';

@Injectable()
export class CategoriaDaoProvider {

  constructor(public _storage: Storage) {
  }

  ehDuplicado(categoria: Categoria) {
    let chave = 'categoria-'+categoria.nome;
    
    return this._storage.get(chave)
    .then((value) => {
        return value
    });
  }

  salva(categoria: Categoria){
    this._storage.set('categoria-'+categoria.nome, categoria);
  }

  listaTodos() {
    let categorias: Categoria[] = [];

    this._storage.forEach((categoria: Categoria, chave: string) => {
      if (chave.includes('categoria-')){
        categorias.push(categoria);
      }
    });

    return categorias;
  }
}
