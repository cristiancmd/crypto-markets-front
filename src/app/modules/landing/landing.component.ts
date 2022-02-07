import { AuthService } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  clicked = false ;
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }



  login(){
    this.clicked = true;
    this.auth.loginWithRedirect()
  }
}
