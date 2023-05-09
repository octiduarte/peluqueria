import { Component, Injectable, OnInit } from '@angular/core';
import { LecturaServices } from 'src/app/lectura.services';
import { HttpClient } from '@angular/common/http';
import 'bootstrap/dist/js/bootstrap.min.js';
import { get } from 'firebase/database';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-jefe',
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css']
})
export class JefeComponent implements OnInit{


  constructor(public auth: AuthService,private http:HttpClient, private lecturaService: LecturaServices){

  }

  ngOnInit(): void {
   this.getCortes();
   

  }

  cortesLectura: any[] = [];
  corteAdulto: string = "Corte Adulto";
  corteBarba: string = "Corte Barba";
  corteNinio: string = "Corte Niño";
  contadorCorteAdulto: number;
  contadorCorteBarba : number;
  contadorCorteNinio : number;
  
  gananciaCorteBarba: number;
  gananciaCorteNinio : number;
  gananciaCorteAdulto: number;
  gananciaTotal: number;


 
  
  logOut(){
    this.auth.logout()
  }

  getCortes() {
    this.http.get('https://peluqueria-8a126-default-rtdb.firebaseio.com/datos.json')
    .subscribe((value: object) => {
      this.cortesLectura = Object.entries(value).map(([key, data]) => ({ key, ...data }));
      });   

      
  }

 



  cortesUltimoMes(local: number){
    this.getCortes();
    let contadorCorteAdulto = 0;
    let contadorCorteBarba = 0;
    let contadorCorteNinio = 0;
  
    const hoy = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - 1);
    
  
    for (let i = 0; i < this.cortesLectura.length; i++) {
      const corte = this.cortesLectura[i];
      if (corte.local === local) {
        const fechaCorte = new Date(corte.fecha);
        if (fechaCorte > fechaLimite && fechaCorte <= hoy) {
          if(this.corteAdulto==this.cortesLectura[i].nombre){
            contadorCorteAdulto=contadorCorteAdulto+1;
          }
          if(this.corteBarba==this.cortesLectura[i].nombre){
            contadorCorteBarba=contadorCorteBarba+1;
          }
          if(this.corteNinio==this.cortesLectura[i].nombre){
            contadorCorteNinio=contadorCorteNinio+1;
          }
        }
      }
    }
  
    this.contadorCorteAdulto = contadorCorteAdulto;
    this.contadorCorteBarba = contadorCorteBarba;
    this.contadorCorteNinio = contadorCorteNinio;
  
    this.gananciaCorteAdulto = contadorCorteAdulto * 1500;
    this.gananciaCorteBarba = contadorCorteBarba * 500;
    this.gananciaCorteNinio = contadorCorteNinio * 400;
    this.gananciaTotal = this.gananciaCorteAdulto + this.gananciaCorteBarba + this.gananciaCorteNinio;
  }

  cortesUltimaSemana(local:number) {
    this.getCortes();
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
    this.getCortes();
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
