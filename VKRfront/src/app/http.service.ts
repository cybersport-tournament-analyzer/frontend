import { Injectable } from '@angular/core';
import {environment} from '../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }
  getAuth(){
    console.log("auth query"+environment.authSource)
  }
}
