import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListacontasPage } from './listacontas';

@NgModule({
  declarations: [
    ListacontasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListacontasPage),
  ],
})
export class ListacontasPageModule {}
