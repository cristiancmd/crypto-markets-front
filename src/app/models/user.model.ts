import { CoinModel } from './coin.model';
export class UserModel{

  id?:string;
  email?:string;
  name?:string;
  usercoins?: CoinModel[];

}
