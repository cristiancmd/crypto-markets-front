import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  session: boolean = false;
  suscription: Subscription = new Subscription;
  userName?: string;
  constructor(
    private securitySvc: SecurityService,
    private localStorageSvc: LocalStorageService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(data => {
      // console.log(data)
      this.userName = data?.name
    })


    this.auth.isAuthenticated$.subscribe(
      {
        next: (data) => {
          console.log('auth  ', data)
          if (data) {
            this.toastr.info('Sesion iniciada')
          }
        }

      })



  }

  login() {
    this.auth.loginWithRedirect();

  }

  logout() {
    // this.auth.logout();
    this.auth.logout({ returnTo: window.location.origin });
    this.toastr.info('Sesion cerrada')

  }



}
