import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Crypto Markets IAW';



  constructor(private http: HttpClient,
    public auth: AuthService,
  ) {


  }

  ngOnInit() {

  }
















}
