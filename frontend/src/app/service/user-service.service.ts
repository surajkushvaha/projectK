import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string = 'http://localhost:3000/api'
  constructor(private _http: HttpClient) { }
  checkUsername(username: string){
      return this._http.post(this.url + '/checkusername',{
        "username": username
      })
  }
}
