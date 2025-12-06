import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CvServiceService {
  url = environment.apiUrl;
  public cv:string="";
  public etudiant: any;   // ⭐ Stocke l’étudiant complet (user)

  constructor(private http: HttpClient) { }

  // Méthode pour notifier le backend qu'un recruteur a consulté le CV
  notifyConsultation(etudiantId: number): Observable<any> {
    return this.http.post(this.url + `api/cv/consultation/${etudiantId}`,{});
  }

}
