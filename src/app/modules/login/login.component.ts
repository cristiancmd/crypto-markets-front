import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: FormGroup
  submited = false;
  wrongCredentials = false;

  constructor(
    private securitySrv: SecurityService,
    private form: FormBuilder,
    private router: Router,
    private localStorageSvc:LocalStorageService
  ) {
    this.credentials = this.form.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })
  }

  ngOnInit(): void {


  }


  login() {

    this.submited= true
    if( this.credentials.invalid){
      return;
    }
    const cred:any = {
      username: this.credentials.value.username,
      password: this.credentials.value.password
    }


    this.securitySrv.login(cred).subscribe(
      {
        next: (data: any) => { console.log(data)
        if(!data){
          this.wrongCredentials = true;

        }else{
          this.wrongCredentials = false;
          this.localStorageSvc.saveSessionData(data);
          this.securitySrv.isActiveSession();
          this.router.navigate(['/coins']);
        }
        },
        error: (e: any) => { console.log(e) }
      },
    )
  }

}
