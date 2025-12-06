import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {JobService} from "../../services/job.service";
import {AuthService} from "../../services/auth.service";
import {PostulationService} from "../../services/postulation.service";
import {DashbordService} from "../../services/dashbord.service";
import {CvServiceService} from "../../services/cv-service.service";
import {MotivationService} from "../../services/motivation.service";

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsComponent implements OnInit {
  postulationsWithScores: any[] = []; // Fusion postulation + score
  recruters:any[]=[];
  students:any[]=[];
  users:any[]=[]
  offersCount:number=0;
  test="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(public postulationService:PostulationService, public auth: AuthService,
              public dashboardService: DashbordService, public dialog: MatDialog,
              public cvService: CvServiceService,public motivationService: MotivationService, public router : Router, public userService:UserService, public jobService:JobService) { }

  ngOnInit(): void {
    this.dashboardService.url="postulations"
    this.postulationService.getTopPostulationsByOffre(this.auth.loggedUser.id)
      .subscribe((result: any) => {
        // Fusionner postulations + scores
        this.postulationsWithScores = result.map((r:any, i:any) => ({
          ...r.postulation,  // toutes les propriétés de postulation
          score: r.score     // ajouter score
        }));
        console.log(this.postulationsWithScores);
      });

    this.userService.getUserByRole("STUDENT").subscribe((response:any) => {
      this.students=response;
      console.log(response);
    })

    this.userService.getUserByRole("RECRUTER").subscribe((response:any) =>
    {
      this.recruters = response;

    })

    this.userService.getUserAllUsers().subscribe((response:any) =>
    {
      this.users = response;

    })

    this.jobService.listeMyJobs().subscribe((jobs:any)=> {
      this.offersCount=jobs.length;
    })
  }
  previewCv(postulation:any){
    this.cvService.cv = postulation.cv;           // CV PDF
    this.cvService.etudiant = postulation.user;   // Étudiant complet
    this.router.navigate(["/cv"]);


  }

  previewLettre(motivation:any){
    this.motivationService.motivation=motivation;
    this.router.navigate(["/motivation"]);


  }
  filter(){
    this.router.navigate(['/dashbordRecruter/postulations'])
  }

  accept(id:number){
    this.postulationService.acceptPostulation(id).subscribe((result)=>{
      console.log(result);
      let postulation = this.postulationsWithScores.find(el=> el.id === id);
      let index = this.postulationsWithScores.indexOf(postulation);
      this.postulationsWithScores[index] = result;
    })
  }

  refuse(id: number) {
    this.postulationService.refusePostulation(id).subscribe((result) => {
      console.log(result);

      // Met à jour la liste localement
      let postulation = this.postulationsWithScores.find(el => el.id === id);
      let index = this.postulationsWithScores.indexOf(postulation);
      this.postulationsWithScores[index] = result;
    });
  }

}
