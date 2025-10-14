import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DashbordService } from './dashbord.service';

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  url = environment.apiUrl
  constructor(private http: HttpClient,private auth: AuthService) { }

  addPostulation(offreId:any,motivation:string,cv:any) {
    let request = new FormData()
    request.append('motivation',motivation);
    request.append('cv',cv);
    request.append('offreId',offreId);
    request.append('userId',this.auth.loggedUser.id);
    return this.http.post(this.url+"postulation",request);
  }

  verifyPostulation(offreId:number){
    let postulation = {offreId:offreId,userId:this.auth.loggedUser.id}
    return this.http.post(this.url+"postulation/verify",postulation);
  }
  getPostulationByOffreUser(userId:number){
    return this.http.get(this.url+"postulation/"+userId);
  }
  getPostulationByEtuddiantId(){
    return this.http.get(this.url+"postulation/etudiant/"+this.auth.loggedUser.id);
  }

  getPostulationsFinished(){
    return this.http.get(this.url+"postulation/finished/"+this.auth.loggedUser.id);
  }


  acceptPostulation(id:number){
    return this.http.get(this.url+"postulation/accept/"+id);
  }
  getPostulationClosed(userId:number){
    return this.http.get(this.url+"postulation/user/closed/"+userId);
  }

  finishPostulation(id:number){
    return this.http.get(this.url+"postulation/finish/"+id);
  }


}
