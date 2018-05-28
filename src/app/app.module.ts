import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastrocategoriaPage } from '../pages/cadastrocategoria/cadastrocategoria';
import { CadastrocontaPage } from '../pages/cadastroconta/cadastroconta';
import { CadastrotransacaoPage } from '../pages/cadastrotransacao/cadastrotransacao';

import { ListacategoriasPage } from '../pages/listacategorias/listacategorias';
import { ListacontasPage } from '../pages/listacontas/listacontas';
import { ListatransacoesPage } from '../pages/listatransacoes/listatransacoes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { ContaDaoProvider } from '../providers/conta-dao/conta-dao';
import { CategoriaDaoProvider } from '../providers/categoria-dao/categoria-dao';
import { TransacaoDaoProvider } from '../providers/transacao-dao/transacao-dao';

import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListacategoriasPage,
    ListacontasPage,
    ListatransacoesPage,
    CadastrocategoriaPage,
    CadastrocontaPage,
    CadastrotransacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name:'financeiro',
      storeName: 'financeiros',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListacategoriasPage,
    ListacontasPage,
    ListatransacoesPage,
    CadastrocategoriaPage,
    CadastrocontaPage,
    CadastrotransacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContaDaoProvider,
    CategoriaDaoProvider,
    TransacaoDaoProvider,
    Camera
  ]
})
export class AppModule {}
