import { Component, Injectable, OnInit } from '@angular/core';
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
@Injectable({
  providedIn: 'root'
}
)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthService, public dataService:DataServices,  public dialog: MatDialog, public  db: AngularFireDatabase,private http:HttpClient, private lecturaService: LecturaServices){
  
  }

  cortesLectura: any[] = [];
  ngOnInit(){
    
  }


  getCortes() {
    this.http.get('https://peluqueria-8a126-default-rtdb.firebaseio.com/datos.json')
    .subscribe((value: object) => {
      this.cortesLectura = Object.entries(value).map(([key, data]) => ({ key, ...data }));
      });   
  }

  nombre:string="";
  emailjefe: string="octiduarte@gmail.com"
  emaillocal1: string= "octiduarte@hotmail.com"
  emaillocal2: string= "doc7abio@gmail.com"
  contadorCorteAdulto: number;
  contadorCorteBarba : number;
  contadorCorteNinio : number;
  
  gananciaCorteBarba: number;
  gananciaCorteNinio : number;
  gananciaCorteAdulto: number;
  gananciaTotal: number;
  corteAdulto: string = "Corte Adulto";
  corteBarba: string = "Corte Barba";
  corteNinio: string = "Corte Niño";
  


  logOut(){
    this.auth.logout()
  }

 

  /*cortesPorDia(){
    var contadorAdulto=0;
    var contadorBarba=0;
    var contadorNinio=0;
      for (let i = 0; i < this.cortesLectura.length; i++) {
        if(this.cortesLectura[i].local==1){
          if(this.corteAdulto==this.cortesLectura[i].nombre){
            contadorAdulto=contadorAdulto+1;
          }
          if(this.corteBarba==this.cortesLectura[i].nombre){
            contadorBarba=contadorBarba+1;
          }
          if(this.corteAdulto==this.cortesLectura[i].nombre){
            contadorNinio=contadorNinio+1;
          }
      }
    }
  }
*/
  cortesUltimoMes(local:number) {
    var contadorAdulto=0;
    var contadorBarba=0;
    var contadorNinio=0;
    const hoy = new Date();
    let contador = 0;
    for (let i = 0; i < this.cortesLectura.length; i++) {
      const corte = this.cortesLectura[i];
      if (corte.local === local) {
        const fechaCorte = new Date(corte.fecha);
        if (
          fechaCorte.getMonth() === hoy.getMonth() &&
          fechaCorte.getFullYear() === hoy.getFullYear()
        ) {
          switch (corte.nombre) {
            case "Corte Adulto":
              contadorAdulto++;
              break;
            case "Corte Barba":
              contadorBarba++;
              break;
            case "Corte Niño":
              contadorNinio++;
              break;
          }
          contador++;
        }
      }
    }
    this.contadorCorteAdulto=contadorAdulto;
    this.contadorCorteBarba=contadorBarba;
    this.contadorCorteNinio=contadorNinio;

    this.gananciaCorteAdulto = contadorAdulto*1500;
    this.gananciaCorteBarba = contadorBarba*500;
    this.gananciaCorteNinio = contadorNinio*400;
    this.gananciaTotal = this.gananciaCorteAdulto + this.gananciaCorteBarba + this.gananciaCorteNinio;
  }

  cortesUltimaSemana(local:number) {
    var contadorAdulto=0;
    var contadorBarba=0;
    var contadorNinio=0;
    const hoy = new Date().getTime();
    let contador = 0;
    for (let i = 0; i < this.cortesLectura.length; i++) {
      const corte = this.cortesLectura[i];
      if (corte.local === local) {
        const fechaCorte = new Date(corte.fecha).getTime();
        const diffTime = Math.abs(hoy - fechaCorte);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          switch (corte.nombre) {
            case "Corte Adulto":
              contadorAdulto++;
              break;
            case "Corte Barba":
              contadorBarba++;
              break;
            case "Corte Niño":
              contadorNinio++;
              break;
          }
          contador++;
        }
      }
    }
    this.contadorCorteAdulto=contadorAdulto;
    this.contadorCorteBarba=contadorBarba;
    this.contadorCorteNinio=contadorNinio;

    this.gananciaCorteAdulto = contadorAdulto*1500;
    this.gananciaCorteBarba = contadorBarba*500;
    this.gananciaCorteNinio = contadorNinio*400;
    this.gananciaTotal = this.gananciaCorteAdulto + this.gananciaCorteBarba + this.gananciaCorteNinio;

  }

  cortesUltimoDia(local:number) {
    var contadorAdulto=0;
    var contadorBarba=0;
    var contadorNinio=0;
    const hoy = new Date().getTime();
    console.log(hoy);
    
    let contador = 0;
    for (let i = 0; i < this.cortesLectura.length; i++) {
      const corte = this.cortesLectura[i];
      if (corte.local == local) {
        const fechaCorte = new Date(corte.fecha).getTime();
        
        
        const diffTime = Math.abs(hoy - fechaCorte);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          switch (corte.nombre) {
            case "Corte Adulto":
              contadorAdulto++;
              break;
            case "Corte Barba":
              contadorBarba++;
              break;
            case "Corte Niño":
              contadorNinio++;
              break;
          }
          contador++;
        }
      }
    }
    this.contadorCorteAdulto=contadorAdulto;
    this.contadorCorteBarba=contadorBarba;
    this.contadorCorteNinio=contadorNinio;

    this.gananciaCorteAdulto = contadorAdulto*1500;
    this.gananciaCorteBarba = contadorBarba*500;
    this.gananciaCorteNinio = contadorNinio*400;
    this.gananciaTotal = this.gananciaCorteAdulto + this.gananciaCorteBarba + this.gananciaCorteNinio;
  }

  
  
}
