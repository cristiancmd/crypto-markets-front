import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  session:boolean= false;
  suscription: Subscription = new Subscription;
  userName?: string;
  constructor(
    private securitySvc: SecurityService,
    private localStorageSvc: LocalStorageService,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {


      this.suscription = this.securitySvc.getSessionStatus().subscribe(
        {
          next: (data: any) => {this.session = data.isLogged
          this.userName= data.name;
         },
          error: (e) => { console.error(e)}
        }
      )

  }

  logout(){

    if(this.localStorageSvc.removeSessionData()){
      console.log('sesion cerrada..')
      this.router.navigate(['/coins']);
      this.ngOnInit();
      this.session = false;


    }
  }


}
