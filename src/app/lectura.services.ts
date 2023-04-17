import{HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import { Corte } from 'src/app/corte.model';
import { FirebaseOptions } from "firebase/app";
import { FirebaseApp } from "firebase/app";
import { config } from "rxjs";
import { FirebaseAppSettings } from "firebase/app";
import { Database } from "firebase/database";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable()
export class LecturaServices{
    cortesUrl = 'https://peluqueria-8a126-default-rtdb.firebaseio.com/datos.json';
    
    

    constructor(private http:HttpClient, private firebase : AngularFireDatabase){}
  
   
    
    leerCortes(){
      
    }
}
