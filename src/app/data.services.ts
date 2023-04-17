import{HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core"
import { Corte } from 'src/app/corte.model';

@Injectable()
export class DataServices{
    
    constructor(private httpClient:HttpClient){}
    
    guardarCortes(miCorte:Corte){
       
        this.httpClient.post('https://peluqueria-8a126-default-rtdb.firebaseio.com/datos.json',miCorte).subscribe(

        response => console.log("Se ha cargado el corte: " + response),

        error => console.log("Error: " + error)

        );
        
    }
}