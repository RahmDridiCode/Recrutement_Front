import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostulationService} from "../../services/postulation.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, error: string,offreId:number}, public postulService: PostulationService) { }

  ngOnInit(): void {


  }

  submit(file:any,motivation:any){
    let motiv = motivation.value
    const cv : File = file.files[0];
    console.log(cv);
    console.log(motiv);
    this.postulService.addPostulation(this.data.offreId,motiv,cv).subscribe((response:any)=>{
      console.log(response);
    })

  }

}
