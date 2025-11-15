import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';
import { PostulationService } from 'src/app/services/postulation.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs : any[]=[];
  ville:any=null
  service:any=null


  constructor(private jobService : JobService, public auth: AuthService,
              public postulService: PostulationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.jobService.listeJobs().subscribe((jobs:any)=>{
      this.jobs = jobs;
      console.log(this.jobs);
    })
  }
  setVille(ville:string){
    this.ville = ville;
  }
  setService(service:string){
    this.service=service
  }
  postuler(offreId:number){
    this.postulService.verifyPostulation(offreId).subscribe((result:any)=>{
      console.log(result);
      this.dialog.open(PopupComponent, {
        data: {
          offreId:offreId,
          message: result.message,
        },
      });
    },(error)=>{
      this.dialog.open(PopupComponent, {
        data: {
          message: error.error.message,
          error: error.error.failed,
        },
      });
    })
  }

}
