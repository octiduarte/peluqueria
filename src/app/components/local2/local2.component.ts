import { Component, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Corte } from 'src/app/corte.model';
import { DataServices } from '../../data.services';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone';
import { LecturaServices } from 'src/app/lectura.services';
import { AngularFireDatabase, AngularFireDatabaseModule,AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-local2',
  templateUrl: './local2.component.html',
  styleUrls: ['./local2.component.css']
})
export class Local2Component {

  constructor(public dataService:DataServices,  public dialog: MatDialog,public auth: AuthService){

  }
  
   nombre:string="";
  
   mostrarDialogo(): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        width:'350px',
        data: `¿Estas seguro que desea cargar este corte?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          alert("Corte cargado");
          this.sumarCorte();
        } else {
          alert("Corte cancelado");
        }
      });
  }
    sumarCorte(){
      let miCorte = new Corte(this.nombre ,moment().tz('America/Argentina/Buenos_Aires').format(),2);
      this.dataService.guardarCortes(miCorte);
    }
  
    logOut(){
      this.auth.logout()
    }
  
}
