import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {
  public url: string = "";
  constructor() { }

  postulation() {
    this.url="postulations"
  }

  offres(){
    this.url="offres"
  }
}
