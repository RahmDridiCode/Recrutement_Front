import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {JobService} from "../../services/job.service";
import {AuthService} from "../../services/auth.service";
import {PostulationService} from "../../services/postulation.service";
import {DashbordService} from "../../services/dashbord.service";
import {CvServiceService} from "../../services/cv-service.service";

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsComponent implements OnInit {
  postulations:any[]=[]
  recruters:any[]=[];
  students:any[]=[];
  users:any[]=[]
  offersCount:number=0;
  test="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(public postulationService:PostulationService, public auth: AuthService,
              public dashboardService: DashbordService, public dialog: MatDialog,
              public cvService: CvServiceService, public router : Router, public userService:UserService, public jobService:JobService) { }

  ngOnInit(): void {
    this.dashboardService.url="postulations"
    this.postulationService.getPostulationByOffreUser(this.auth.loggedUser.id).subscribe((result:any)=>{
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

    this.jobService.listeMyJobs().subscribe((jobs:any)=> {
      this.offersCount=jobs.length;
    })
  }
  preview(cv:any){
    this.cvService.cv=cv;
    this.router.navigate(["/cv"]);
  }
  filter(){
    this.router.navigate(['/dashbordRecruter/postulations'])
  }

  accept(id:number){
    this.postulationService.acceptPostulation(id).subscribe((result)=>{
      console.log(result);
      let postulation = this.postulations.find(el=> el.id === id);
      let index = this.postulations.indexOf(postulation);
      this.postulations[index] = result;
    })
  }
}
