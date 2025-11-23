import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {DashbordService} from "../../services/dashbord.service";
import {CvServiceService} from "../../services/cv-service.service";
import {UserService} from "../../services/user.service";
import {PostulationService} from "../../services/postulation.service";
import {MotivationService} from "../../services/motivation.service";

@Component({
  selector: 'app-dash-etudiant',
  templateUrl: './dash-etudiant.component.html',
  styleUrls: ['./dash-etudiant.component.css']
})
export class DashEtudiantComponent implements OnInit {

  postulations:any[]=[]
  recruters:any[]=[];
  students:any[]=[];
  users:any[]=[]
  offersCount:number=0;
  constructor( private router :Router,
               public auth: AuthService, private jobService: JobService,
               private dashboardService: DashbordService, public postulationService:PostulationService,
               public cvService: CvServiceService,public motivationService: MotivationService, public userService:UserService) {

  }

  ngOnInit(): void {
    this.dashboardService.url="postulations"
    this.postulationService.getPostulationByEtuddiantId().subscribe((result:any)=>{
      this.postulations = result;
      console.log(result);
    })

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

    this.jobService. listeJobs().subscribe((response:any) =>{
      this.offersCount=response.length;
    })
  }

  logout() {

    this.auth.logout();

  }

  previewCv(cv:any){
    this.cvService.cv=cv;
    this.router.navigate(["/cv"]);


  }

  previewLettre(motivation:any){
    this.motivationService.motivation=motivation;
    this.router.navigate(["/motivation"]);


  }
  filter(){
    this.router.navigate(['/myPostulations'])
  }




}
