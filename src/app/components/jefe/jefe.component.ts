import { Component, Injectable, OnInit } from '@angular/core';
import { LecturaServices } from 'src/app/lectura.services';
import { HttpClient } from '@angular/common/http';
import 'bootstrap/dist/js/bootstrap.min.js';
import { get } from 'firebase/database';
@Component({
  selector: 'app-jefe',
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css']
})
export class JefeComponent implements OnInit{


  constructor(private http:HttpClient, private lecturaService: LecturaServices){

  }

  ngOnInit(): void {
   this.getCortes();

  }
  cortesLectura: any[] = [];
  corteAdulto: string = "Corte Adulto";
  corteBarba: string = "Corte Barba";
  corteNinio: string = "Corte Niño";

  getCortes() {
    this.http.get('https://peluqueria-8a126-default-rtdb.firebaseio.com/datos.json')
    .subscribe((value: object) => {
      this.cortesLectura = Object.entries(value).map(([key, data]) => ({ key, ...data }));
      });   
  }

  cortesPorDia(){
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
    console.log("corte adulto"+contadorAdulto,"corte barba"+contadorBarba,"corte ninio"+contadorNinio);
    
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
    console.log("corte adulto"+contadorAdulto,"corte barba"+contadorBarba,"corte ninio"+contadorNinio);
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
    console.log("corte adulto"+contadorAdulto,"corte barba"+contadorBarba,"corte ninio"+contadorNinio);
  }
  
  
}
