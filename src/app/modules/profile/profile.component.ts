import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  premium:boolean = false;
  user?:UserModel;
  userLoaded?: Promise<boolean>;

  constructor(private user$: UserService) { }

  ngOnInit(): void {
    this.user$.getUserWithCoinList().subscribe(data=>
      {
        console.log(data)
        this.user = data;
        this.premium = data.premium || this.premium
        this.userLoaded = Promise.resolve(true);
      }
    )

  }




  goToMercadopago(){

    this.user$.getPaymentLink().subscribe({

      next: (data )=> {console.log(data)
      window.location.href = data.url.init_point;

    }


    },

    )

  }
}
