import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { DataServices } from './data.services';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
import { LecturaServices } from './lectura.services';
import { list } from '@angular/fire/database';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Local1Component } from './components/local1/local1.component';
import { Local2Component } from './components/local2/local2.component';
import { JefeComponent } from './components/jefe/jefe.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    DashboardComponent,
    DialogoConfirmacionComponent,
    Local1Component,
    Local2Component,
    JefeComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    MatDialogModule,
    AuthModule.forRoot({
      domain: 'dev-hkpfypzy4uy2s3zi.us.auth0.com',
      clientId: '4vhunT0nn2cmnaxcTf2SiwxTaQHZ3n8p',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
  ],
  providers: [DataServices, LecturaServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
