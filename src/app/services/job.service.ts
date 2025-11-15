import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const baseUrl = '${annonce}/job';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  url= environment.apiUrl
  constructor(private http:HttpClient,private auth:AuthService) {
  }

  listeJobs() {
    return this.http.get(this.url+"offre/list");
  }

  listeMyJobs(){
    return this.http.get(this.url+"offre/listby/"+this.auth.loggedUser.id);
  }

  ajouterJob( offre: any){
    return this.http.post(this.url+"offre/create/"+this.auth.loggedUser.id,offre);
  }
  changeJob( id: any){
    return this.http.get(this.url+"offre/closed/"+id);
  }

  deleteJob( id: number){
    return this.http.delete(this.url+"offre/delete/"+id);
  }
}
