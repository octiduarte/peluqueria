import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  

  constructor(public auth: AuthService, private router: Router){}
 
  async ngOnInit() {
    this.auth.user$.subscribe(async (user) => {
      if (user) {
        const email = user.email;
        if (email === 'octiduarte@gmail.com') {
           this.router.navigate(['admin']);
        } if (email === 'octiduarte@hotmail.com') {
           this.router.navigate(['local1']);
        }  if (email === 'doc7abio@gmail.com') {
           this.router.navigate(['local2']);
        }
      }
    });
  }

  async login(){
    this.auth.loginWithRedirect()
  }

  catalogo(){
    this.router.navigate(['catalogo']);
  }
}
