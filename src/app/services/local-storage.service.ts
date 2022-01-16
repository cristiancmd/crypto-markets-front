import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }





  saveSessionData(data: any):boolean {
    let session = localStorage.getItem("session-data")
    if (session) {
      console.log(session)
      return false;
    } else {
      let datastr = JSON.stringify(data);
      localStorage.setItem("session-data", datastr);
      return true;
    }
  }

  removeSessionData():boolean{
    let session = localStorage.getItem("session-data")
    if (session) {
      localStorage.removeItem("session-data");
      return true;
    }
    return false;
  }






}
