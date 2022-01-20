import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  sessionDataSubj: Subject<any> = new ReplaySubject<any>()


  url: string = environment.API_URL;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public auth: AuthService,

  ) {

    this.isActiveSession();
  }

  getSessionStatus() {
    return this.sessionDataSubj?.asObservable();
  }


  isActiveSession(): boolean  {
    // let data = localStorage.getItem("session-data");
    // if(data){
    //   let obj : any = JSON.parse(data);
    //   obj.isLogged = true;
    //   this.sessionDataSubj?.next(obj);
    //   return true;
    // }else{

    //   return false;
    // }

    this.auth.isAuthenticated$.subscribe(
      (data) => { return data }
    )
    return false;
  }


  login(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials)

  }

}
