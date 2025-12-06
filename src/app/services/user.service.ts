import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getUserByRole(role : string){
    return this.http.get(this.url+"user/list/"+role);
  }
  getUserAllUsers(){
    return this.http.get(this.url+"user/list");
  }

  deleteUser(id : number){
    return this.http.delete(this.url+"user/delete/"+id);
  }
}
